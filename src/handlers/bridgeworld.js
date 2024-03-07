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
  console.log(event, event?.body, event?.body?.wallet);
  const wallets = event?.body?.wallets
    ? event.body.wallets
    : event?.body?.wallet
      ? [event.body.wallet]
      : [];
  return {
    success: await hasGenesisLegion(wallets),
  };
};
