const jwt = require('jsonwebtoken');
const User = require('../models/user')

const userAuth = async (req, res, next) =>{
    try{
         //Read the token fron the req cookies
         //Validate the token
         //Find the user
    const {token} = req.cookies;
    if(!token){
        throw new Error("Token is not found!!!!");
    }

    const decodedObj = await jwt.verify(token, "Dev@Tinder23");//returns hidden data+some other info , after verifying with pass like

    const {_id} = decodedObj;

    const user = await User.findById(_id);
    if(!user){
        throw new Error("User not found");
    }
    req.user = user;
    next();
    }
    catch(err) {
        res.status(400).send("Error: "+ err.message)
    }
};
module.exports = {userAuth};