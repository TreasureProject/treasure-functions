const { Contract } = require("@ethersproject/contracts");
const { CONTRACT_BEACON_PETS_STAKING_RULES } = require("../constants");
const { arbitrumProvider } = require("../utils/provider");

const beaconPetsStakingRules = new Contract(
  CONTRACT_BEACON_PETS_STAKING_RULES,
  ["function beaconPetsAmountStaked(address) view returns (uint256)"],
  arbitrumProvider
);

module.exports = beaconPetsStakingRules;
