import express from "express";

const router = express.Router();

//@route Get api/auth
//@access Public
router.get("/", (req, res) => {
    res.send("Auth Route");
});

export default router;
