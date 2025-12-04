const mongoose = require('mongoose');

const connectDB = async () =>{
    await mongoose.connect(
    "mongodb+srv://PracNode:axk31IepCCYv2jyP@pracnode.3htn3bz.mongodb.net/devTinder"
);
}

module.exports = connectDB;