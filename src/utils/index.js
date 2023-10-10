const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.generateHash = async (password) => {
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  return hash;
};

module.exports.isPasswordValid = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error("Incorrect email or Password");
  }
};

module.exports.generateToken = async (payload) => {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    }catch (error) {
        throw new Error("Unable to generate token");
    }
}
