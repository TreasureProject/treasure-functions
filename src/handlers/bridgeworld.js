const {
  getCorruption,
  getMines,
  getLegionHolders,
  hasGenesisLegion,
  hasHarvesterAccess,
} = require("../services/bridgeworld");

exports.getCorruption = getCorruption;

exports.getMines = getMines;

exports.getLegionHolders = getLegionHolders;

exports.verifyGenesisLegionHolders = async (event) => {
  const body = JSON.parse(event.body);
  const wallets = (body.wallets || body.wallet || []).map((wallet) =>
    wallet.toLowerCase()
  );
  console.log("Querying Genesis Legion holder status for wallets:", wallets);
  return {
    success: await hasGenesisLegion(wallets),
  };
};

exports.verifyHarvesterAccess = async (event) => {
  const body = JSON.parse(event.body);
  const wallets = (body.wallets || body.wallet || []).map((wallet) =>
    wallet.toLowerCase()
  );
  const id = event.pathParameters.id.toLowerCase();
  console.log("Querying Harvester access for wallets:", id, wallets);
  return {
    success: await hasHarvesterAccess(id, wallets),
  };
};
