const { hasFoundingCharacter, hasPet } = require("../services/beacon");

exports.verifyFoundingCharacterHolders = async (event) => {
  const body = JSON.parse(event.body);
  const wallets = (body.wallets || body.wallet || []).map((wallet) =>
    wallet.toLowerCase()
  );
  console.log(
    "Querying Beacon Founding Character holder status for wallets:",
    wallets
  );
  return {
    success: await hasFoundingCharacter(wallets),
  };
};

exports.verifyPetHolders = async (event) => {
  const body = JSON.parse(event.body);
  const wallets = (body.wallets || body.wallet || []).map((wallet) =>
    wallet.toLowerCase()
  );
  console.log("Querying Beacon Pet holder status for wallets:", wallets);
  return {
    success: await hasPet(wallets),
  };
};
