const { body, param } = require('express-validator');

const createUserValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail()
];

const updateUserValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid user ID'),
  
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail()
];

const userIdValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid user ID')
];

module.exports = {
  createUserValidator,
  updateUserValidator,
  userIdValidator
}; 