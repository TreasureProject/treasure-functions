const {
  CIRCULATING_SUPPLY_EXCLUDED,
  CIRCULATING_SUPPLY_EXCLUDED_SHORT,
} = require("../constants");
const {
  getMagicTotalSupply,
  getMagicBalanceOf,
} = require("../contracts/magic");

exports.getMagicTotalSupply = getMagicTotalSupply;

exports.getMagicCirculatingSupply = async (variant) => {
  const excludedList =
    variant === "treasure"
      ? CIRCULATING_SUPPLY_EXCLUDED
      : CIRCULATING_SUPPLY_EXCLUDED_SHORT;
  const totalSupply = await this.getMagicTotalSupply();
  const excludedBalances = await Promise.all(
    Object.values(excludedList).map(getMagicBalanceOf)
  );
  const totalExcluded = excludedBalances.reduce(
    (acc, balance) => acc + balance,
    0
  );
  return {
    totalSupply,
    totalExcluded,
    circulatingSupply: totalSupply - totalExcluded,
    excludedBalances: Object.entries(excludedList).map(
      ([name, address], i) => ({
        address,
        name,
        balance: excludedBalances[i],
      })
    ),
  };
};
