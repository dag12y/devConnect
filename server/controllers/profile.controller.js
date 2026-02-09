import Profile from "../models/Profile.js";
import User from "../models/User.js";
import { validationResult } from "express-validator";

export async function getProfile(req, res) {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            "user",
            ["name", "avatar"],
        );
        if (!profile) {
            return res.status(400).json({
                success: false,
                errors: [{ msg: "There is no profile for this user" }],
            });
        }
        return res.json({ success: true, data: profile });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            errors: [{ msg: "Server Error" }],
        });
    }
}

export async function uploadProfile(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        githubusername,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram,
    } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    //build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            //update
            const updatedProfile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true },
            );
            return res.json({ success: true, data: updatedProfile });
        }
        //create
        const newProfile = new Profile(profileFields);
        await newProfile.save();
        return res.json({ success: true, data: newProfile });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            errors: [{ msg: "Server Error" }],
        });
    }
}

export async function getAllProfile(req, res) {
    try {
        const profiles = await Profile.find().populate("user", [
            "name",
            "avatar",
        ]);
        return res.json({ success: true, data: profiles });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            errors: [{ msg: "Server Error" }],
        });
    }
}

export async function getProfileByUserId(req, res) {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id,
        }).populate("user", ["name", "avatar"]);
        if (!profile) {
            return res.status(400).json({
                success: false,
                errors: [{ msg: "Profile not found" }],
            });
        }
        return res.json({ success: true, data: profile });
    } catch (error) {
        console.error(error.message);
        if (error.kind === "ObjectId") {
            return res.status(400).json({
                success: false,
                errors: [{ msg: "Profile not found" }],
            });
        }
        return res.status(500).json({
            success: false,
            errors: [{ msg: "Server Error" }],
        });
    }
}

export async function deleteProfile(req, res) {
    try {
        // remove profile
        await Profile.findOneAndDelete({ user: req.user.id });

        // remove user
        await User.findOneAndDelete({ _id: req.user.id });

        return res.json({ success: true, msg: "User deleted" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            errors: [{ msg: "Server Error" }],
        });
    }
}

export async function addExperience(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    const { title, company, location, from, to, current, description } =
        req.body;
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
        await profile.save();
        return res.json({ success: true, data: profile });
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            errors: [{ msg: "Server Error" }],
        });
        
    }
}

export async function deleteExperience(req, res) {
    try {
        const profile = await Profile.findOne({ user: req.user.id }); 
        const removeIndex = profile.experience
            .map((item) => item.id)
            .indexOf(req.params.exp_id);
        if (removeIndex === -1) {
            return res.status(400).json({
                success: false,
                errors: [{ msg: "Experience not found" }],
            });
        }
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        return res.json({ success: true, data: profile });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            errors: [{ msg: "Server Error" }],
        });
    }
};
