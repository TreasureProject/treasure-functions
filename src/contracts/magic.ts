import { erc20Abi } from "viem";

import {
  CONTRACT_MAGIC,
  CONTRACT_MAGIC_L1,
  CONTRACT_MAGIC_TREASURE,
} from "../constants";
import { parseNumber } from "../utils/number";
import {
  arbitrumClient,
  ethereumClient,
  treasureClient,
} from "../utils/provider";

interface TotalSupplyResult {
  totalSupplyTreasure: number;
  totalSupplyEth: number;
}

export const getMagicTotalSupply = async (): Promise<TotalSupplyResult> => {
  const [totalSupplyTreasure, totalSupplyEth] = await Promise.all([
    treasureClient.readContract({
      address: CONTRACT_MAGIC_TREASURE as `0x${string}`,
      abi: erc20Abi,
      functionName: "totalSupply",
    }),
    ethereumClient.readContract({
      address: CONTRACT_MAGIC_L1 as `0x${string}`,
      abi: erc20Abi,
      functionName: "totalSupply",
    }),
  ]);
  return {
    totalSupplyTreasure: parseNumber(totalSupplyTreasure as bigint),
    totalSupplyEth: parseNumber(totalSupplyEth as bigint),
  };
};

export const getMagicBalanceOf = async (
  address: string,
  isL1 = false,
  isTreasure = false
): Promise<number> =>
  parseNumber(
    isTreasure
      ? ((await treasureClient.getBalance({
          address: address as `0x${string}`,
        })) as bigint)
      : isL1
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
