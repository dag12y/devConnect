import jwt from "jsonwebtoken";
import config from "config";

export default function authMiddleware(req, res, next) {
    //get header
    const authHeader = req.header("Authorization");

    //check token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            errors: [{ msg: "No token, authorization denied" }],
        });
    }

    //extract token
    const token = authHeader.split(" ")[1];

    //verify token
    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            errors: [{ msg: "Invalid token" }],
        });
    }
}
