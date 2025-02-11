const { fetchUserInventory } = require("../utils/inventory");

exports.hasNft = async (address, wallets) => {
  const inventories = await Promise.all(
    wallets.map((wallet) =>
      fetchUserInventory({
        userAddress: wallet,
        chain: "treasure",
        collectionAddresses: [address],
        limit: 1,
      })
    )
  );

  if (inventories.flat().length > 0) {
    return true;
  }

  // If not in the user's inventory, fallback to handling special cases.
  if (address === "0xde20a0a37e9f1120c5ec88081185804b66c2dc7b") {
    // Whether their WOP is staked on Treasure chain.
    for (let i = 0; i < wallets.length; i += 1) {
      const wallet = wallets[i];
      const response = await fetch(
        `https://trove-api.treasure.lol/partner/the-beacon/wop-staking/${wallet}`
      );
      const result = await response.json();
      return !!result?.staked;
    }
  }

  // Default to false.
  return false;
};
