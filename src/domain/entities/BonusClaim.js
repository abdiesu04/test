class BonusClaim {
  constructor(id, userId, bonusType, claimedAt) {
    this.id = id;
    this.userId = userId;
    this.bonusType = bonusType;
    this.claimedAt = claimedAt;
  }

  static create(userId, bonusType) {
    return new BonusClaim(
      null,
      userId,
      bonusType,
      new Date()
    );
  }
}

module.exports = BonusClaim; 