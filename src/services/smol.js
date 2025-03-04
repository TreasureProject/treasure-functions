const {
  TOTAL_SUPPLY_EXCLUDED,
} = require("../constants");
const {
  getSmolTotalSupply,
  getSmolBalanceOf,
} = require("../contracts/smol");
const { sumArray } = require("../utils/array");

// Helper function to determine chain from address name
const getChainFromName = (name) => {
  if (name.includes("(eth)")) return "ethereum";
  if (name.includes("(treasure)")) return "treasure";
  if (name.includes("(sol)")) return "solana";
  return "ethereum"; // Default to Ethereum
};

exports.getSmolTotalSupply = async () => {
  // For now, we'll use the same excluded addresses as MAGIC
  // In a production environment, this should be updated with SMOL-specific exclusions
  const excludedList = Object.entries(TOTAL_SUPPLY_EXCLUDED);
  const { totalSupplyTreasure, totalSupplyEth, totalSupplySol } = await getSmolTotalSupply();
  const totalSupply = totalSupplyEth + totalSupplySol + totalSupplyTreasure;
  
  const excludedBalances = await Promise.all(
    excludedList.map(([name, addresses]) =>
      Promise.all(
        addresses.map((address) =>
          getSmolBalanceOf(address, getChainFromName(name))
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
    totalSupplySol,
    excludedBalances: excludedList.map(([name, addresses], i) => ({
      name,
      addresses,
      balance: sumArray(excludedBalances[i]),
    })),
  };
};

exports.getSmolCirculatingSupply = async () => {
  // For now, we'll use the same excluded addresses as MAGIC
  // In a production environment, this should be updated with SMOL-specific exclusions
  const excludedList = Object.entries(TOTAL_SUPPLY_EXCLUDED);
  const totalSupplyData = await this.getSmolTotalSupply();
  const totalSupply = totalSupplyData.totalSupply;
  
  const excludedBalances = await Promise.all(
    excludedList.map(([name, addresses]) =>
      Promise.all(
        addresses.map((address) =>
          getSmolBalanceOf(address, getChainFromName(name))
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
