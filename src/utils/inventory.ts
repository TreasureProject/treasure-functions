interface FetchUserInventoryParams {
  userAddress: string;
  chain: string;
  collectionAddresses?: string[];
  tokens?: Array<{ address: string; tokenId: string | number }>;
  projection?: string;
  limit?: number;
}

interface TokenAttribute {
  trait_type: string;
  value: string | number;
}

interface TokenImage {
  uri: string;
  originalUri?: string;
}

interface TokenMetadata {
  name: string;
  attributes: TokenAttribute[];
  imageAlt?: string;
}

interface TokenResponse {
  collectionAddr: string;
  tokenId: string;
  metadata: TokenMetadata;
  image: TokenImage;
  queryUserQuantityOwned: number;
}

interface ApiResponse {
  tokens?: TokenResponse[];
  message?: string;
  errorMessage?: string;
}

interface ProcessedToken {
  user: string;
  address: string;
  tokenId: number;
  name: string;
  image: string;
  imageAlt: string;
  attributes: Array<{ type: string; value: string | number }>;
  balance: number;
}

export const fetchUserInventory = async ({
  userAddress,
  chain,
  collectionAddresses = [],
  tokens = [],
  projection = "collectionAddr,collectionUrlSlug,queryUserQuantityOwned,metadata,image",
  limit = undefined,
}: FetchUserInventoryParams): Promise<ProcessedToken[]> => {
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
    headers: { "X-API-Key": process.env.TROVE_API_KEY as string },
    body: JSON.stringify(body),
  });

  const results = (await response.json()) as ApiResponse;
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
      }): ProcessedToken => ({
        user: userAddress,
        address,
        tokenId: Number(tokenId),
        name,
        image,
        imageAlt: imageAlt ?? originalUri ?? "",
        attributes: attributes.map(({ trait_type: type, value }) => ({
          type,
          value,
        })),
        balance,
      })
    )
    .sort((a, b) => a.tokenId - b.tokenId);
};
