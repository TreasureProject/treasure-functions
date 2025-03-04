const { PublicKey, TOKEN_PROGRAM_ID } = require('@solana/web3.js');
const { solanaConnection } = require('./provider');

/**
 * Get token supply for a Solana SPL token
 * @param {string} mintAddress The token's mint address
 * @returns {Promise<number>} The total supply as a number
 */
exports.getTokenSupply = async (mintAddress) => {
  try {
    const mintPublicKey = new PublicKey(mintAddress);
    const tokenSupply = await solanaConnection.getTokenSupply(mintPublicKey);
    
    // Convert to human readable number based on token decimals
    return parseFloat(tokenSupply.value.uiAmountString);
  } catch (error) {
    console.error(`Error fetching Solana token supply: ${error.message}`);
    throw error;
  }
};

/**
 * Get token account balance for a specific owner
 * @param {string} mintAddress The token's mint address
 * @param {string} ownerAddress The owner's address
 * @returns {Promise<number>} The balance as a number
 */
exports.getTokenBalance = async (mintAddress, ownerAddress) => {
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
    for (const { account } of tokenAccounts.value) {
      const accountInfo = await solanaConnection.getParsedAccountInfo(account.pubkey);
      const balance = accountInfo.value.data.parsed.info.tokenAmount.uiAmount;
      totalBalance += balance;
    }
    
    return totalBalance;
  } catch (error) {
    console.error(`Error fetching Solana token balance: ${error.message}`);
    return 0; // Return 0 if we can't get the balance - this matches behavior of other chain implementations
  }
};
