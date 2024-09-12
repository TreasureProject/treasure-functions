const { CONTRACT_BEACON } = require("../constants");
const {
  getBeaconPetsAmountStaked,
} = require("../contracts/beaconPetsStakingRules");
const { getUserQuests } = require("../contracts/beaconQuesting");
const beaconWritOfPassage = require("../contracts/beaconWritOfPassage");
const { fetchUserInventory } = require("../utils/inventory");

exports.hasFoundingCharacter = async (wallets) => {
  if (wallets.length === 0) {
    return false;
  }

  const results = await Promise.all([
    ...wallets.map((wallet) => getUserQuests(wallet)),
    ...wallets.map((wallet) =>
      fetchUserInventory({
        userAddress: wallet,
        collectionAddresses: [CONTRACT_BEACON],
      })
    ),
  ]);

  const quests = results.slice(0, wallets.length);
  const inventories = results.slice(wallets.length);

  return (
    quests.some((quest) => quest[2] !== BigInt(0)) ||
    inventories
      .flat()
      .some(({ attributes }) =>
        attributes.some(
          ({ type, value }) => type === "Token Type" && value === "CHARACTER"
        )
      )
  );
};

exports.hasPet = async (wallets) => {
  if (wallets.length === 0) {
    return false;
  }

  const results = await Promise.all([
    ...wallets.map((wallet) => getBeaconPetsAmountStaked(wallet)),
    ...wallets.map((wallet) =>
      fetchUserInventory({
        userAddress: wallet,
        collectionAddresses: [CONTRACT_BEACON],
      })
    ),
  ]);

  const stakedAmounts = results.slice(0, wallets.length);
  const inventories = results.slice(wallets.length);

  return (
    stakedAmounts.some((amount) => !BigNumber.from(0).eq(amount)) ||
    inventories
      .flat()
      .some(({ attributes }) =>
        attributes.some(
          ({ type, value }) => type === "Token Type" && value === "PET"
        )
      )
  );
};

exports.hasWritOfPassage = async (wallets) => {
  if (wallets.length === 0) {
    return false;
  }

  const results = await Promise.all(
    wallets.map((wallet) => beaconWritOfPassage.balanceOf(wallet))
  );
  return results.some((balance) => balance.gt(BigNumber.from(0)));
};