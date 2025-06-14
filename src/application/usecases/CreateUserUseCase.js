const User = require('../../domain/entities/User');

class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(name, email) {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const user = User.create(name, email);
    return this.userRepository.create(user);
  }
}

module.exports = CreateUserUseCase; 