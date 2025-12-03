const express = require('express');
const {checkAuth} = require('./middleware/auth')

const app = express();

app.use("/user",checkAuth);

app.use("/user/:userId", (req, res) =>{
    console.log(req.params.userId)
    res.send("User Login Successful");
});


app.listen(3000, ()=>{
    console.log('Server is successfully listening on port 3000...');
}); 