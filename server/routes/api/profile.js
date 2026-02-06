import express from "express";

const router = express.Router();

//@route Get api/profile
//@access Public
router.get("/", (req, res) => {
    res.send("Profile Route");
});

export default router;
