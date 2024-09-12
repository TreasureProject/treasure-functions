const { arbitrumClient } = require("../utils/provider");
const { parseAbi } = require("viem");

const abi = parseAbi([
  "function getReserves() view returns (uint112,uint112,uint32)",
  "function totalSupply() view returns (uint256)",
]);

exports.getPairReserves = async (address) => {
  const [reserve0, reserve1] = await arbitrumClient.readContract({
    address,
    abi,
    functionName: "getReserves",
  });
  return {
    reserve0,
    reserve1,
  };
};

exports.getPairTotalSupply = async (address) =>
  arbitrumClient.readContract({
    address,
    abi,
    functionName: "totalSupply",
  });
