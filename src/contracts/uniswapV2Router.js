const { Contract } = require("@ethersproject/contracts");
const { arbitrumProvider } = require("../utils/provider");

exports.createRouterContract = (address) =>
  new Contract(
    address,
    ["function quote(uint256,uint256,uint256) view returns (uint256)"],
    arbitrumProvider
  );

exports.getQuote = async (address, amount0, reserve0, reserve1) =>
  await this.createRouterContract(address).quote(amount0, reserve0, reserve1);
