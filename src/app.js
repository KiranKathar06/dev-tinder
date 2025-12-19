const express = require("express");
const connectDB = require("./config/backend");
const User =  require("./models/user");
const app = express();
const {validateUserData} = require("./utils/validation")
const bcrypt = require('bcrypt');

app.use(express.json())

app.post("/signup", async (req,res)=>{
    try{
        //validate user data
        validateUserData(req);
        const {firstName, lastName, emailId, password} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        console.log("Request Body:", req.body);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash  
        })
        await user.save();
        res.send("User signed up successfully");

    }catch(err){
        console.error("Error signing up user:", err);
        res.status(400).send("Error: " + err.message);
    }

})


//get the details of user by email id
app.get("/user",async (req,res) =>{
    const userEmail = req.body.emailId;
    try{
        const users = await  User.find({emailId: userEmail});
        if(users.length === 0){
            return res.status(404).send("User not found");
        }else{
            res.send(users);
            console.log("User found:", users);
        }
       
    }catch(err){
        console.error("Error finding user by email:", err);
        res.status(400).send("Error finding user by email:");
    }
})

//retrive all feed 
app.get("/feeds", async (req,res) =>{
    try{
        const feeds = await User.find({});
        console.error("Success retrieving feeds:", feeds);
        res.send(feeds);
    }catch(err){
        console.error("Error retrieving feeds:", err);
        res.status(400).send("Error retrieving feeds:");
    }
})

//delete user by id
app.delete("/user", async(req,res) =>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }catch(err){
        console.error("Error deleting user:", err);
        res.status(400).send("Error deleting user:");
    }
})

//update the user by id
app.patch("/user",async (req,res) =>{
    const userId = req.body.userId;
    console.log("Updating user with ID:", userId);
    const data = req.body;
    try{
        await User.findByIdAndUpdate({_id: userId}, data);
        res.send("User updated successfully");
    }catch(err){
        console.error("Error updating user:", err);
        res.status(400).send("Error updating user:");
    }
})

connectDB().then(() =>{
    console.log("DB connected successfully");
    app.listen(7777, () =>{console.log("Server is running on port 7777")});
        }).catch((err) =>{
            console.log("DB connection error", err);
        })


