const { Contract } = require("@ethersproject/contracts");
const { CONTRACT_MAGIC, CONTRACT_MAGIC_L1 } = require("../constants");
const { parseNumber } = require("../utils/number");
const { arbitrumProvider, ethereumProvider } = require("../utils/provider");

const magic = new Contract(
  CONTRACT_MAGIC,
  [
    "function balanceOf(address) view returns (uint256)",
    "function totalSupply() view returns (uint256)",
  ],
  arbitrumProvider
);

const magicL1 = new Contract(
  CONTRACT_MAGIC_L1,
  ["function totalSupply() view returns (uint256)"],
  ethereumProvider
);

exports.getMagicTotalSupply = async () =>
  parseNumber(await magicL1.totalSupply());

exports.getMagicBalanceOf = async (address) =>
  parseNumber(await magic.balanceOf(address));
