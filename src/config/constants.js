module.exports = {
  BONUS_TYPES: {
    DAILY: 'DAILY',
    WELCOME: 'WELCOME',
    EVENT: 'EVENT'
  },
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
  },
  ERROR_MESSAGES: {
    BONUS_ALREADY_CLAIMED: 'User has already claimed %s bonus',
    INVALID_BONUS_TYPE: 'Invalid bonus type',
    BONUS_TYPE_REQUIRED: 'Bonus type is required',
    USER_ID_REQUIRED: 'User ID is required',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    DATABASE_ERROR: 'Database operation failed',
    VALIDATION_ERROR: 'Validation failed'
  }
}; 