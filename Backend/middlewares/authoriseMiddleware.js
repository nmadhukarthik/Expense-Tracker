import jwt from "jsonwebtoken";
import User from "../models/Users.js";

const protect = async (req, res, next) => {
    console.log(req.headers);
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Not authorised, no token" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedToken.id).select("-password");
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ message: "Not authorised, token failed" });
    }
};

export default protect;
