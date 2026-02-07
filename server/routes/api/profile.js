import express from "express";
import authMiddleware from '../../middleware/auth.middleware.js'
import { getProfile } from "../../controllers/profile.controller.js";

const router = express.Router();

//@route Get api/profile/me
//@desc get current user profile 
//@access Private
router.get("/me", authMiddleware,getProfile);

export default router;
