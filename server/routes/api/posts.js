import express from "express";
import { check } from "express-validator";
import authMiddleware from "../../middleware/auth.middleware.js";
import { createPost,getAllPosts,getPostById,deletePost,likePost, unlikePost } from "../../controllers/post.controller.js";

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

// @route Put api/posts/like/:id
// @desc Like a post
// @access Private
router.put("/like/:id", authMiddleware, likePost);


// @route Put api/posts/unlike/:id
// @desc Unlike a post
// @access Private
router.put("/unlike/:id", authMiddleware, unlikePost);

export default router;
