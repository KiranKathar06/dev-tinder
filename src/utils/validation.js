const validator = require('validator');


const validateUserData = (req) =>{
    const {firstName, lastName, emailId,password} = req.body
    console.log("Validating user data:", firstName);
    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email Id is not valid");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough");
    }
}

module.exports = {validateUserData}