import { Contract } from "@ethersproject/contracts";

import { CONTRACT_MASTER_OF_COIN, CONTRACT_MIDDLEMAN } from "../constants";
import { parseNumber } from "../utils/number";
import { arbitrumProvider } from "../utils/provider";

const masterOfCoin = new Contract(
  CONTRACT_MASTER_OF_COIN,
  ["function getRatePerSecond(address) view returns (uint256)"],
  arbitrumProvider
);

export const getEmissionsRatePerSecond = async () =>
  parseNumber(await masterOfCoin.getRatePerSecond(CONTRACT_MIDDLEMAN));
