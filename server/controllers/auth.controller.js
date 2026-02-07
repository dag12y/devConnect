import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import config from "config";

export async function getUser(req,res) {
    try {
        const user = await User.findById(req.user.id).select('-password')
        return res.json({user})
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            success:false,
            msg:"Server error.",
            error:error.message
        })
    }
    
} 


export async function login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password } = req.body;

    try {
        // check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                errors: [{ msg: "Invalid credentials." }],
            });
        }

        //check password
        const isMatched = await bcrypt.compare(password,user.password)
        //return jwt
        const payload = {
            user: {
                id: user._id,
            },
        };
        const jwtSecret = config.get("jwtSecret");
        if(!isMatched){
            return res.status(400).json({
                success: false,
                errors: [{ msg: "Invalid credentials." }],
            });
        }

        jwt.sign(payload, jwtSecret, { expiresIn: "24h" }, (err, token) => {
            if (err) throw err;

            res.status(201).json({
                success: true,
                token,
            });
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            errors: [{ msg: "Server error" }],
        });
    }
}