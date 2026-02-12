import User from "../models/User.js";
import Post from "../models/Post.js";
import Profile from "../models/Profile.js";

import { validationResult } from "express-validator";


export async function createPost(req,res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.user.id).select("-password");
    const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
    });
    const post = await newPost.save();
    res.json(post);
}