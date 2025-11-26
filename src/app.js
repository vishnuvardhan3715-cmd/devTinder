const express = require('express');

const app = express();

//requestHandler
app.use("/test",(req, res)=>{
    res.send('Test from the server!');
});

app.use("/", (req, res)=>{
    res.send('Hello, Welcome from the dashboard!')
});

app.listen(3000, ()=>{
    console.log('Server is successfully listening on port 3000...');
}); 