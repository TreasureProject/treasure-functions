import { parseAbi } from "viem";

import { CONTRACT_BEACON_QUESTING } from "../constants";
import { arbitrumClient } from "../utils/provider";

const abi = parseAbi([
  "function getUserQuests(address) view returns (uint128,uint128,uint128)",
]);

export const getUserQuests = async (
  address: string
): Promise<readonly [bigint, bigint, bigint]> =>
  arbitrumClient.readContract({
    address: CONTRACT_BEACON_QUESTING,
    abi,
    functionName: "getUserQuests",
    args: [address as `0x${string}`],
  });
