import express from "express"
import connectDB from "./config/db.js"

const app =express()
const port = process.env.PORT || 5000

//connect db
connectDB()

app.get("/",(req,res)=>{
    res.send("It works!")
})

app.listen(port,()=>{
    console.log("Server is Running on port: ",port);
    
})