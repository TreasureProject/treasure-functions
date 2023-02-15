const {
  MINE_NAME_MAPPING,
  CONTRACT_CRAFTING,
  CONTRACT_ADVANCED_QUESTING,
} = require("../constants");
const {
  getCorruptionInfo,
  getCorruptionBalances,
} = require("../contracts/corruption");
const { getEmissionsRatePerSecond } = require("../contracts/masterOfCoin");
const { getHarvesterShares } = require("../contracts/middleman");

exports.getCorruption = async () => {
  const harvesterAddresses = Object.keys(MINE_NAME_MAPPING);
  const [
    [
      forgeCorruptionBalance,
      ivoryTowerCorruptionBalance,
      ...harvestersCorruptionBalances
    ],
    forgeCorruptionInfo,
    ivoryTowerCorruptionInfo,
    ...harvestersCorruptionInfo
  ] = await Promise.all([
    getCorruptionBalances([
      CONTRACT_CRAFTING,
      CONTRACT_ADVANCED_QUESTING,
      ...harvesterAddresses,
    ]),
    getCorruptionInfo(CONTRACT_CRAFTING),
    getCorruptionInfo(CONTRACT_ADVANCED_QUESTING),
    ...harvesterAddresses.map(getCorruptionInfo),
  ]);
  return [
    {
      name: "The Forge",
      balance: forgeCorruptionBalance,
      ...forgeCorruptionInfo,
    },
    {
      name: "Ivory Tower",
      balance: ivoryTowerCorruptionBalance,
      ...ivoryTowerCorruptionInfo,
    },
    ...harvestersCorruptionInfo.map((corruption, i) => ({
      name: MINE_NAME_MAPPING[harvesterAddresses[i]],
      balance: harvestersCorruptionBalances[i],
      ...corruption,
    })),
  ];
};

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
