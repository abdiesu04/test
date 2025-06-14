const { HTTP_STATUS, ERROR_MESSAGES } = require('../../config/constants');
const AppError = require('../../domain/errors/AppError');

function errorHandler(err, req, res, next) {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode,
    errorCode: err.errorCode
  });

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: 'fail',
      error: ERROR_MESSAGES.VALIDATION_ERROR,
      details: err.message
    });
  }

  // Handle Mongoose cast errors (invalid IDs)
  if (err.name === 'CastError') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: 'fail',
      error: 'Invalid ID format'
    });
  }

  // Handle duplicate key errors
  if (err.code === 11000) {
    return res.status(HTTP_STATUS.CONFLICT).json({
      status: 'fail',
      error: 'Duplicate entry found'
    });
  }

  // Handle custom AppErrors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err.message,
      errorCode: err.errorCode
    });
  }

  // Handle unknown errors
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    error: process.env.NODE_ENV === 'development' ? err.message : ERROR_MESSAGES.INTERNAL_SERVER_ERROR
  });
}

module.exports = errorHandler; 