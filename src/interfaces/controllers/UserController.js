const { validationResult } = require('express-validator');
const CreateUserUseCase = require('../../application/usecases/CreateUserUseCase');

class UserController {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.createUserUseCase = new CreateUserUseCase(userRepository);
  }

  async create(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email } = req.body;
      const user = await this.createUserUseCase.execute(name, email);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const user = await this.userRepository.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email } = req.body;
      const user = await this.userRepository.update(req.params.id, { name, email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const user = await this.userRepository.delete(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController; 