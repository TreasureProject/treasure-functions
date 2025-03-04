import { CONTRACT_BEACON } from "../constants";
import { getBeaconPetsAmountStaked } from "../contracts/beaconPetsStakingRules";
import { getUserQuests } from "../contracts/beaconQuesting";
import { getWritOfPassageBalance } from "../contracts/beaconWritOfPassage";
import { fetchUserInventory } from "../utils/inventory";

interface NFTAttribute {
  type: string;
  value: string;
}

interface NFTItem {
  attributes: NFTAttribute[];
  [key: string]: any;
}

export const hasFoundingCharacter = async (
  wallets: string[]
): Promise<boolean> => {
  if (wallets.length === 0) {
    return false;
  }

  const results = await Promise.all([
    ...wallets.map((wallet) => getUserQuests(wallet)),
    ...wallets.map((wallet) =>
      fetchUserInventory({
        userAddress: wallet,
        chain: "arb",
        collectionAddresses: [CONTRACT_BEACON],
      })
    ),
  ]);

  const quests = results.slice(0, wallets.length);
  const inventories = results.slice(wallets.length) as NFTItem[][];

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

export const hasPet = async (wallets: string[]): Promise<boolean> => {
  if (wallets.length === 0) {
    return false;
  }

  const results = await Promise.all([
    ...wallets.map((wallet) => getBeaconPetsAmountStaked(wallet)),
    ...wallets.map((wallet) =>
      fetchUserInventory({
        userAddress: wallet,
        chain: "arb",
        collectionAddresses: [CONTRACT_BEACON],
      })
    ),
  ]);

  const stakedAmounts = results.slice(0, wallets.length) as bigint[];
  const inventories = results.slice(wallets.length) as NFTItem[][];

  return (
    stakedAmounts.some((amount) => amount > 0n) ||
    inventories
      .flat()
      .some(({ attributes }) =>
        attributes.some(
          ({ type, value }) => type === "Token Type" && value === "PET"
        )
      )
  );
};

export const hasWritOfPassage = async (wallets: string[]): Promise<boolean> => {
  if (wallets.length === 0) {
    return false;
  }

  const results = await Promise.all(
    wallets.map((wallet) => getWritOfPassageBalance(wallet))
  );
  return results.some((balance) => balance > 0n);
};
