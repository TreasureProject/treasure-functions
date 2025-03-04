import { parseAbi } from "viem";

import { CONTRACT_BEACON_WRIT_OF_PASSAGE } from "../constants";
import { arbitrumClient } from "../utils/provider";

const abi = parseAbi(["function balanceOf(address) view returns (uint256)"]);

export const getWritOfPassageBalance = async (
  address: string
): Promise<bigint> =>
  arbitrumClient.readContract({
    address: CONTRACT_BEACON_WRIT_OF_PASSAGE,
    abi,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });
