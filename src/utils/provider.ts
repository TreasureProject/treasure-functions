import { AlchemyProvider } from "@ethersproject/providers";

export const ethereumProvider = new AlchemyProvider(
  "homestead",
  process.env.ALCHEMY_KEY_ARBITRUM
);

export const arbitrumProvider = new AlchemyProvider(
  "arbitrum",
  process.env.ALCHEMY_KEY_ARBITRUM
);
