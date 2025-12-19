const mongoose = require('mongoose');
const validator = require('validator');
//create the user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email ID");
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    about: {
        type: String,
        default: "this is about me section"
    },
    skills: {
        type: [String],
    }
},{ timestamps: true});

module.exports = mongoose.model('User', userSchema);
