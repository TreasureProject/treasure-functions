const { erc20Abi } = require("viem");
const {
  CONTRACT_SMOL_L1,
  CONTRACT_SMOL_TREASURE,
  CONTRACT_SMOL_SOL,
} = require("../constants");
const { parseNumber } = require("../utils/number");
const {
  ethereumClient,
  treasureClient,
} = require("../utils/provider");
const { getTokenSupply, getTokenBalance } = require("../utils/solana");

exports.getSmolTotalSupply = async () => {
  const [totalSupplyTreasure, totalSupplyEth, totalSupplySol] = await Promise.all([
    treasureClient.readContract({
      address: CONTRACT_SMOL_TREASURE,
      abi: erc20Abi,
      functionName: "totalSupply",
    }),
    ethereumClient.readContract({
      address: CONTRACT_SMOL_L1,
      abi: erc20Abi,
      functionName: "totalSupply",
    }),
    getTokenSupply(CONTRACT_SMOL_SOL),
  ]);
  
  return {
    totalSupplyTreasure: parseNumber(totalSupplyTreasure),
    totalSupplyEth: parseNumber(totalSupplyEth),
    totalSupplySol: totalSupplySol, // Already in the correct format from getTokenSupply
  };
};

exports.getSmolBalanceOf = async (address, chain = "ethereum") => {
  if (chain === "solana") {
    try {
      return await getTokenBalance(CONTRACT_SMOL_SOL, address);
    } catch (error) {
      console.error(`Error getting Solana balance: ${error.message}`);
      return 0;
    }
  }
  
  return parseNumber(
    chain === "treasure"
      ? await treasureClient.readContract({
          address: CONTRACT_SMOL_TREASURE,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address],
        })
      : await ethereumClient.readContract({
          address: CONTRACT_SMOL_L1,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address],
        })
  );
};
