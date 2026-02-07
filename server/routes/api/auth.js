import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import getUser from "../../controllers/auth.controller.js";

const router = express.Router();

//@route Get api/auth
//@access Public
router.get("/",authMiddleware, getUser)

export default router;
