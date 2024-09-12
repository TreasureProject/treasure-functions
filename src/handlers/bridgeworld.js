const {
  getLegionHolders,
  hasGenesisLegion,
} = require("../services/bridgeworld");
const { parseVulcanWallets } = require("../utils/vulcan");

exports.getLegionHolders = getLegionHolders;

exports.verifyGenesisLegionHolders = async (event) => {
  const wallets = parseVulcanWallets(event);
  console.log("Querying Genesis Legion holder status for wallets:", wallets);
  return {
    success: await hasGenesisLegion(wallets),
  };
};
