const { CONTRACT_BEACON_QUESTING } = require("../constants");
const { arbitrumClient } = require("../utils/provider");
const { parseAbi } = require("viem");

const abi = parseAbi([
  "function getUserQuests(address) view returns (uint128,uint128,uint128)",
]);

exports.getUserQuests = async (address) =>
  arbitrumClient.readContract({
    address: CONTRACT_BEACON_QUESTING,
    abi,
    functionName: "getUserQuests",
    args: [address],
  });
