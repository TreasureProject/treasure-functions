const {
  getCorruption,
  getMines,
  getLegionHolders,
  hasGenesisLegion,
  hasHarvesterAccess,
} = require("../services/bridgeworld");
const { parseVulcanWallets } = require("../utils/vulcan");

exports.getCorruption = getCorruption;

exports.getMines = getMines;

exports.getLegionHolders = getLegionHolders;

exports.verifyGenesisLegionHolders = async (event) => {
  const wallets = parseVulcanWallets(event);
  console.log("Querying Genesis Legion holder status for wallets:", wallets);
  return {
    success: await hasGenesisLegion(wallets),
  };
};

exports.verifyHarvesterAccess = async (event) => {
  const wallets = parseVulcanWallets(event);
  const id = event.pathParameters.id.toLowerCase();
  console.log("Querying Harvester access for wallets:", id, wallets);
  return {
    success: await hasHarvesterAccess(id, wallets),
  };
};
