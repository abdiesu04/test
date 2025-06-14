const { body } = require('express-validator');

const claimBonusValidator = [
  body('userId')
    .trim()
    .notEmpty()
    .withMessage('User ID is required')
    .isString()
    .withMessage('User ID must be a string'),
  
  body('bonusType')
    .trim()
    .notEmpty()
    .withMessage('Bonus type is required')
    .isString()
    .withMessage('Bonus type must be a string')
];

module.exports = {
  claimBonusValidator
}; 