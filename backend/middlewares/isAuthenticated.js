import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }
        const decode = await jwt.verify(token, "abc"); // Replace "abc" with process.env.JWT_SECRET in production
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }
        req.user = { _id: decode.userId }; // Fix: Set req.user properly
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export default isAuthenticated;
