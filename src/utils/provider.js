const { StaticJsonRpcProvider } = require("@ethersproject/providers");
const {
  JSON_RPC_ARBITRUM,
  JSON_RPC_ETHEREUM,
  JSON_RPC_ARBITRUM_RINKEBY,
} = require("../constants");

exports.ethereumProvider = new StaticJsonRpcProvider(JSON_RPC_ETHEREUM);

exports.arbitrumProvider = new StaticJsonRpcProvider(JSON_RPC_ARBITRUM);

exports.arbitrumRinkebyProvider = new StaticJsonRpcProvider(
  JSON_RPC_ARBITRUM_RINKEBY
);
