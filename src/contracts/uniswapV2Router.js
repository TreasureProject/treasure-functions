const { parseAbi } = require("viem");
const { arbitrumClient } = require("../utils/provider");

const abi = parseAbi([
  "function quote(uint256,uint256,uint256) view returns (uint256)",
]);

exports.getQuote = async (address, amount0, reserve0, reserve1) =>
  arbitrumClient.readContract({
    address,
    abi,
    functionName: "quote",
    args: [amount0, reserve0, reserve1],
  });
