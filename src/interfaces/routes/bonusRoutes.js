const express = require('express');
const BonusController = require('../controllers/BonusController');
const { claimBonusValidator } = require('../validators/bonusValidators');
const validateBonusType = require('../middlewares/validateBonusType');
const MongooseBonusClaimRepository = require('../../infrastructure/repositories/MongooseBonusClaimRepository');

const router = express.Router();
const bonusClaimRepository = new MongooseBonusClaimRepository();
const bonusController = new BonusController(bonusClaimRepository);

router.post('/claim-bonus', 
  validateBonusType,
  claimBonusValidator,
  bonusController.claimBonus.bind(bonusController)
);

module.exports = router; 