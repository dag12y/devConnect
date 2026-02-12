import express from "express";
import { check } from "express-validator";
import authMiddleware from "../../middleware/auth.middleware.js";
import { createPost,getAllPosts,getPostById,deletePost } from "../../controllers/post.controller.js";

const router = express.Router();

//@route Post api/posts
//@desc Create a post
//@access Private
router.post("/", authMiddleware,[check("text", "Text is required").not().isEmpty()],createPost);


//@route Get api/posts
//@desc Get all posts
//@access Private
router.get("/", authMiddleware,getAllPosts);

//@route Get api/posts/:id
//@desc Get post by id
//@access Private
router.get("/:id", authMiddleware,getPostById);

// @route Delete api/posts/:id
// @desc Delete a post
// @access Private
router.delete("/:id", authMiddleware, deletePost);

export default router;
