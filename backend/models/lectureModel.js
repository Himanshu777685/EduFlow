import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        videoUrl: {
            type: String,
            required: true,
        },

        resoures: [{
            name: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: true,
            },
        }],

        order: {
            type: Number,
            default: 0
        },

        isPublished: {
            type: Boolean,
            default: false,
        },
        isPreviewFree: {
            type: Boolean,
            default: false
        },

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

const Lecture = mongoose.model("Lecture", lectureSchema);

export default Lecture;