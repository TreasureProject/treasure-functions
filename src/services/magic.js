const {
  CIRCULATING_SUPPLY_EXCLUDED,
  CIRCULATING_SUPPLY_EXCLUDED_EXTENDED,
  CONTRACT_WETH_USDC_LP,
  CONTRACT_MAGIC_WETH_LP,
  CONTRACT_SUSHISWAP_ROUTER,
} = require("../constants");
const {
  getMagicTotalSupply,
  getMagicBalanceOf,
} = require("../contracts/magic");
const { getPairReserves } = require("../contracts/uniswapV2Pair");
const { getQuote } = require("../contracts/uniswapV2Router");
const { sumArray } = require("../utils/array");
const { BigNumber } = require("@ethersproject/bignumber");
const { formatUnits, formatEther } = require("@ethersproject/units");

const ONE_BN = BigNumber.from("1000000000000000000");

exports.getMagicTotalSupply = getMagicTotalSupply;

exports.getMagicCirculatingSupply = async (variant) => {
  const excludedList = Object.entries(
    variant === "treasure"
      ? {
          ...CIRCULATING_SUPPLY_EXCLUDED,
          ...CIRCULATING_SUPPLY_EXCLUDED_EXTENDED,
        }
      : CIRCULATING_SUPPLY_EXCLUDED
  );
  const totalSupply = await this.getMagicTotalSupply();
  const excludedBalances = await Promise.all(
    excludedList.map(([name, addresses]) =>
      Promise.all(
        addresses.map((address) =>
          getMagicBalanceOf(address, name.includes("L1"))
        )
      )
    )
  );
  const totalExcluded = excludedBalances.reduce(
    (acc, balances) => acc + sumArray(balances),
    0
  );
  return {
    totalSupply,
    totalExcluded,
    circulatingSupply: totalSupply - totalExcluded,
    excludedBalances: excludedList.map(([name, addresses], i) => ({
      name,
      addresses,
      balance: sumArray(excludedBalances[i]),
    })),
  };
};

exports.getMagicPrice = async () => {
  const [wethUsdcReserves, magicWethReserves] = await Promise.all([
    getPairReserves(CONTRACT_WETH_USDC_LP, 18, 6),
    getPairReserves(CONTRACT_MAGIC_WETH_LP),
  ]);

  const [wethUsdc, magicWeth] = await Promise.all([
    getQuote(
      CONTRACT_SUSHISWAP_ROUTER,
      ONE_BN,
      wethUsdcReserves.reserve0,
      wethUsdcReserves.reserve1
    ),
    getQuote(
      CONTRACT_SUSHISWAP_ROUTER,
      ONE_BN,
      magicWethReserves.reserve0,
      magicWethReserves.reserve1
    ),
  ]);

  const ethUsd = parseFloat(formatUnits(wethUsdc, 6));
  const magicEth = parseFloat(formatEther(magicWeth));

  return {
    ethUsd,
    magicEth,
    magicUsd: ethUsd * magicEth,
  };
};
