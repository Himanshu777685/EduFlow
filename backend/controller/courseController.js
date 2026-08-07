import uploadOnCloudinary from "../config/cloudinary";
import Course from "../models/courseModel.js";
import User from "../models/userModel.js";

export const CreateCourse = async (req, res) => {
    try {
        const creator_id = req.userId;
        const { title, category, description, subTitle, level } = req.body;

        const user = await User.findById(creator_id).select("-password");

        if (user.role != "educator") {
            return res.status(403).json({ success: false, message: "Students are not allowed to create courses" });
        }

        if (!title || !category) {
            return res.status(400).json({ success: false, message: "Title and category are required" });
        }

        let thumbnail;

        if (req.file) {
            thumbnail = await uploadOnCloudinary(req.file.path);
        }

        const course = await Course.create({
            title,
            category,
            description,
            subTitle,
            thumbnail,
            level,
            creator: creator_id
        })

        return res.status(201).json({
            success: true, message: "Course Created successfully",
            course
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Create course error ${error}`
        })
    }
}

export const getPublishedCourse = async (req, res) => {
    try {
        const course = await Course.find({ isPublished: true })

        if (course.length == 0) {
            return res.status(400).json({
                messsage: "Courses not found"
            })
        }

        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Get pulish course error ${error}`
        })
    }
}

export const getCreatorCourse = async (req, res) => {

    try {
        const userId = req.userId;
        const course = await Course.find({ creator: userId });

        if (course.length == 0) {
            return res.status(400).json({
                messsage: "Courses not found"
            })
        }

        return res.status(200).json(course);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Get creator course error ${error}`
        })
    }
}

export const editCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const { title, subTitle, description, category, level } = req.body;

        let course = await Course.findById(courseId);

        if (!course) {
            return res.status(400).json({
                message: "course not found"
            })
        }

        const updatedData = { title, subTitle, description, category, level }

        if (req.file) {
            const thumbnail = await uploadOnCloudinary(req.file.path);
            updatedData.thumbnail = thumbnail;
        }

        course = await Course.findByIdAndUpdate(courseId, updatedData, { new: true });

        return res.status(200).json({ course });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Edit course error ${error}`
        })
    }
}


export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(400).json({
                message: "course not found"
            })
        }
        return res.status(200).json({ course });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `get course error ${error}`
        })
    }
}

export const removeCourse = async (req, res) => {

    try {
        const { courseId } = req.params;

        let course = await Course.findById(courseId);

        if (!course) {
            return res.status(400).json({
                message: "course not found"
            })
        }

        course = await Course.findByIdAndDelete(courseId);

        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Delete course error ${error}`
        })
    }
}

export const publishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({
                message: "course not found"
            })
        }
        course = await Course.findByIdAndUpdate(courseId, { isPublished: true }, { new: true })

        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Publish course error ${error}`
        })
    }
}

export const UnPublishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({
                message: "course not found"
            })
        }
        course = await Course.findByIdAndUpdate(courseId, { isPublished: false}, { new: true })

        return res.status(200).json(course);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `UnPublish course error ${error}`
        })
    }
}