const bcrypt = require("bcrypt");

module.exports.generateHash = async (password) => {

    const salt = await bcrypt.genSalt(10);

    const hash =  await bcrypt.hash(password, salt);

    return hash;

}

module.exports.isPasswordValid = async (password, hash) => {
try {
   return await bcrypt.compare(password, hash);
} catch (error) {
    throw new Error("Incorrect email or Password");
}

}