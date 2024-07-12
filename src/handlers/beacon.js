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
  return {
    success: results.some((result) => result),
  };
};

exports.verifyFoundingCharacterHolders = async (event) => {
  const wallets = parseVulcanWallets(event);
  console.log(
    "Querying Beacon Founding Character holder status for wallets:",
    wallets
  );
  return {
    success: await hasFoundingCharacter(wallets),
  };
};

exports.verifyPetHolders = async (event) => {
  const wallets = parseVulcanWallets(event);
  console.log("Querying Beacon Pet holder status for wallets:", wallets);
  return {
    success: await hasPet(wallets),
  };
};

exports.verifyWritOfPassageHolders = async (event) => {
  const wallets = parseVulcanWallets(event);
  console.log(
    "Querying Beacon Writ of Passage holder status for wallets:",
    wallets
  );
  return {
    success: await hasWritOfPassage(wallets),
  };
};
