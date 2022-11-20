import type { AWS } from "@serverless/typescript";

export const serverlessConfiguration: AWS = {
  service: "treasure-functions-ts",
  frameworkVersion: "3",
  useDotenv: true,
  provider: {
    name: "aws",
    stage: "prod",
    region: "us-east-1",
    runtime: "nodejs14.x",
    environment: {
      ALCHEMY_KEY_ETHEREUM: "${env:ALCHEMY_KEY_ETHEREUM}",
      ALCHEMY_KEY_ARBITRUM: "${env:ALCHEMY_KEY_ARBITRUM}",
    },
  },
  package: { individually: true },
  plugins: ["serverless-esbuild"],
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
  functions: {
    // /magic
    getMagicTotalSupply: {
      handler: "src/handlers/magic.getTotalSupply",
      events: [
        {
          httpApi: {
            path: "/magic/total-supply",
            method: "get",
          },
        },
        {
          httpApi: {
            path: "/total-supply",
            method: "get",
          },
        },
      ],
    },
    getMagicCirculatingSupply: {
      handler: "src/handlers/magic.getCirculatingSupply",
      events: [
        {
          httpApi: {
            path: "/magic/circulating-supply",
            method: "get",
          },
        },
        {
          httpApi: {
            path: "/circulating-supply",
            method: "get",
          },
        },
      ],
    },
    getMagicPrice: {
      handler: "src/handlers/magic.getPrice",
      events: [
        {
          httpApi: {
            path: "/magic/price",
            method: "get",
          },
        },
      ],
    },
    // /mines
    getMines: {
      handler: "src/handlers/mine.getMines",
      events: [
        {
          httpApi: {
            path: "/mines",
            method: "get",
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
