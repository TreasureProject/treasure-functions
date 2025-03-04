import { hasNft } from "../services/nft-holder";
import { parseVulcanWallets } from "../utils/vulcan";

interface EventWithPathParams {
  pathParameters?: {
    address?: string;
  };
  body: string;
  [key: string]: any;
}

interface Result {
  success: boolean;
  reason?: string;
}

export const verifyNftHolders = async (
  event: EventWithPathParams
): Promise<Result> => {
  const { address } = event.pathParameters ?? {};
  if (!address) {
    return {
      success: false,
      reason: `'address' was undefined.`,
    };
  }
  const wallets = parseVulcanWallets(event);
  console.log(`Querying NFT (${address}) holder status for wallets:`, wallets);
  const result = { success: await hasNft(address, wallets) };
  console.log(
    `NFT ${address} result ${JSON.stringify(result)} for wallets: ${JSON.stringify(wallets)}`
  );
  return result;
};
