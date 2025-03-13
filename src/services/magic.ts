import axios from "axios";
import { parseEther } from "viem";

import {
  CIRCULATING_SUPPLY_EXCLUDED,
  CIRCULATING_SUPPLY_EXCLUDED_EXTENDED,
  CONTRACT_MAGIC_WETH_LP,
  CONTRACT_SUSHISWAP_ROUTER,
  CONTRACT_WETH_USDC_LP,
  TOTAL_SUPPLY_EXCLUDED,
} from "../constants";
import {
  getMagicBalanceOf,
  getMagicTotalSupply as getTotalSupply,
} from "../contracts/magic";
import {
  getPairReserves,
  getPairTotalSupply,
} from "../contracts/uniswapV2Pair";
import { getQuote } from "../contracts/uniswapV2Router";
import {
  APIGatewayResponse,
  CirculatingSupplyResult,
  ExchangeInfoItem,
  PriceResult,
  SlpPriceResult,
  TotalSupplyResult,
} from "../types";
import { sumArray } from "../utils/array";
import { createJsonResponse } from "../utils/handler";
import { parseNumber } from "../utils/number";

const getCoinGeckoPriceInfo = async (
  currencies: string[] = ["USD"]
): Promise<{ magic: Record<string, number> }> => {
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=magic&vs_currencies=${currencies.join(
      ","
    )}&include_market_cap=true&include_24hr_vol=true&x_cg_demo_api_key=${
      process.env.COINGECKO_API_KEY
    }`
  );
  return data as { magic: Record<string, number> };
};

export const getMagicTotalSupply = async (): Promise<TotalSupplyResult> => {
  const excludedList = Object.entries(TOTAL_SUPPLY_EXCLUDED);
  const { totalSupplyTreasure, totalSupplyEth } = await getTotalSupply();
  // const totalSupply = totalSupplyEth;
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
  // const totalExcluded = excludedBalances.reduce(
  //   (acc, balances) => acc + sumArray(balances),
  //   0
  // );
  return {
    totalSupply: 347_685_919.9711497655, // TODO: revert to `totalSupply - totalExcluded`,
    totalSupplyTreasure,
    totalSupplyEth,
    excludedBalances: excludedList.map(([name, addresses], i) => ({
      name,
      addresses,
      balance: sumArray(excludedBalances[i]),
    })),
  };
};

export const getMagicCirculatingSupply = async (
  variant: string
): Promise<CirculatingSupplyResult> => {
  const excludedList = Object.entries(
    variant === "treasure"
      ? {
          ...CIRCULATING_SUPPLY_EXCLUDED,
          ...CIRCULATING_SUPPLY_EXCLUDED_EXTENDED,
        }
      : CIRCULATING_SUPPLY_EXCLUDED
  );
  const totalSupplyData = await getMagicTotalSupply();
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

export const getMagicPrice = async (): Promise<APIGatewayResponse> => {
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

  const ethUsd = parseNumber(wethUsdc as bigint, 6);
  const magicEth = parseNumber(magicWeth as bigint);

  const result: PriceResult = {
    ethUsd,
    magicEth,
    magicUsd: ethUsd * magicEth,
  };

  return createJsonResponse(result);
};

export const getMagicWethSlpPrice = async (): Promise<APIGatewayResponse> => {
  const [magicWethReserves, magicWethTotalSupply] = await Promise.all([
    getPairReserves(CONTRACT_MAGIC_WETH_LP),
    getPairTotalSupply(CONTRACT_MAGIC_WETH_LP),
  ]);

  const result: SlpPriceResult = {
    magic:
      parseNumber(magicWethReserves.reserve0 as bigint) /
      parseNumber(magicWethTotalSupply as bigint),
    eth:
      parseNumber(magicWethReserves.reserve1 as bigint) /
      parseNumber(magicWethTotalSupply as bigint),
  };

  return createJsonResponse(result);
};

export const getMagicExchangeInfo = async (): Promise<APIGatewayResponse> => {
  const currencies = ["USD", "KRW", "IDR", "SGD", "THB"];
  const [{ magic: coinGeckoInfo }, { circulatingSupply }, totalSupplyData] =
    await Promise.all([
      getCoinGeckoPriceInfo(currencies),
      getMagicCirculatingSupply("default"),
      getMagicTotalSupply(),
    ]);
  const baseData = {
    symbol: "MAGIC",
    provider: "Treasure",
    lastUpdatedTimestamp: Date.now(),
  };

  const result: ExchangeInfoItem[] = currencies.map((currencyCode) => ({
    ...baseData,
    currencyCode,
    price: coinGeckoInfo[currencyCode.toLowerCase()],
    marketCap: coinGeckoInfo[`${currencyCode.toLowerCase()}_market_cap`],
    accTradePrice24h: coinGeckoInfo[`${currencyCode.toLowerCase()}_24h_vol`],
    circulatingSupply,
    maxSupply: totalSupplyData.totalSupply,
  }));

  return createJsonResponse(result);
};
