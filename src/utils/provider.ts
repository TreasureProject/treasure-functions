import { Connection, clusterApiUrl } from "@solana/web3.js";
import { Chain, PublicClient, createPublicClient, fallback, http } from "viem";
import { abstract, arbitrum, mainnet } from "viem/chains";

// Alchemy is the primary RPC. Each chain gets an explicit public fallback list
// rather than viem's bare http(), which silently resolves to whatever default
// viem ships for that chain. That default is how the supply endpoints broke:
// thirdweb started returning 401 on an unpaid account, viem fell through to its
// mainnet default (eth.merkle.io), and that endpoint rate-limited us, so
// /magic/total-supply and /magic/circulating-supply returned 500 while the CEXs
// that poll them got nothing. Naming every endpoint means a failure is a
// failure we chose.
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

// Alchemy's subdomains do not follow a single pattern, so they are listed
// explicitly instead of being derived from the chain id.
const ALCHEMY_SUBDOMAIN: Record<number, string> = {
  [mainnet.id]: "eth-mainnet",
  [arbitrum.id]: "arb-mainnet",
  [abstract.id]: "abstract-mainnet",
};

const PUBLIC_FALLBACKS: Record<number, string[]> = {
  [mainnet.id]: ["https://eth.drpc.org", "https://ethereum-rpc.publicnode.com"],
  [arbitrum.id]: [
    "https://arb1.arbitrum.io/rpc",
    "https://arbitrum-one-rpc.publicnode.com",
  ],
  [abstract.id]: ["https://api.mainnet.abs.xyz"],
};

// These handlers run in Lambda with a 6 second timeout, so the whole fallback
// chain has to fail inside that budget. Three endpoints at 1.5s and no retries
// is 4.5s worst case, leaving room to return an error rather than be killed.
const TIMEOUT_MS = 1_500;

const transportFor = (chainId: number) => {
  const urls: string[] = [];

  const subdomain = ALCHEMY_SUBDOMAIN[chainId];
  if (ALCHEMY_API_KEY && subdomain) {
    urls.push(`https://${subdomain}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);
  }

  urls.push(...(PUBLIC_FALLBACKS[chainId] ?? []));

  if (urls.length === 0) {
    throw new Error(`No RPC endpoint configured for chain ${chainId}`);
  }

  return fallback(
    urls.map((url) => http(url, { timeout: TIMEOUT_MS, retryCount: 0 }))
  );
};

const clientFor = (chain: Chain): PublicClient =>
  createPublicClient({ chain, transport: transportFor(chain.id) });

export const arbitrumClient: PublicClient = clientFor(arbitrum);

export const ethereumClient: PublicClient = clientFor(mainnet);

// Routing every chain through clientFor() also resolves the type
// incompatibility viem's built-in abstract chain definition used to cause here,
// so this no longer needs a @ts-expect-error.
export const abstractClient: PublicClient = clientFor(abstract);

// Solana connection
export const solanaConnection = new Connection(
  process.env.SOLANA_RPC_URL || clusterApiUrl("mainnet-beta")
);
