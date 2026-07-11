import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },

    description : {
        type: String,

    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["student", "educator"],
      default: "student",
      required : true,
    },

    avatar: {
      type: String,
      default: "",
    },

    enrolledCourses : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : "Course"
    }]
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;