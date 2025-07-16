import { erc20Abi } from "viem";

import { CONTRACT_MAGIC, CONTRACT_MAGIC_L1 } from "../constants";
import { parseNumber } from "../utils/number";
import { arbitrumClient, ethereumClient } from "../utils/provider";

interface TotalSupplyResult {
  totalSupplyTreasure: number;
  totalSupplyEth: number;
  totalSupplyArb: number;
}

export const getMagicTotalSupply = async (): Promise<TotalSupplyResult> => {
  const [totalSupplyEth, totalSupplyArb] = await Promise.all([
    ethereumClient.readContract({
      address: CONTRACT_MAGIC_L1 as `0x${string}`,
      abi: erc20Abi,
      functionName: "totalSupply",
    }),
    arbitrumClient.readContract({
      address: CONTRACT_MAGIC as `0x${string}`,
      abi: erc20Abi,
      functionName: "totalSupply",
    }),
  ]);
  return {
    totalSupplyTreasure: 0,
    totalSupplyEth: parseNumber(totalSupplyEth as bigint),
    totalSupplyArb: parseNumber(totalSupplyArb as bigint),
  };
};

export const getMagicBalanceOf = async (
  address: string,
  isL1 = false
): Promise<number> =>
  parseNumber(
    isL1
      ? ((await ethereumClient.readContract({
          address: CONTRACT_MAGIC_L1 as `0x${string}`,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address as `0x${string}`],
        })) as bigint)
      : ((await arbitrumClient.readContract({
          address: CONTRACT_MAGIC as `0x${string}`,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address as `0x${string}`],
        })) as bigint)
  );
