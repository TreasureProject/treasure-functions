exports.fetchUserInventory = async ({
  userAddress,
  chain,
  collectionAddresses = [],
  tokens = [],
  projection = "collectionAddr,collectionUrlSlug,queryUserQuantityOwned,metadata,image",
  limit = undefined,
}) => {
  const url = new URL("https://trove-api.treasure.lol/tokens-for-user-page");

  const body = {
    userAddress,
    projection,
    limit,
    ids: tokens.length
      ? tokens.map(({ address, tokenId }) => `${chain}/${address}/${tokenId}`)
      : undefined,
    slugs: collectionAddresses.length
      ? collectionAddresses.map((address) => `${chain}/${address}`)
      : undefined,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "X-API-Key": process.env.TROVE_API_KEY },
    body: JSON.stringify(body),
  });

  const results = await response.json();
  if (!results?.tokens || !Array.isArray(results.tokens)) {
    throw new Error(
      `Error fetching user inventory: ${results?.message ?? results?.errorMessage ?? "Unknown error"}`
    );
  }

  return results.tokens
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
