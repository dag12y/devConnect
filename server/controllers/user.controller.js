import { validationResult } from "express-validator";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

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
                errors:[{msg: "User already exists"}],
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

        return res.status(201).json({ message: "User registered" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Server error",
        });
    }
}
