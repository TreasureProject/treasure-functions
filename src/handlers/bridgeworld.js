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
  return {
    success: await hasGenesisLegion(body.wallets || body.wallet || []),
  };
};
