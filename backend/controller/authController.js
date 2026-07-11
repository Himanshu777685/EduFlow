import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../config/generatToken.js";
import validator from "validator"

export const signup = async (req, res) => {
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
            secure: false,
            sameSite: "Strict",
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
            secure: false,
            sameSite: "Strict",
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