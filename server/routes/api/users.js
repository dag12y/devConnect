import express from "express";

const router = express.Router();

//@route Get api/users
//@access Public
router.get("/", (req, res) => {
    res.send("User Route");
});

export default router;
