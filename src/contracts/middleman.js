const { Contract } = require("@ethersproject/contracts");
const { CONTRACT_MIDDLEMAN, BURN_ADDRESS } = require("../constants");
const { parseNumber } = require("../utils/number");
const { arbitrumProvider } = require("../utils/provider");

const middleman = new Contract(
  CONTRACT_MIDDLEMAN,
  [
    "function getHarvesterShares(address) view returns (address[],uint256[],uint256,uint256)",
  ],
  arbitrumProvider
);

exports.getHarvesterShares = async () => {
  const [rawAddresses, rawShares, rawTotalShare] =
    await middleman.getHarvesterShares(BURN_ADDRESS);
  return {
    addresses: rawAddresses.map((address) => address.toLowerCase()),
    shares: rawShares.map(parseNumber),
    totalShare: parseNumber(rawTotalShare),
  };
};
