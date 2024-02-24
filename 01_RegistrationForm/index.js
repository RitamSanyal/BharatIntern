const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv")

const app = express ();
app.use(express.static('public'));
dotenv.config();

const port = process.env.PORT || 5000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.hevhgcf.mongodb.net/registrationFormDB`,{
    // useNewUrlParser : true,
    // useUnifiedTopology : true,
});

const registrationSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
});

const Registration = mongoose.model("Registration",registrationSchema);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
});

app.post("/register",async(req,res)=>{
    try{
        const{name,email,password} = req.body;

        const existingUser = await Registration.findOne({email:email});
        if(!existingUser){
            const registrationData = new Registration({
                name,
                email,
                password
            });
            await registrationData.save();
            res.redirect("/success");
        }
        else{
            console.log("User Already Exists");
            res.redirect("/error");
        }
    }
    catch (error){
        console.log(error);
        res.redirect("/error");
    }
});

app.get("/success",(req,res)=>{
    res.sendFile(__dirname+"/success.html");
});

app.get("/error",(req,res)=>{
    res.sendFile(__dirname+"/error.html");
});

app.listen(port,()=>{
    console.log(`server is runnin on port ${port}`)
});