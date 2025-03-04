import { PublicKey } from "@solana/web3.js";

import { solanaConnection } from "./provider";

/**
 * Get token supply for a Solana SPL token
 * @param {string} mintAddress The token's mint address
 * @returns {Promise<number>} The total supply as a number
 */
export const getTokenSupply = async (mintAddress: string): Promise<number> => {
  try {
    const mintPublicKey = new PublicKey(mintAddress);
    const tokenSupply = await solanaConnection.getTokenSupply(mintPublicKey);

    // Convert to human readable number based on token decimals
    return parseFloat(tokenSupply.value.uiAmountString || "0");
  } catch (error) {
    console.error(
      `Error fetching Solana token supply: ${error instanceof Error ? error.message : String(error)}`
    );
    throw error;
  }
};

/**
 * Get token account balance for a specific owner
 * @param {string} mintAddress The token's mint address
 * @param {string} ownerAddress The owner's address
 * @returns {Promise<number>} The balance as a number
 */
export const getTokenBalance = async (
  mintAddress: string,
  ownerAddress: string
): Promise<number> => {
  try {
    const mintPublicKey = new PublicKey(mintAddress);
    const ownerPublicKey = new PublicKey(ownerAddress);

    // Find all token accounts owned by this owner for this token mint
    const tokenAccounts = await solanaConnection.getTokenAccountsByOwner(
      ownerPublicKey,
      { mint: mintPublicKey }
    );

    let totalBalance = 0;

    // Sum up the balance in all accounts
    for (const accountInfo of tokenAccounts.value) {
      const account = await solanaConnection.getParsedAccountInfo(
        accountInfo.pubkey
      );

      // Check if account.value is not null and account.value.data is parsed
      if (account.value && "parsed" in account.value.data) {
        const parsedData = account.value.data;
        const balance = parsedData.parsed.info.tokenAmount.uiAmount;
        totalBalance += balance;
      }
    }

    return totalBalance;
  } catch (error) {
    console.error(
      `Error fetching Solana token balance: ${error instanceof Error ? error.message : String(error)}`
    );
    return 0; // Return 0 if we can't get the balance - this matches behavior of other chain implementations
  }
};
