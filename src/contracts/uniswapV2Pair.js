const { Contract } = require("@ethersproject/contracts");
const { arbitrumProvider } = require("../utils/provider");

exports.createPairContract = (address) =>
  new Contract(
    address,
    ["function getReserves() view returns (uint112,uint112,uint32)"],
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
