import { Contract } from "@ethersproject/contracts";

import { arbitrumProvider } from "../utils/provider";

export const createPairContract = (address) =>
  new Contract(
    address,
    ["function getReserves() view returns (uint112,uint112,uint32)"],
    arbitrumProvider
  );

export const getPairReserves = async (address) => {
  const [reserve0, reserve1] = await createPairContract(address).getReserves();
  return {
    reserve0,
    reserve1,
  };
};
