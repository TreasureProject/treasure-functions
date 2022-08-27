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
