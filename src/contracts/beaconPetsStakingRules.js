const { CONTRACT_BEACON_PETS_STAKING_RULES } = require("../constants");
const { arbitrumClient } = require("../utils/provider");
const { parseAbi } = require("viem");

const abi = parseAbi([
  "function beaconPetsAmountStaked(address) view returns (uint256)",
]);

exports.getBeaconPetsAmountStaked = async (address) =>
  arbitrumClient.readContract({
    address: CONTRACT_BEACON_PETS_STAKING_RULES,
    abi,
    functionName: "beaconPetsAmountStaked",
    args: [address],
  });
