import { parseAbi } from "viem";

import { CONTRACT_BEACON_PETS_STAKING_RULES } from "../constants";
import { arbitrumClient } from "../utils/provider";

const abi = parseAbi([
  "function beaconPetsAmountStaked(address) view returns (uint256)",
]);

export const getBeaconPetsAmountStaked = async (
  address: string
): Promise<bigint> =>
  arbitrumClient.readContract({
    address: CONTRACT_BEACON_PETS_STAKING_RULES,
    abi,
    functionName: "beaconPetsAmountStaked",
    args: [address as `0x${string}`],
  });
