import Profile from "../models/Profile.js";
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
    const profileFields={}
    profileFields.user  = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(status) profileFields.status = status;
    if(bio) profileFields.bio = bio;
    if(githubusername) profileFields.githubusername = githubusername;   
    if(skills) {
        profileFields.skills = skills.split(",").map(skill => skill.trim());
    }

    //build social object
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;

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
        })
        
    }

}
