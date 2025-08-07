import {
  CIRCULATING_SUPPLY_EXCLUDED,
  CIRCULATING_SUPPLY_EXCLUDED_EXTENDED,
  TOTAL_SUPPLY_EXCLUDED,
} from "../constants";
import { getSmolBalanceOf } from "../contracts/smol";
import { getSmolContractTotalSupply } from "../contracts/smol";
import { sumArray } from "../utils/array";

// Define types for the service
interface ExcludedBalance {
  name: string;
  addresses: string[];
  balance: number;
}

interface TotalSupplyResult {
  totalSupply: number;
  totalSupplyTreasure: number;
  totalSupplyEth: number;
  totalSupplySol: number;
  excludedBalances: ExcludedBalance[];
}

interface CirculatingSupplyResult {
  totalSupply: number;
  totalExcluded: number;
  circulatingSupply: number;
  excludedBalances: ExcludedBalance[];
}

// Helper function to determine chain from address name
const getChainFromName = (name: string): string => {
  if (name.includes("(eth)")) return "ethereum";
  if (name.includes("(treasure)")) return "treasure";
  if (name.includes("(sol)")) return "solana";
  return "ethereum"; // Default to Ethereum
};

export const getSmolTotalSupply = async (): Promise<TotalSupplyResult> => {
  const { totalSupplyTreasure, totalSupplyEth, totalSupplySol } =
    await getSmolContractTotalSupply();

  // Hardcoded to 1B because the total supply is not minted yet
  const totalSupply = 1_210_995_204.282397572845138055;
  // const totalSupply = totalSupplyEth + totalSupplySol + totalSupplyTreasure;

  const excludedList = Object.entries(TOTAL_SUPPLY_EXCLUDED);
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

export const getSmolCirculatingSupply =
  async (): Promise<CirculatingSupplyResult> => {
    // For now, we'll use the same excluded addresses as MAGIC
    // In a production environment, this should be updated with SMOL-specific exclusions
    const excludedList = Object.entries({
      ...CIRCULATING_SUPPLY_EXCLUDED,
      ...CIRCULATING_SUPPLY_EXCLUDED_EXTENDED,
    });
    const totalSupplyData = await getSmolTotalSupply();
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
