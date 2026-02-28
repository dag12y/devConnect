import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import {
    getProfile,
    uploadProfile,
    getAllProfile,
    getProfileByUserId,
    deleteProfile,
    addExperience,
    deleteExperience,
    addEducation,
    deleteEducation,
    getGithubRepos
} from "../../controllers/profile.controller.js";
import { check } from "express-validator";

const router = express.Router();

//@route Get api/profile/me
//@desc get current user profile
//@access Private
router.get("/me", authMiddleware, getProfile);

//@route Post api/profile
//@desc upload new user profile
//@access Private
router.post(
    "/",
    authMiddleware,
    [
        check("status", "Status is required").not().isEmpty(),
        check("skills", "Skills is required").not().isEmpty(),
    ],
    uploadProfile,
);

//@route Get api/profile
//@desc get all user profiles
//@access Public
router.get("/", getAllProfile);

//@route Get api/profile/github/:username
// @desc Get user repos from Github
// @access Public
router.get("/github/:username", getGithubRepos);

//@route Get api/profile/:id
//@desc get profile by user id
//@access Public
router.get("/:id", getProfileByUserId);

//@route Delete api/profile
//@desc delete profile,user & posts
//@access Private
router.delete("/", authMiddleware, deleteProfile);

//@route Put api/profile/experience
//@desc add profile experience
//@access Private

router.put(
    "/experience",
    authMiddleware,
    [
        check("title", "Title is required").not().isEmpty(),
        check("company", "Company is required").not().isEmpty(),
        check("from", "From date is required").not().isEmpty(),
    ],
    addExperience,
);

// @route Delete api/profile/experience/:exp_id
// @desc Delete experience from profile
// @access Private
router.delete("/experience/:exp_id", authMiddleware, deleteExperience);

// @route Put api/profile/education
// @desc Add profile education
// @access Private
router.put(
    "/education",
    authMiddleware,
    [
        check("school", "School is required").not().isEmpty(),
        check("degree", "Degree is required").not().isEmpty(),
        check("fieldofstudy", "Field of study is required").not().isEmpty(),
        check("from", "From date is required").not().isEmpty(),
    ],
    addEducation,
);

//@route Delete api/profile/education/:edu_id
// @desc Delete education from profile
// @access Private
router.delete("/education/:edu_id", authMiddleware, deleteEducation);

export default router;
