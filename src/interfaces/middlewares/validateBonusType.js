const { BONUS_TYPES, HTTP_STATUS, ERROR_MESSAGES } = require('../../config/constants');
const AppError = require('../../domain/errors/AppError');

function validateBonusType(req, res, next) {
  const { bonusType } = req.body;
  
  if (!bonusType) {
    throw new AppError(
      ERROR_MESSAGES.BONUS_TYPE_REQUIRED,
      HTTP_STATUS.BAD_REQUEST,
      'BONUS_TYPE_REQUIRED'
    );
  }

  if (!Object.values(BONUS_TYPES).includes(bonusType)) {
    throw new AppError(
      ERROR_MESSAGES.INVALID_BONUS_TYPE,
      HTTP_STATUS.BAD_REQUEST,
      'INVALID_BONUS_TYPE'
    );
  }

  next();
}

module.exports = validateBonusType; 