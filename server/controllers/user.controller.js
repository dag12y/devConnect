import { validationResult } from "express-validator";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "config";

export async function registerUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                errors: [{ msg: "User already exists" }],
            });
        }

        // get gravatar
        const avatar = gravatar.url(email, {
            s: "200",
            r: "pg",
            d: "mm",
        });

        // create user
        user = new User({
            name,
            email,
            password,
            avatar,
        });

        // hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save
        await user.save();

        //return jwt
        const payload = {
            user: {
                id: user._id,
            },
        };
        const jwtSecret = config.get("jwtSecret");
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
