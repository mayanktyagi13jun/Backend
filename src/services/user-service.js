const UserRepository = require("../database/repository/user-repository");
const { generateHash, isPasswordValid } = require("../utils");

// All Business logic will be here

class userServices {
  constructor() {
    this.repository = new UserRepository();
  }

  // User Registeration
  async SignUp(userInputs) {
    const { email, password, phone, age, firstname, lastname } = userInputs;
    let userHashedPassword = await generateHash(password);
    try {
      const createdUser = await this.repository.createUser({
        email,
        password: userHashedPassword,
        phone,
        age,
        firstname,
        lastname,
      });

      console.log("here is createdUser", createdUser);

      return createdUser;
    } catch (err) {
      throw new Error("Data Not found", err);
    }
  }

  // User Login
  async Signin(userInputs) {
    const { email, password } = userInputs;

    try {
      const user = await this.repository.findUserByEmail({ email });

      if (user) {
        const match = await isPasswordValid(password, user.password);
        if (match) {
          return user;
        }
      }
    } catch (err) {
      throw new Error("Data Not found", err);
    }
  }
}

module.exports = userServices;
