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
  const magicKey = "arbitrum:0x539bdE0d7Dbd336b79148AA742883198BBF60342";
  const [{ data: dataNow }, { data: data24h }] = await Promise.all([
    axios.get(`https://coins.llama.fi/prices/current/${magicKey}`),
    axios.get(
      `https://coins.llama.fi/prices/historical/${
        Math.round(Date.now() / 1000) - 86400
      }/${magicKey}`
    ),
  ]);
  const magicUsd = dataNow?.coins[magicKey]?.price ?? 0;
  const magicUsd24h = data24h?.coins[magicKey]?.price ?? 0;
  return {
    magicUsd,
    magicUsd24h,
    change24h: magicUsd > 0 ? (magicUsd24h - magicUsd) / magicUsd : 0,
  };
};
