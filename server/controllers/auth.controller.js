import User from "../models/User.js";

async function getUser(req,res) {
    try {
        const user = await User.findById(req.user.id).select('-password')
        return res.json({user})
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            success:false,
            msg:"Server error.",
            error:error.message
        })
    }
    
} 

export default getUser;