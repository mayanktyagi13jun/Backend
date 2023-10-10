const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    age: {
        type: Number,
    },

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
},
{
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;
        }
    },
},
{
    timestamps: true
}
);

module.exports = mongoose.model("user", UserSchema);