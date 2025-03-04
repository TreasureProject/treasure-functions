import { getLegionHolders, hasGenesisLegion } from "../services/bridgeworld";
import { parseVulcanWallets } from "../utils/vulcan";

export { getLegionHolders };

interface Result {
  success: boolean;
}

export const verifyGenesisLegionHolders = async (
  event: any
): Promise<Result> => {
  const wallets = parseVulcanWallets(event);
  console.log("Querying Genesis Legion holder status for wallets:", wallets);
  return {
    success: await hasGenesisLegion(wallets),
  };
};
