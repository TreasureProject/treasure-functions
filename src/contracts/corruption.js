const { Contract } = require("@ethersproject/contracts");
const { CONTRACT_CORRUPTION } = require("../constants");
const { parseNumber } = require("../utils/number");
const { arbitrumProvider } = require("../utils/provider");

const corruption = new Contract(
  CONTRACT_CORRUPTION,
  [
    "function addressToStreamInfo(address) view returns (uint128,uint32,uint96,uint128,uint128,uint256)",
    "function balanceOfBatch(address[]) view returns (uint256[])",
  ],
  arbitrumProvider
);

exports.getCorruptionBalances = async (addresses) => {
  const balances = await corruption.balanceOfBatch(addresses);
  return balances.map((balance) => parseNumber(balance));
};

exports.getCorruptionInfo = async (address) => {
  const [, rawBoost, , rawRatePerSecond, , generatedCorruptionCap] =
    await corruption.addressToStreamInfo(address);
  const boost = rawBoost / 100_000;
  const ratePerSecond = parseNumber(rawRatePerSecond);
  return {
    boost,
    ratePerSecond,
    boostedRatePerSecond: ratePerSecond * (1 + boost),
    generatedCorruptionCap: parseNumber(generatedCorruptionCap),
  };
};
