import { Contract } from "@ethersproject/contracts";

import { CONTRACT_MAGIC, CONTRACT_MAGIC_L1 } from "../constants";
import { parseNumber } from "../utils/number";
import { arbitrumProvider, ethereumProvider } from "../utils/provider";

const erc20Abi = [
  "function balanceOf(address) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
];

const magic = new Contract(CONTRACT_MAGIC, erc20Abi, arbitrumProvider);

const magicL1 = new Contract(CONTRACT_MAGIC_L1, erc20Abi, ethereumProvider);

export const getMagicTotalSupply = async () =>
  parseNumber(await magicL1.totalSupply());

export const getMagicBalanceOf = async (address, isL1 = false) =>
  parseNumber(
    isL1 ? await magicL1.balanceOf(address) : await magic.balanceOf(address)
  );
