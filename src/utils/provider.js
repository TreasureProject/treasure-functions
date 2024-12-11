const { TREASURE_CHAIN_DEFINITION } = require("@treasure-dev/tdk-core");
const { createPublicClient, http, fallback, defineChain } = require("viem");
const { mainnet, arbitrum } = require("viem/chains");

exports.treasureClient = createPublicClient({
  chain: defineChain(TREASURE_CHAIN_DEFINITION),
  transport: fallback([
    http(
      `https://${TREASURE_CHAIN_DEFINITION.id}.rpc.thirdweb.com/${process.env.THIRDWEB_CLIENT_ID}`
    ),
    http(),
  ]),
});

exports.arbitrumClient = createPublicClient({
  chain: arbitrum,
  transport: fallback([
    http(
      `https://${arbitrum.id}.rpc.thirdweb.com/${process.env.THIRDWEB_CLIENT_ID}`
    ),
    http(),
  ]),
});

exports.ethereumClient = createPublicClient({
  chain: mainnet,
  transport: fallback([
    http(
      `https://${mainnet.id}.rpc.thirdweb.com/${process.env.THIRDWEB_CLIENT_ID}`
    ),
    http(),
  ]),
});
