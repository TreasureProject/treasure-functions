const {
  hasFoundingCharacter,
  hasPet,
  hasWritOfPassage,
} = require("../services/beacon");
const { parseVulcanWallets } = require("../utils/vulcan");

exports.verifyBeaconHolders = async (event) => {
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

exports.verifyFoundingCharacterHolders = async (event) => {
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

exports.verifyPetHolders = async (event) => {
  const wallets = parseVulcanWallets(event);
  console.log("Querying Beacon Pet holder status for wallets:", wallets);
  const result = { success: await hasPet(wallets) };
  console.log(
    `Pets result ${JSON.stringify(result)} for wallets: ${JSON.stringify(wallets)}`
  );
  return result;
};

exports.verifyWritOfPassageHolders = async (event) => {
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
