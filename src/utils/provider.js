const { StaticJsonRpcProvider } = require("@ethersproject/providers");
const { JSON_RPC_ARBITRUM } = require("../constants");

exports.arbitrumProvider = new StaticJsonRpcProvider(JSON_RPC_ARBITRUM);
