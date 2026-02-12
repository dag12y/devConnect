import User from "../models/User.js";
import Post from "../models/Post.js";
import Profile from "../models/Profile.js";

import { validationResult } from "express-validator";

export async function createPost(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.user.id).select("-password");
    const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
    });
    const post = await newPost.save();
    res.json(post);
}

export async function getAllPosts(req, res) {
    try {
        const posts = await Post.find().sort({ date: -1 });
        if (!posts) {
            return res.status(404).json({ msg: "No posts found" });
        }
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

export async function getPostById(req, res) {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).send("Server Error");
    }
}

export async function deletePost(req, res) {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        // Check if the user owns the post
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" });
        }

        await post.deleteOne();

        res.json({ msg: "Post removed" });
    } catch (err) {
        console.error(err.message);

        // Handle malformed ObjectIds
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Post not found" });
        }

        res.status(500).send("Server Error");
    }
}
