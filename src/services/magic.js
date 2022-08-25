const { CIRCULATING_SUPPLY_EXCLUDED } = require("../constants");
const {
  getMagicTotalSupply,
  getMagicBalanceOf,
} = require("../contracts/magic");

exports.getMagicTotalSupply = getMagicTotalSupply;

exports.getMagicCirculatingSupply = async () => {
  const totalSupply = await getMagicTotalSupply();
  const excludedBalances = await Promise.all(
    Object.values(CIRCULATING_SUPPLY_EXCLUDED).map(getMagicBalanceOf)
  );
  const totalExcluded = excludedBalances.reduce(
    (acc, balance) => acc + balance,
    0
  );
  return {
    totalSupply,
    totalExcluded,
    circulatingSupply: totalSupply - totalExcluded,
    excludedBalances: Object.entries(CIRCULATING_SUPPLY_EXCLUDED).map(([name, address], i) => ({
      address,
      name,
      balance: excludedBalances[i],
    })),
  };
};
