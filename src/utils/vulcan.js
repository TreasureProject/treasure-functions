exports.parseVulcanWallets = (event) => {
  const body = JSON.parse(event.body);
  const wallets = body.wallets || body.wallet || [];
  return wallets
    .filter((wallet) => wallet.startsWith("0x"))
    .map((wallet) => wallet.toLowerCase());
};
