const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({

    email: {
        type: String,
        required: [true, 'Why no email?'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },

    phone: {
        type: String,
        required: [true, 'Why no phone?'],
        unique: true,
        minLength: [10, "no should have minimum 10 digits"],
        maxLength: [10, "no should have maximum 10 digits"],
        match: [/\d{10}/, "no should only have digits"]
    },

    password: {
        type: String,
        required: [true, 'Why no password?'],
    },

    age: {
        type: Number,
        min: [18, 'Below 18 employees registration is not allwoed'],
    },

    firstname: {
        type: String,
        required: [true, 'Why no Firstname?'],
    },
    lastname: {
        type: String,
        required: [true, 'Why no lastname?'],
    },
    refreshToken: [],
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