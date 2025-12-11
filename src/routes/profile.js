const express = require('express');
const { userAuth } = require('../middleware/auth');
const {validateEditProfileData} = require('../utils/validation');
const bcrypt = require('bcrypt');
const profileRouter = express.Router();

//get profile info.
profileRouter.get("/profile/view", userAuth, async (req, res) =>{

    try {
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("Error saving the user: " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) =>{
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request");
        }
        
        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();

        res.send("Updated Fields Successfully!!!");
    }
    catch(err){
        res.status(400).send("Error saving the user: " + err.message);
    }
});

profileRouter.patch("/profile/edit-password", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const newPassword = req.body.newPassword;
        const isPasswordValid = await loggedInUser.validatePassword(newPassword);
        if(isPasswordValid) {
            throw new Error("Both Passwords are same.Please Update it...");
        }
        loggedInUser.password = await bcrypt.hash(newPassword, 10);

        await loggedInUser.save();

        res.send("Updated Password Successfully!!!");
        
    }
    catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});

module.exports = profileRouter;