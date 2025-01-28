const { hasNft } = require("../services/nft-holder");
const { parseVulcanWallets } = require("../utils/vulcan");

exports.verifyNftHolders = async (event) => {
  const { address } = event.pathParameters ?? {};
  if (!address) {
    return {
      success: false,
      reason: `'address' was undefined.`,
    };
  }
  const wallets = parseVulcanWallets(event);
  console.log(`Querying NFT (${address}) holder status for wallets:`, wallets);
  return {
    success: await hasNft(address, wallets),
  };
};
