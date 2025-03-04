import { parseAbi } from "viem";

import { arbitrumClient } from "../utils/provider";

const abi = parseAbi([
  "function quote(uint256,uint256,uint256) view returns (uint256)",
]);

export const getQuote = async (
  address: string,
  amount0: bigint,
  reserve0: bigint,
  reserve1: bigint
): Promise<bigint> =>
  arbitrumClient.readContract({
    address: address as `0x${string}`,
    abi,
    functionName: "quote",
    args: [amount0, reserve0, reserve1],
  });
