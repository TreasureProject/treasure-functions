const { AlchemyProvider } = require("@ethersproject/providers");

exports.ethereumProvider = new AlchemyProvider(
  "ethereum",
  process.env.ALCHEMY_KEY_ARBITRUM
);

exports.arbitrumProvider = new AlchemyProvider(
  "arbitrum",
  process.env.ALCHEMY_KEY_ARBITRUM
);
