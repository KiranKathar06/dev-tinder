const mongoose = require("mongoose");

//connection URL
// const url= "mongodb+srv://namastedev:namastedev@namaste-node.e4wyns1.mongodb.net/?appName=Namaste-Node"
const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://namastedev:namastedev@namaste-node.e4wyns1.mongodb.net/devTinder?appName=Namaste-Node");
}

module.exports = connectDB;

