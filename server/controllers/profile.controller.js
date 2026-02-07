import Profile from "../models/Profile.js";

export async function getProfile(req, res) {
    try {
        const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar'])
        if(!profile){
            return res.status(400).json({
                success: false,
                errors: [{ msg: "There is no profile for this user" }],
            });
        }
        return res.json({success: true,
            data: profile
        })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            errors: [{ msg: "Server Error" }],
        });
    }
}