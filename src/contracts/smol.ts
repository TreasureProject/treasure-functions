import { erc20Abi } from "viem";

import {
  CONTRACT_SMOL_L1,
  CONTRACT_SMOL_SOL,
  CONTRACT_SMOL_TREASURE,
} from "../constants";
import { parseNumber } from "../utils/number";
import { ethereumClient, treasureClient } from "../utils/provider";
import { getTokenBalance, getTokenSupply } from "../utils/solana";

interface TotalSupplyResult {
  totalSupplyTreasure: number;
  totalSupplyEth: number;
  totalSupplySol: number;
}

export const getSmolContractTotalSupply =
  async (): Promise<TotalSupplyResult> => {
    const [totalSupplyTreasure, totalSupplyEth, totalSupplySol] =
      await Promise.all([
        treasureClient.readContract({
          address: CONTRACT_SMOL_TREASURE,
          abi: erc20Abi,
          functionName: "totalSupply",
        }),
        ethereumClient.readContract({
          address: CONTRACT_SMOL_L1,
          abi: erc20Abi,
          functionName: "totalSupply",
        }),
        getTokenSupply(CONTRACT_SMOL_SOL),
      ]);

    return {
      totalSupplyTreasure: parseNumber(totalSupplyTreasure),
      totalSupplyEth: parseNumber(totalSupplyEth),
      totalSupplySol: totalSupplySol, // Already in the correct format from getTokenSupply
    };
  };

export const getSmolBalanceOf = async (
  address: string,
  chain = "ethereum"
): Promise<number> => {
  if (chain === "solana") {
    try {
      return await getTokenBalance(CONTRACT_SMOL_SOL, address);
    } catch (error) {
      console.error(
        `Error getting Solana balance: ${error instanceof Error ? error.message : String(error)}`
      );
      return 0;
    }
  }

  return parseNumber(
    chain === "treasure"
      ? await treasureClient.readContract({
          address: CONTRACT_SMOL_TREASURE,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address as `0x${string}`],
        })
      : await ethereumClient.readContract({
          address: CONTRACT_SMOL_L1,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address as `0x${string}`],
        })
  );
};
