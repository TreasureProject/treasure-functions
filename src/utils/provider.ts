import { Connection, clusterApiUrl } from "@solana/web3.js";
import {
  Chain,
  PublicClient,
  createPublicClient,
  defineChain,
  fallback,
  http,
} from "viem";
import { arbitrum, mainnet } from "viem/chains";

const TREASURE_CHAIN_DEFINITION: Chain = {
  id: 61166,
  name: "Treasure",
  nativeCurrency: {
    name: "MAGIC",
    symbol: "MAGIC",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.treasure.lol"],
    },
    public: {
      http: ["https://rpc.treasure.lol"],
    },
  },
  blockExplorers: {
    default: {
      name: "Treasure Explorer",
      url: "https://treasurescan.io",
    },
  },
};

export const treasureClient: PublicClient = createPublicClient({
  chain: defineChain(TREASURE_CHAIN_DEFINITION),
  transport: fallback([
    http(
      `https://${TREASURE_CHAIN_DEFINITION.id}.rpc.thirdweb.com/${process.env.THIRDWEB_CLIENT_ID}`
    ),
    http(),
  ]),
});

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

// Solana connection
export const solanaConnection = new Connection(
  process.env.SOLANA_RPC_URL || clusterApiUrl("mainnet-beta")
);
