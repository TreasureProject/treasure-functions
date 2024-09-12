const { createPublicClient, http, fallback } = require("viem");
const { mainnet, arbitrum } = require("viem/chains");

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
