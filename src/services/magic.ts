import { BigNumber } from "@ethersproject/bignumber";
import { formatEther, formatUnits } from "@ethersproject/units";

import {
  CIRCULATING_SUPPLY_EXCLUDED,
  CIRCULATING_SUPPLY_EXCLUDED_EXTENDED,
  CONTRACT_MAGIC_WETH_LP,
  CONTRACT_SUSHISWAP_ROUTER,
  CONTRACT_WETH_USDC_LP,
} from "../constants";
import { getMagicBalanceOf, getMagicTotalSupply } from "../contracts/magic";
import { getPairReserves } from "../contracts/uniswapV2Pair";
import { getQuote } from "../contracts/uniswapV2Router";
import { sumArray } from "../utils/array";

const ONE_BN = BigNumber.from("1000000000000000000");

export { getMagicTotalSupply };

export const getMagicCirculatingSupply = async (variant) => {
  const excludedList = Object.entries(
    variant === "treasure"
      ? {
          ...CIRCULATING_SUPPLY_EXCLUDED,
          ...CIRCULATING_SUPPLY_EXCLUDED_EXTENDED,
        }
      : CIRCULATING_SUPPLY_EXCLUDED
  );
  const totalSupply = await getMagicTotalSupply();
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

export const getMagicPrice = async () => {
  const [wethUsdcReserves, magicWethReserves] = await Promise.all([
    getPairReserves(CONTRACT_WETH_USDC_LP),
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
