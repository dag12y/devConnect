import express from "express";

const router = express.Router();

//@route Get api/posts
//@access Public
router.get("/", (req, res) => {
    res.send("Posts Route");
});

export default router;
