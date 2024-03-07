const {
  getCorruption,
  getMines,
  getLegionHolders,
  hasGenesisLegion,
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
