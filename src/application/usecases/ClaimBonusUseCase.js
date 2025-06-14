const BonusClaim = require('../../domain/entities/BonusClaim');
const VaultLogger = require('../../infrastructure/external/VaultLogger');

class ClaimBonusUseCase {
  constructor(bonusClaimRepository) {
    this.bonusClaimRepository = bonusClaimRepository;
  }

  async execute(userId, bonusType) {
    // Check if user has already claimed this type of bonus
    const existingClaim = await this.bonusClaimRepository.findByUserIdAndType(userId, bonusType);
    if (existingClaim) {
      throw new Error(`User has already claimed ${bonusType} bonus`);
    }

    // Create new bonus claim
    const bonusClaim = BonusClaim.create(userId, bonusType);
    
    // Save to database
    const savedClaim = await this.bonusClaimRepository.create(bonusClaim);
    
    // Log the claim
    await VaultLogger.logClaim(userId, bonusType);
    
    return savedClaim;
  }
}

module.exports = ClaimBonusUseCase; 