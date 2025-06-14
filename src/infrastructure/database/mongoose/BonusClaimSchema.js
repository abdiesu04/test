const mongoose = require('mongoose');

const bonusClaimSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  bonusType: {
    type: String,
    required: true,
    enum: ['DAILY', 'WELCOME', 'EVENT']
  },
  claimedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

// Compound index for userId and bonusType
bonusClaimSchema.index({ userId: 1, bonusType: 1 });

module.exports = mongoose.model('BonusClaim', bonusClaimSchema); 