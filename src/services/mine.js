const { MINE_NAME_MAPPING } = require("../constants");
const { getEmissionsRatePerSecond } = require("../contracts/masterOfCoin");
const { getHarvesterShares } = require("../contracts/middleman");

exports.getMines = async () => {
  const [{ addresses, shares, totalShare }, emissionsRatePerSecond] =
    await Promise.all([getHarvesterShares(), getEmissionsRatePerSecond()]);
  return addresses
    .map((address, i) => {
      const emissionsShare = shares[i] / totalShare;
      return {
        address,
        name: MINE_NAME_MAPPING[address],
        emissionsShare,
        emissionsPerSecond: emissionsRatePerSecond * emissionsShare,
      };
    })
    .sort((a, b) => b.emissionsShare - a.emissionsShare);
};
