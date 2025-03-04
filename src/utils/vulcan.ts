interface EventBody {
  wallets?: string[];
  wallet?: string[];
  [key: string]: any;
}

interface EventRequest {
  body: string;
  [key: string]: any;
}

export const parseVulcanWallets = (event: EventRequest): string[] => {
  const body = JSON.parse(event.body) as EventBody;
  const wallets = body.wallets || body.wallet || [];
  return wallets
    .filter((wallet) => wallet.startsWith("0x"))
    .map((wallet) => wallet.toLowerCase());
};
