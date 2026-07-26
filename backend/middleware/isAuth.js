import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {

    try {
        const { token } = req.cookies;
        console.log(req.cookies)
        console.log(req.cookies.token)

        if (!token) {
            console.log("no token")
            return res.status(400).json({
                success: false,
                message: "user not registered"
            })
        }

        const verifyToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded:", verifyToken);

        if (!verifyToken) {
            console.log("no verify token")
            return res.status(400).json({
                success: false,
                message: "user not registered"
            })
        }

        req.userId = verifyToken.userId;
        next();

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message : error.message
        })
    }
}

export default isAuth;