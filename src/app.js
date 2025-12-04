const express = require('express');
const connectDB = require('./config/database');
const app = express();

const User = require('./models/user')
app.post("/signup", async (req, res) => {
    const userObj = {
        firstName: "Virat",
        lastName: "Kohli",
        emailId: "virat3715@gmail.com",
        password: "Virat@109"
    }
    //creating a new instance of the User model
    const user = new User(userObj);
    //saved to db...returns a promise
    try{
        await user.save();
    res.send("User added successfully");
    }
    catch(err) {
        res.status(400).send("Error saving the user" + err.message)
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




