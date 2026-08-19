import { razorpayInstance } from "../config/razorpay.js";
import Course from "../models/courseModel.js";
import crypto from "crypto";
import User from "../models/userModel.js";



export const RazorpayOrder = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course not found"
            })
        }

        if (course.price <= 0) {
            return res.status(400).json({
                success: false,
                message: "This course is free"
            });
        }

        const options = {
            amount: Math.round(course.price * 100),
            currency: "INR",
            receipt: `course_${courseId}_${Date.now()}`
        };

        const order = await razorpayInstance.orders.create(options);

        return res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        console.log("Create order error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create payment order"
        });
    }
}



export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            courseId
        } = req.body;

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature ||
            !courseId
        ) {
            return res.status(400).json({
                success: false,
                message: "Missing payment details"
            });
        }

        // Create the signature using Razorpay secret
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(
                razorpay_order_id + "|" + razorpay_payment_id
            )
            .digest("hex");

        // Compare signatures
        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });
        }

        //chechk payment status 
        const payment = await razorpayInstance.payments.fetch(
            razorpay_payment_id
        );

        if (payment.status !== "captured") {
            return res.status(400).json({
                success: false,
                message: "Payment was not successful"
            });
        }

        // Payment is genuine
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // Add student to enrolled students
        if (!course.enrolledStudent.includes(req.userId)) {

            course.enrolledStudent.push(req.userId);

            await course.save();
        }

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!user.enrolledCourses.includes(courseId)) {
            user.enrolledCourses.push(courseId);
            await user.save();
        }



        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            course,
            user
        });

    } catch (error) {
        console.log("Payment verification error:", error);

        return res.status(500).json({
            success: false,
            message: "Payment verification failed"
        });
    }
};