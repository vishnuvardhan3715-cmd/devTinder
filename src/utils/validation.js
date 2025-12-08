const validator = require('validator');

const validateSignUpData = (req) =>{
    const {firstName, lastName, password} = req.body;
    
    if(!firstName || !lastName) {
        throw new Error("Name not added");
    }
    else if(!validator.isStrongPassword(password)) {
        throw new Error("Please Enter a Strong Password!!!");
    }
}

module.exports = {validateSignUpData};