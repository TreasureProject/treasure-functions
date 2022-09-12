const axios = require("axios");
const {
  CIRCULATING_SUPPLY_EXCLUDED,
  CIRCULATING_SUPPLY_EXCLUDED_EXTENDED,
} = require("../constants");
const {
  getMagicTotalSupply,
  getMagicBalanceOf,
} = require("../contracts/magic");
const { sumArray } = require("../utils/array");

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
  const { data } = await axios.post(
    "https://api.thegraph.com/subgraphs/name/sushiswap/arbitrum-exchange",
    {
      query: `{
      bundle(id: "1") {
        ethPrice
      }
      pair(id: "0xb7e50106a5bd3cf21af210a755f9c8740890a8c9") {
        token1Price
      }
    }`,
    }
  );
  const ethUsd = parseFloat(data?.data.bundle.ethPrice ?? "0");
  const magicEth = parseFloat(data?.data.pair.token1Price ?? "0");
  return {
    ethUsd,
    magicEth,
    magicUsd: ethUsd * magicEth,
  };
};
