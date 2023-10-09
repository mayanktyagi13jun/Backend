const {UserModel} = require("../models");


//Dealing with data base operations

class UserRepository {

    async createUser({ email, password, phone, age}) {
        try {
            const user = new UserModel({
                email,
                password,
                phone,
                age
            })
            
            const userResult = await user.save();
            return userResult;
        } catch (err) {
            throw new Error('Unable to create user');
        }
    }
}

module.exports = UserRepository;