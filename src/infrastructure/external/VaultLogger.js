class VaultLogger {
  static async logClaim(userId, bonusType) {
    // Simulating external logging service
    console.log(`[VaultLogger] Claim logged - User: ${userId}, Bonus: ${bonusType}, Time: ${new Date().toISOString()}`);
    return true;
  }
}

module.exports = VaultLogger; 