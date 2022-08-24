const { Contract } = require("@ethersproject/contracts");
const { CONTRACT_MASTER_OF_COIN, CONTRACT_MIDDLEMAN } = require("../constants");
const { parseNumber } = require("../utils/number");
const { arbitrumProvider } = require("../utils/provider");

const masterOfCoin = new Contract(
  CONTRACT_MASTER_OF_COIN,
  ["function getRatePerSecond(address) view returns (uint256)"],
  arbitrumProvider
);

exports.getEmissionsRatePerSecond = async () =>
  parseNumber(await masterOfCoin.getRatePerSecond(CONTRACT_MIDDLEMAN));
