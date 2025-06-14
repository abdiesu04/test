const BonusClaim = require('../../domain/entities/BonusClaim');
const IBonusClaimRepository = require('../../domain/repositories/IBonusClaimRepository');
const BonusClaimModel = require('../database/mongoose/BonusClaimSchema');

class MongooseBonusClaimRepository extends IBonusClaimRepository {
  async create(bonusClaim) {
    const claimModel = new BonusClaimModel({
      userId: bonusClaim.userId,
      bonusType: bonusClaim.bonusType,
      claimedAt: bonusClaim.claimedAt
    });

    const savedClaim = await claimModel.save();
    return new BonusClaim(
      savedClaim._id,
      savedClaim.userId,
      savedClaim.bonusType,
      savedClaim.claimedAt
    );
  }

  async findByUserIdAndType(userId, bonusType) {
    const claim = await BonusClaimModel.findOne({ userId, bonusType });
    if (!claim) return null;
    return new BonusClaim(
      claim._id,
      claim.userId,
      claim.bonusType,
      claim.claimedAt
    );
  }
}

module.exports = MongooseBonusClaimRepository; 