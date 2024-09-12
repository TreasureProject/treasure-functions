const { CONTRACT_BEACON_WRIT_OF_PASSAGE } = require("../constants");
const { arbitrumClient } = require("../utils/provider");
const { parseAbi } = require("viem");

const abi = parseAbi(["function balanceOf(address) view returns (uint256)"]);

exports.getWritOfPassageBalance = async (address) =>
  arbitrumClient.readContract({
    address: CONTRACT_BEACON_WRIT_OF_PASSAGE,
    abi,
    functionName: "balanceOf",
    args: [address],
  });
