const { Contract } = require("@ethersproject/contracts");
const { CONTRACT_BEACON_QUESTING } = require("../constants");
const { arbitrumProvider } = require("../utils/provider");

const beaconQuesting = new Contract(
  CONTRACT_BEACON_QUESTING,
  ["function getUserQuests(address) view returns (uint128,uint128,uint128)"],
  arbitrumProvider
);

module.exports = beaconQuesting;
