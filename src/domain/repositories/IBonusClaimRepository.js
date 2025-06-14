class IBonusClaimRepository {
  async create(bonusClaim) {
    throw new Error('Method not implemented');
  }

  async findByUserIdAndType(userId, bonusType) {
    throw new Error('Method not implemented');
  }
}

module.exports = IBonusClaimRepository; 