const express = require('express');
const UserController = require('../controllers/UserController');
const { createUserValidator, updateUserValidator, userIdValidator } = require('../validators/userValidators');
const MongooseUserRepository = require('../../infrastructure/repositories/MongooseUserRepository');

const router = express.Router();
const userRepository = new MongooseUserRepository();
const userController = new UserController(userRepository);

router.post('/', createUserValidator, userController.create.bind(userController));
router.get('/:id', userIdValidator, userController.getById.bind(userController));
router.put('/:id', updateUserValidator, userController.update.bind(userController));
router.delete('/:id', userIdValidator, userController.delete.bind(userController));

module.exports = router; 