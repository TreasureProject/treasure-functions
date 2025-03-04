import { parseAbi } from "viem";

import { arbitrumClient } from "../utils/provider";

const abi = parseAbi([
  "function getReserves() view returns (uint112,uint112,uint32)",
  "function totalSupply() view returns (uint256)",
]);

interface PairReserves {
  reserve0: bigint;
  reserve1: bigint;
}

export const getPairReserves = async (
  address: string
): Promise<PairReserves> => {
  const [reserve0, reserve1] = await arbitrumClient.readContract({
    address: address as `0x${string}`,
    abi,
    functionName: "getReserves",
  });
  return {
    reserve0,
    reserve1,
  };
};

export const getPairTotalSupply = async (address: string): Promise<bigint> =>
  arbitrumClient.readContract({
    address: address as `0x${string}`,
    abi,
    functionName: "totalSupply",
  });
