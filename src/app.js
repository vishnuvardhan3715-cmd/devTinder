const express = require('express');
const connectDB = require('./config/database');
const app = express();

const User = require('./models/user')

app.use(express.json());

app.post("/signup", async (req, res) => {

    const user = new User(req.body);
    
    try{
        await user.save();
    res.send("User added successfully");
    }
    catch(err) {
        res.status(400).send("Error saving the user" + err.message)
    }
    
});

//Get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try{
        const user = await User.find({emailId: userEmail});
        if(user.length === 0){
            res.status(404).send("User not found");
        }
        else{
            res.send(user);
        }
    }
    catch(err) {
        res.status(400).send("Something went wrong");
    }
});

//Feed API - GET /feed - get all the users from the db.
app.get("/feed", async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
});


//delete the user by emailId
app.delete("/user", async (req, res) => {
    const deleteUserByEmailID = req.body.emailId;
    try {
            const user = await User.findOneAndDelete({emailId: deleteUserByEmailID});
            if(!user){
                res.status(404).send("User not found");
            }
            else {
                res.send("Deleted successfully");
            }
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
});

//update the user by emailId
app.patch("/user", async (req, res) => {
    const updateByEmail = req.body;
    const getEmail = req.body.emailId;

    try {

    const ALLOWED_UPDATES = [
        "about", "gender", "age", "skills", "emailId"
    ];
    
    const isUpdateAllowed = Object.keys(updateByEmail).every((k) =>{
        return ALLOWED_UPDATES.includes(k);
    });

    if(!isUpdateAllowed) {
        throw new Error("Update not allowed");
    }

            const user = await User.findOneAndUpdate({emailId: getEmail}, updateByEmail, {
                runValidators: true
            });
            if(!user){
                res.status(404).send("User not found");
            }
            else {
                res.send("Updated successfully");
            }
    }
    catch(err){
        res.status(400).send("Update failed:"+ err.message);
    }
});

connectDB().then(() => {
    console.log("Database connected");
    app.listen(3000, ()=>{
    console.log('Server is successfully listening on port 3000...');
    }); 
})
.catch((err) => {
    console.error("Database not connected yet");
})




