const { UserModel } = require("../models");
const { findOne } = require("../models/User");

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
      throw new Error("Unable to create user");
    }
  }

  async findUserByEmail({ email }) {
    try {
      const existingUser = await UserModel.findOne({ email: email });
      if(existingUser) {
        return existingUser;
      }else {
        throw new Error("User not found");
      }
      //console.log("here is existingUser verification", existingUser);
      
    } catch (err) {
      throw new Error("Unable to find user");
    }
  }
}

module.exports = UserRepository;
