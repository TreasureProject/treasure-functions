import {
  hasFoundingCharacter,
  hasPet,
  hasWritOfPassage,
} from "../services/beacon";
import { parseVulcanWallets } from "../utils/vulcan";

interface Result {
  success: boolean;
}

export const verifyBeaconHolders = async (event: any): Promise<Result> => {
  const wallets = parseVulcanWallets(event);
  console.log("Querying Beacon holder status for wallets:", wallets);
  const results = await Promise.all([
    hasFoundingCharacter(wallets),
    hasPet(wallets),
    hasWritOfPassage(wallets),
  ]);
  const result = { success: results.some((result) => result) };
  console.log(
    `Any arb Beacon result ${JSON.stringify(result)} for wallets: ${JSON.stringify(wallets)}`
  );
  return result;
};

export const verifyFoundingCharacterHolders = async (
  event: any
): Promise<Result> => {
  const wallets = parseVulcanWallets(event);
  console.log(
    "Querying Beacon Founding Character holder status for wallets:",
    wallets
  );
  const result = { success: await hasFoundingCharacter(wallets) };
  console.log(
    `Founding Characters result ${JSON.stringify(result)} for wallets: ${JSON.stringify(wallets)}`
  );
  return result;
};

export const verifyPetHolders = async (event: any): Promise<Result> => {
  const wallets = parseVulcanWallets(event);
  console.log("Querying Beacon Pet holder status for wallets:", wallets);
  const result = { success: await hasPet(wallets) };
  console.log(
    `Pets result ${JSON.stringify(result)} for wallets: ${JSON.stringify(wallets)}`
  );
  return result;
};

export const verifyWritOfPassageHolders = async (
  event: any
): Promise<Result> => {
  const wallets = parseVulcanWallets(event);
  console.log(
    "Querying Beacon Writ of Passage holder status for wallets:",
    wallets
  );
  const result = { success: await hasWritOfPassage(wallets) };
  console.log(
    `Arb WoP result ${JSON.stringify(result)} for wallets: ${JSON.stringify(wallets)}`
  );
  return result;
};
