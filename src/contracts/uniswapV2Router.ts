import { Contract } from "@ethersproject/contracts";

import { arbitrumProvider } from "../utils/provider";

export const createRouterContract = (address) =>
  new Contract(
    address,
    ["function quote(uint256,uint256,uint256) view returns (uint256)"],
    arbitrumProvider
  );

export const getQuote = async (address, amount0, reserve0, reserve1) =>
  await createRouterContract(address).quote(amount0, reserve0, reserve1);
