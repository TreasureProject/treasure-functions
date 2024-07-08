const { Contract } = require("@ethersproject/contracts");
const { CONTRACT_BEACON_WRIT_OF_PASSAGE } = require("../constants");
const { arbitrumProvider } = require("../utils/provider");

const beaconWritOfPassage = new Contract(
  CONTRACT_BEACON_WRIT_OF_PASSAGE,
  ["function balanceOf(address) view returns (uint256)"],
  arbitrumProvider
);

module.exports = beaconWritOfPassage;
