const { validationResult } = require('express-validator');
const ClaimBonusUseCase = require('../../application/usecases/ClaimBonusUseCase');

class BonusController {
  constructor(bonusClaimRepository) {
    this.claimBonusUseCase = new ClaimBonusUseCase(bonusClaimRepository);
  }

  async claimBonus(req, res) {
    console.log('Received claim request:', req.body);
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
      }

      const { userId, bonusType } = req.body;
      console.log('Processing claim for user:', userId, 'bonus type:', bonusType);
      
      const claim = await this.claimBonusUseCase.execute(userId, bonusType);
      console.log('Claim processed successfully:', claim);
      
      res.status(201).json({
        message: 'Bonus claimed successfully',
        claim
      });
    } catch (error) {
      console.error('Error processing claim:', error);
      if (error.message.includes('already claimed')) {
        return res.status(409).json({ error: error.message });
      }
      res.status(500).json({ error: 'Failed to claim bonus' });
    }
  }
}

module.exports = BonusController; 