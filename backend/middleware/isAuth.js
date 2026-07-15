import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {

    try {
        const { token } = req.cookies;

        if (!token) {
            res.status(400).json({
                success: false,
                message: "user not registered"
            })
        }

        const verifyToken = await jwt.verify(token, process.env.JWT_SECRETE_KEY);

        if (!verifyToken) {
            res.status(400).json({
                success: false,
                message: "user not registered"
            })
        }

        req.userId = verifyToken.userId;
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message : "not authenticated"
        })
    }
}

export default isAuth;