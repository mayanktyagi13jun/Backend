const UserRepository  = require("../database/repository/user-repository");

// All Business logic will be here

class userServices {
  constructor() {
    this.repository = new UserRepository();
  }

  async SignUp(userInputs) {
    const { email, password, phone, age } = userInputs;

    try {
      const createdUser = await this.repository.createUser({
        email,
        password,
        phone,
        age,
      });

      console.log("here is createdUser", createdUser);

      return createdUser;
    } catch (err) {
      throw new Error("Data Not found", err);
    }
  }
}

module.exports = userServices;
