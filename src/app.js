const express = require("express");
const connectDB = require("./config/backend");
const User =  require("./models/user");
const app = express();

app.post("/signup", async (req,res)=>{

    //creating new user instance
    const user = new User({
        firstName: "priti",
        lastName: "Kathar",
        emailId: "kkathar4@gmail.com",
        password: "kiran@123"
    })
    
    try{
        await user.save();
        res.send("User signed up successfully");

    }catch(err){
        console.error("Error signing up user:", err);
        res.status(400).send("Error signing up user :");
    }

})


connectDB().then(() =>{
    console.log("DB connected successfully");
    app.listen(7777, () =>{console.log("Server is running on port 7777")});
        }).catch((err) =>{
            console.log("DB connection error", err);
        })


