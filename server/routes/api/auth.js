import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { getUser, login } from "../../controllers/auth.controller.js";
import { check } from "express-validator";
import jwt from "jsonwebtoken";
import config from "config";

const router = express.Router();

//@route Get api/auth
//desc get user
//@access Private
router.get("/", authMiddleware, getUser);

//@route Post api/auth
//@desc Authenticate and get token
//@access Public
router.post(
    "/",
    [
        check("email", "Please include a valid email").isEmail(),
        check(
            "password",
            "password is required and should be at least 6 characters",
        ).exists(),
    ],
    login,
);

export default router;
