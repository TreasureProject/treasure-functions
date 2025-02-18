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
  const result = { success: await hasNft(address, wallets) };
  console.log(
    `NFT ${address} result ${JSON.stringify(result)} for wallets: ${JSON.stringify(wallets)}`
  );
  return result;
};
