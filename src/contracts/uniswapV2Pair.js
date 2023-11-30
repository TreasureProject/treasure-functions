const { Contract } = require("@ethersproject/contracts");
const { arbitrumProvider } = require("../utils/provider");

exports.createPairContract = (address) =>
  new Contract(
    address,
    [
      "function getReserves() view returns (uint112,uint112,uint32)",
      "function totalSupply() view returns (uint256)",
    ],
    arbitrumProvider
  );

exports.getPairReserves = async (address) => {
  const [reserve0, reserve1] =
    await this.createPairContract(address).getReserves();
  return {
    reserve0,
    reserve1,
  };
};

exports.getPairTotalSupply = async (address) => {
  const totalSupply = await this.createPairContract(address).totalSupply();
  return totalSupply;
};
