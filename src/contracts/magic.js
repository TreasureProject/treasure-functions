const { erc20Abi } = require("viem");
const {
  CONTRACT_MAGIC_L1,
  CONTRACT_MAGIC,
  CONTRACT_MAGIC_TREASURE,
} = require("../constants");
const { parseNumber } = require("../utils/number");
const {
  arbitrumClient,
  ethereumClient,
  treasureClient,
} = require("../utils/provider");

exports.getMagicTotalSupply = async () => {
  const [treasureTotalSupply, arbitrumTotalSupply, ethTotalSupply] =
    await Promise.all([
      treasureClient.readContract({
        address: CONTRACT_MAGIC_TREASURE,
        abi: erc20Abi,
        functionName: "totalSupply",
      }),
      arbitrumClient.readContract({
        address: CONTRACT_MAGIC,
        abi: erc20Abi,
        functionName: "totalSupply",
      }),
      ethereumClient.readContract({
        address: CONTRACT_MAGIC_L1,
        abi: erc20Abi,
        functionName: "totalSupply",
      }),
    ]);
  return parseNumber(treasureTotalSupply) + parseNumber(ethTotalSupply);
};

exports.getMagicBalanceOf = async (address, isL1 = false, isTreasure = false) =>
  parseNumber(
    isTreasure
      ? await treasureClient.getBalance({
          address,
        })
      : isL1
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
