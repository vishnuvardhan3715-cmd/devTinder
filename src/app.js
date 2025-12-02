const express = require('express');
const {checkAuth} = require('./middleware/auth')

const app = express();

app.use("/",checkAuth);

app.use("/user", (req, res) =>{
    res.send("User Login");
});


app.listen(3000, ()=>{
    console.log('Server is successfully listening on port 3000...');
}); 