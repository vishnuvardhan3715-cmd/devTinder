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

const validateEditProfileData = (req) => {
        const allowedEditFields = [
            "about",
            "gender", 
            "age", 
            "skills", 
            "emailId"
        ];
        const isEditAllowed = Object.keys(req.body).every((field)=> allowedEditFields.includes(field));
        return isEditAllowed;
};

module.exports = {
    validateSignUpData,
    validateEditProfileData
};