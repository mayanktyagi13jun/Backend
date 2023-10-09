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

    Age: {
        type: Number,
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