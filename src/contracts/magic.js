const { erc20Abi } = require("viem");
const { CONTRACT_MAGIC_L1, CONTRACT_MAGIC } = require("../constants");
const { parseNumber } = require("../utils/number");
const { arbitrumClient, ethereumClient } = require("../utils/provider");

exports.getMagicTotalSupply = async () =>
  parseNumber(
    await ethereumClient.readContract({
      address: CONTRACT_MAGIC_L1,
      abi: erc20Abi,
      functionName: "totalSupply",
    })
  );

exports.getMagicBalanceOf = async (address, isL1 = false) =>
  parseNumber(
    isL1
      ? await ethereumClient.readContract({
          address: CONTRACT_MAGIC_L1,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address],
        })
      : await arbitrumClient.readContract({
          address: CONTRACT_MAGIC,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address],
        })
  );
