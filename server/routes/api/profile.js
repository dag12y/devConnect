import express from "express";
import authMiddleware from '../../middleware/auth.middleware.js'
import { getProfile,uploadProfile ,getAllProfile,getProfileByUserId} from "../../controllers/profile.controller.js";
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


//@route Get api/profile
//@desc get all user profiles
//@access Public
router.get("/", getAllProfile);

//@route Get api/profile/:user_id
//@desc get profile by user id
//@access Public
router.get("/:user_id", getProfileByUserId);





export default router;
