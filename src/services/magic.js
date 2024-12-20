const axios = require("axios");

const {
  CIRCULATING_SUPPLY_EXCLUDED,
  CIRCULATING_SUPPLY_EXCLUDED_EXTENDED,
  CONTRACT_WETH_USDC_LP,
  CONTRACT_MAGIC_WETH_LP,
  CONTRACT_SUSHISWAP_ROUTER,
  TOTAL_SUPPLY_EXCLUDED,
} = require("../constants");
const {
  getMagicTotalSupply,
  getMagicBalanceOf,
} = require("../contracts/magic");
const {
  getPairReserves,
  getPairTotalSupply,
} = require("../contracts/uniswapV2Pair");
const { getQuote } = require("../contracts/uniswapV2Router");
const { sumArray } = require("../utils/array");
const { parseNumber } = require("../utils/number");
const { parseEther } = require("viem");

const getCoinGeckoPriceInfo = async (currencies = ["USD"]) => {
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=magic&vs_currencies=${currencies.join(
      ","
    )}&include_market_cap=true&include_24hr_vol=true&x_cg_demo_api_key=${
      process.env.COINGECKO_API_KEY
    }`
  );
  return data;
};

exports.getMagicTotalSupply = async () => {
  const excludedList = Object.entries(TOTAL_SUPPLY_EXCLUDED);
  const { totalSupplyTreasure, totalSupplyEth } = await getMagicTotalSupply();
  const totalSupply = totalSupplyEth;
  const excludedBalances = await Promise.all(
    excludedList.map(([name, addresses]) =>
      Promise.all(
        addresses.map((address) =>
          getMagicBalanceOf(
            address,
            name.includes("(eth)"),
            name.includes("(treasure)")
          )
        )
      )
    )
  );
  const totalExcluded = excludedBalances.reduce(
    (acc, balances) => acc + sumArray(balances),
    0
  );
  return {
    totalSupply: totalSupply - totalExcluded,
    totalSupplyTreasure,
    totalSupplyEth,
    excludedBalances: excludedList.map(([name, addresses], i) => ({
      name,
      addresses,
      balance: sumArray(excludedBalances[i]),
    })),
  };
};

exports.getMagicCirculatingSupply = async (variant) => {
  const excludedList = Object.entries(
    variant === "treasure"
      ? {
          ...CIRCULATING_SUPPLY_EXCLUDED,
          ...CIRCULATING_SUPPLY_EXCLUDED_EXTENDED,
        }
      : CIRCULATING_SUPPLY_EXCLUDED
  );
  const totalSupplyData = await this.getMagicTotalSupply();
  const totalSupply = totalSupplyData.totalSupply;
  const excludedBalances = await Promise.all(
    excludedList.map(([name, addresses]) =>
      Promise.all(
        addresses.map((address) =>
          getMagicBalanceOf(
            address,
            name.includes("(eth)"),
            name.includes("(treasure)")
          )
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
    getPairReserves(CONTRACT_WETH_USDC_LP),
    getPairReserves(CONTRACT_MAGIC_WETH_LP),
  ]);

  const [wethUsdc, magicWeth] = await Promise.all([
    getQuote(
      CONTRACT_SUSHISWAP_ROUTER,
      parseEther("1"),
      wethUsdcReserves.reserve0,
      wethUsdcReserves.reserve1
    ),
    getQuote(
      CONTRACT_SUSHISWAP_ROUTER,
      parseEther("1"),
      magicWethReserves.reserve0,
      magicWethReserves.reserve1
    ),
  ]);

  const ethUsd = parseNumber(wethUsdc, 6);
  const magicEth = parseNumber(magicWeth);

  return {
    ethUsd,
    magicEth,
    magicUsd: ethUsd * magicEth,
  };
};

exports.getMagicWethSlpPrice = async () => {
  const [magicWethReserves, magicWethTotalSupply] = await Promise.all([
    getPairReserves(CONTRACT_MAGIC_WETH_LP),
    getPairTotalSupply(CONTRACT_MAGIC_WETH_LP),
  ]);
  return {
    magic:
      parseNumber(magicWethReserves.reserve0) /
      parseNumber(magicWethTotalSupply),
    eth:
      parseNumber(magicWethReserves.reserve1) /
      parseNumber(magicWethTotalSupply),
  };
};

exports.getMagicExchangeInfo = async () => {
  const currencies = ["USD", "KRW", "IDR", "SGD", "THB"];
  const [{ magic: coinGeckoInfo }, { circulatingSupply }, totalSupplyData] =
    await Promise.all([
      getCoinGeckoPriceInfo(currencies),
      this.getMagicCirculatingSupply(),
      this.getMagicTotalSupply(),
    ]);
  const baseData = {
    symbol: "MAGIC",
    provider: "Treasure",
    lastUpdatedTimestamp: Date.now(),
  };
  return currencies.map((currencyCode) => ({
    ...baseData,
    currencyCode,
    price: coinGeckoInfo[currencyCode.toLowerCase()],
    marketCap: coinGeckoInfo[`${currencyCode.toLowerCase()}_market_cap`],
    accTradePrice24h: coinGeckoInfo[`${currencyCode.toLowerCase()}_24h_vol`],
    circulatingSupply,
    maxSupply: totalSupplyData.totalSupply,
  }));
};
