const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv")

const app = express ();
dotenv.config();

const port = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post("/reister",(req,res)=>{
    try{
        const{name,email,password} = req.body;
    }
    catch{

    }
})

app.listen(port,()=>{
    console.log(`server is runnin on port ${port}`)
})