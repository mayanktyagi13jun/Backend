const UserRepository = require("../database/repository/user-repository");
const { generateHash, isPasswordValid, generateToken } = require("../utils");
const AppError = require('../utils/appError');

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
      throw new AppError(err, 400);
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
          // access token
          const accessToken = await generateToken(
            { email: user.email },
            "Access"
          );

          // refresh token
          const refreshToken = await generateToken(
            { email: user.email },
            "Refresh"
          );

          // save refresh token in database
          await this.repository.updateRefreshToken(user, refreshToken);
          // user.refreshToken.push(refreshToken);
          // await user.save();

          return refreshToken;
        }
      }
    } catch (err) {
      throw new Error("Data Not found", err);
    }
  }

  async findUserViaToken(refreshToken) {
    try {
      const user = await this.repository.findUserBytoken(refreshToken);

      return user;
    } catch (err) {
      throw new Error("Data Not found", err);
    }
  }
}

module.exports = userServices;
