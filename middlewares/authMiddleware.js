import User from "../models/userModel.js";
import jwt from "jsonwebtoken";


const authenticateToken = async (req, res, next) => {

try {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({
            succeded: false,
            error: "No token available"
        })
    }
    req.user = await User.findById(
        jwt.verify(token, process.env.JWT_SECRET).userId);
    next();
    
} catch (error) {

    res.status(401).json({
        succeded: false,
        error: "Not authorized!"
    })
    
}


}

export { authenticateToken }