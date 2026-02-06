import express from "express"
import connectDB from "./config/db.js"
import authRouter from "./routes/api/auth.js"
import profileRouter from "./routes/api/profile.js";
import postRouter from "./routes/api/posts.js";
import userRouter from "./routes/api/users.js";


const app =express()
const port = process.env.PORT || 5000

//middleware
app.use(express.json())

//connect db
connectDB()

//define route
app.use('/api/users',userRouter)
app.use("/api/profile", profileRouter);
app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);


app.listen(port,()=>{
    console.log("Server is Running on port: ",port);
    
})