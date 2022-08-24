const { Contract } = require("@ethersproject/contracts");
const { CONTRACT_MAGIC } = require("../constants");
const { parseNumber } = require("../utils/number");
const { arbitrumProvider } = require("../utils/provider");

const magic = new Contract(
  CONTRACT_MAGIC,
  [
    "function balanceOf(address) view returns (uint256)",
    "function totalSupply() view returns (uint256)",
  ],
  arbitrumProvider
);

exports.getMagicTotalSupply = async () =>
  parseNumber(await magic.totalSupply());

exports.getMagicBalanceOf = async (address) =>
  parseNumber(await magic.balanceOf(address));
