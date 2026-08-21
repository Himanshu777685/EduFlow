import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../config/generatToken.js";
import validator from "validator"
import crypto from "crypto"
import sendMail from "../config/sendMail.js";

export const signup = async (req, res) => {

    console.log("signup api called");
    try {


        const { name, email, password, role } = req.body;

        // Validate input

        // Check if all fields are provided
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email."
            });
        }

        // Validate password
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long."
            });
        }

        // Check if user already exists

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists."
            });
        }

        // Hash password

        const hashedPass = await bcrypt.hash(password, 10);

        // Create user

        const user = await User.create({
            name,
            email,
            password: hashedPass,
            role
        })

        // Generate JWT

        const token = generateToken(user._id);

        // Set cookie

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })


        // Send response

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Signup error ${error}`
        });
    }
};

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Validate input

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "fields are required"
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "email not valid"
            })
        }

        // Find user

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }


        // Compare password

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password.",
            });
        }

        // Generate JWT

        const token = generateToken(user._id);

        // Set cookie

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // Send response

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                enrolledCourses: user.enrolledCourses,
            },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Error in login ${error}`,
        });
    }
};

export const logout = async (req, res) => {
    try {

        res.cookie("token", "", {
            expires: new Date(0),
            httpOnly: true,
            secure: true,
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Error in log out ${error}`,
        });
    }
};

export const forget_password = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Fields are required",
                success: false
            })
        }

        const user = await User.findOne({ email }).select("-password")

        if (!user) {
            return res.status(200).json({
                success: true,
                message: "If an account with that email exists, a password reset link has been sent.",
            })
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

        await user.save();

        const resetUrl = `https://edu-flow-five-murex.vercel.app/reset-password/${resetToken}`;

        try {
            await sendMail(email, resetUrl);

        } catch (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();

            return res.status(500).json({
                success: false,
                message: "Failed to send email."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Password reset link sent successfully."
        });


    } catch (error) {
        res.status(400).json({
            message: "error in forgot password",
            success: false
        })
    }
}

export const reset_password = async (req, res) => {
    try {

        const { password } = req.body;
        const { token } = req.params;

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // Find user with matching token that hasn't expired
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Reset link is invalid or has expired."
            });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        user.password = hashedPass;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully."
        });



    } catch (error) {
        console.log("resetPassword " + error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }
}

export const googleAuth = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                role
            })
        }

        // Generate JWT

        const token = generateToken(user._id);

        // Set cookie

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Error in goggleAuth error :  ${error}`,
        });
    }
}