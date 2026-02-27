import Profile from "../models/Profile.js";
import User from "../models/User.js";
import { validationResult } from "express-validator";
import axios from "axios";
import config from "config";

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
        x,
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
    if (x) profileFields.social.x = x;
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

export async function addEducation(req, res) {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    const { school, degree, fieldofstudy, from, to, current, description } =
        req.body;
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);
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

export async function deleteEducation(req, res) {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const removeIndex = profile.education
            .map((item) => item.id)
            .indexOf(req.params.edu_id);
        if (removeIndex === -1) {
            return res.status(400).json({
                success: false,
                errors: [{ msg: "Education not found" }],
            });
        }
        profile.education.splice(removeIndex, 1);
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


export async function getGithubRepos(req, res) {
    try {
        const username = req.params.username;
        const perPage = 5;
        const sort = "created:asc";

        const response = await axios.get(
            `https://api.github.com/users/${username}/repos`,
            {
                params: {
                    per_page: perPage,
                    sort: sort,
                    client_id: config.get("githubClientId"),
                    client_secret: config.get("githubSecret"),
                },
                headers: { "User-Agent": "node.js" },
            },
        );

        return res.json({ success: true, data: response.data });
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({
                success: false,
                errors: [{ msg: "No Github profile found" }],
            });
        }

        console.error(error.message);
        return res.status(500).json({
            success: false,
            errors: [{ msg: "Server Error" }],
        });
    }
}
