import { Connection, clusterApiUrl } from "@solana/web3.js";
import { PublicClient, createPublicClient, fallback, http } from "viem";
import { abstract, arbitrum, mainnet } from "viem/chains";

export const arbitrumClient: PublicClient = createPublicClient({
  chain: arbitrum,
  transport: fallback([
    http(
      `https://${arbitrum.id}.rpc.thirdweb.com/${process.env.THIRDWEB_CLIENT_ID}`
    ),
    http(),
  ]),
});

export const ethereumClient: PublicClient = createPublicClient({
  chain: mainnet,
  transport: fallback([
    http(
      `https://${mainnet.id}.rpc.thirdweb.com/${process.env.THIRDWEB_CLIENT_ID}`
    ),
    http(),
  ]),
});

// @ts-expect-error: viem's built-in abstract chain definition creates some type
// incompatibility that we don't see eith arbitrum or mainnet.
export const abstractClient: PublicClient = createPublicClient({
  chain: abstract,
  transport: fallback([
    http(
      `https://${abstract.id}.rpc.thirdweb.com/${process.env.THIRDWEB_CLIENT_ID}`
    ),
    http(),
  ]),
});

// Solana connection
export const solanaConnection = new Connection(
  process.env.SOLANA_RPC_URL || clusterApiUrl("mainnet-beta")
);
