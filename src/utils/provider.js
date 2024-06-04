const { StaticJsonRpcProvider } = require("@ethersproject/providers");

exports.ethereumProvider = new StaticJsonRpcProvider(
  `https://1.rpc.thirdweb.com/${process.env.THIRDWEB_CLIENT_ID}`,
  "homestead"
);
exports.arbitrumProvider = new StaticJsonRpcProvider(
  `https://42161.rpc.thirdweb.com/${process.env.THIRDWEB_CLIENT_ID}`,
  "arbitrum"
);
