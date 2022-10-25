const { AlchemyProvider } = require("@ethersproject/providers");

exports.ethereumProvider = new AlchemyProvider(
  "homestead",
  process.env.ALCHEMY_KEY_ARBITRUM
);

exports.arbitrumProvider = new AlchemyProvider(
  "arbitrum",
  process.env.ALCHEMY_KEY_ARBITRUM
);
