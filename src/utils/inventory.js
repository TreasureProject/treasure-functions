exports.fetchUserInventory = async ({
  userAddress,
  collectionAddresses = [],
  tokens = [],
  projection = "collectionAddr,collectionUrlSlug,queryUserQuantityOwned,metadata,image",
}) => {
  const url = new URL("https://trove-api.treasure.lol/tokens-for-user");
  url.searchParams.append("userAddress", userAddress);
  url.searchParams.append("projection", projection);
  if (tokens.length > 0) {
    url.searchParams.append(
      "ids",
      tokens
        .map(({ address, tokenId }) => `arb/${address}/${tokenId}`)
        .join(",")
    );
  } else if (collectionAddresses.length > 0) {
    url.searchParams.append(
      "slugs",
      collectionAddresses.map((address) => `arb/${address}`).join(",")
    );
  }

  const response = await fetch(url, {
    headers: {
      "X-API-Key": process.env.TROVE_API_KEY,
    },
  });
  const results = await response.json();
  if (!Array.isArray(results)) {
    throw new Error(
      `Error fetching user inventory: ${results?.message ?? "Unknown error"}`
    );
  }

  return results
    .map(
      ({
        collectionAddr: address,
        tokenId,
        metadata: { name, attributes, imageAlt },
        image: { uri: image, originalUri },
        queryUserQuantityOwned: balance,
      }) => ({
        user: userAddress,
        address,
        tokenId: Number(tokenId),
        name,
        image,
        imageAlt: imageAlt ?? originalUri,
        attributes: attributes.map(({ trait_type: type, value }) => ({
          type,
          value,
        })),
        balance,
      })
    )
    .sort((a, b) => a.tokenId - b.tokenId);
};
