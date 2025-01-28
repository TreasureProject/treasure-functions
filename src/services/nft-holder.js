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

  return inventories.flat().length > 0;
};
