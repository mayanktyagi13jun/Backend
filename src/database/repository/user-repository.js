const { UserModel } = require("../models");
const { findOne } = require("../models/User");
const AppError = require('../../utils/appError');


//Dealing with data base operations

class UserRepository {
  async createUser({ email, password, phone, age, firstname, lastname }) {
    try {
      const user = new UserModel({
        email,
        password,
        phone,
        age,
        firstname,
        lastname,
      });

      const userResult = await user.save();
      console.log("here is userResult", userResult);
      return userResult;
    } catch (err) {
      throw new AppError(err, 400);
    }
  }

  async findUserByEmail({ email }) {
    try {
      var existingUser = await UserModel.findOne({ email: email });

      if (existingUser) {
        return existingUser;
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      throw new Error("Unable to find user");
    }
  }

  async updateRefreshToken(user, refreshToken) {
    try {
      user.refreshToken = user.refreshToken.filter(
        (t) => t.token !== refreshToken.token
      );
      user.refreshToken.push(refreshToken);
      await user.save();
    } catch (error) {
      throw new Error("Unable to update refresh token");
    }
  }

  async findUserBytoken(refreshToken) {
    try {
      var existingUser = await UserModel.findOne({ refreshToken });

      if (existingUser) {
        return existingUser;
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      throw new Error("Unable to find user");
    }
  }
}

module.exports = UserRepository;
