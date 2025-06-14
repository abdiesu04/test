const User = require('../../domain/entities/User');
const IUserRepository = require('../../domain/repositories/IUserRepository');
const UserModel = require('../database/mongoose/UserSchema');

class MongooseUserRepository extends IUserRepository {
  async create(user) {
    const userModel = new UserModel({
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    });

    const savedUser = await userModel.save();
    return new User(
      savedUser._id,
      savedUser.name,
      savedUser.email,
      savedUser.createdAt
    );
  }

  async findById(id) {
    const user = await UserModel.findById(id);
    if (!user) return null;
    return new User(
      user._id,
      user.name,
      user.email,
      user.createdAt
    );
  }

  async findByEmail(email) {
    const user = await UserModel.findOne({ email });
    if (!user) return null;
    return new User(
      user._id,
      user.name,
      user.email,
      user.createdAt
    );
  }

  async update(id, user) {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        name: user.name,
        email: user.email
      },
      { new: true }
    );
    if (!updatedUser) return null;
    return new User(
      updatedUser._id,
      updatedUser.name,
      updatedUser.email,
      updatedUser.createdAt
    );
  }

  async delete(id) {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) return null;
    return new User(
      deletedUser._id,
      deletedUser.name,
      deletedUser.email,
      deletedUser.createdAt
    );
  }
}

module.exports = MongooseUserRepository; 