class User {
  constructor(id, name, email, createdAt) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
  }

  static create(name, email) {
    return new User(
      null,
      name,
      email,
      new Date()
    );
  }
}

module.exports = User; 