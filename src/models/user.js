const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email address: "+ value);
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl: {
        type: String,
    },
    about: {
        type: String,
        default: "This is the default description of an user"
    },
    skills: {
        type: [String],
    }
},
{
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;