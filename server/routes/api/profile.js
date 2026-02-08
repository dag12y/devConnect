import express from "express";
import authMiddleware from '../../middleware/auth.middleware.js'
import { getProfile,uploadProfile } from "../../controllers/profile.controller.js";
import { check } from "express-validator";

const router = express.Router();

//@route Get api/profile/me
//@desc get current user profile 
//@access Private
router.get("/me", authMiddleware,getProfile);

//@route Post api/profile
//@desc upload new user profile
//@access Private
router.post("/",authMiddleware, [
    check('status','Status is required').not().isEmpty(),
    check("skills","Skills is required").not().isEmpty(),
],uploadProfile);



export default router;
