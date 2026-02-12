import express from "express";
import { check } from "express-validator";
import authMiddleware from "../../middleware/auth.middleware.js";
import { createPost } from "../../controllers/post.controller.js";

const router = express.Router();

//@route Post api/posts
//@desc Create a post
//@access Private
router.post("/", authMiddleware,[check("text", "Text is required").not().isEmpty()],createPost);

export default router;
