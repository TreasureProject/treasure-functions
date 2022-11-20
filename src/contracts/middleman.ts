import { Contract } from "@ethersproject/contracts";

import { BURN_ADDRESS, CONTRACT_MIDDLEMAN } from "../constants";
import { parseNumber } from "../utils/number";
import { arbitrumProvider } from "../utils/provider";

const middleman = new Contract(
  CONTRACT_MIDDLEMAN,
  [
    "function getHarvesterShares(address) view returns (address[],uint256[],uint256,uint256)",
  ],
  arbitrumProvider
);

export const getHarvesterShares = async () => {
  const [rawAddresses, rawShares, rawTotalShare] =
    await middleman.getHarvesterShares(BURN_ADDRESS);
  return {
    addresses: rawAddresses.map((address) => address.toLowerCase()),
    shares: rawShares.map((share) => parseNumber(share)),
    totalShare: parseNumber(rawTotalShare),
  };
};
