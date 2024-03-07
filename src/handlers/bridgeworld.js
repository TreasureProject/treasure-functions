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
  const wallets = event?.body?.wallets
    ? event.body.wallets
    : event?.body?.wallet
      ? [event.body.wallet]
      : [];
  return {
    success: await hasGenesisLegion(wallets),
  };
};
