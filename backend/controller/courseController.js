import uploadOnCloudinary from "../config/cloudinary.js";
import Course from "../models/courseModel.js";
import User from "../models/userModel.js";

export const CreateCourse = async (req, res) => {
    try {
        const creator_id = req.userId;
        const { title, category, description, subTitle, level, price } = req.body;

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
            price,
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
        const course = await Course.find({ isPublished: true }).populate("creator", "name email avatar")

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
        const userId = req.userId;

        const { title, subTitle, description, category, level, price } = req.body;

        let course = await Course.findById(courseId);

        if (!course) {
            return res.status(400).json({
                message: "course not found"
            })
        }

        if (course.creator.toString() !== userId.toString()) {

            return res.status(403).json({
                success: false,
                message: "You are not authorized"
            });

        }

        const updatedData = { title, subTitle, description, category, level, price }

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

        if (course.creator.toString() !== req.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized"
            });
        }

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
        console.log(course);
        if (!course) {
            return res.status(400).json({
                message: "course not found"
            })
        }

        if (course.creator.toString() !== req.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized"
            });
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

        console.log(course);

        if (!course) {
            return res.status(400).json({
                message: "course not found"
            })
        }

        if (course.creator.toString() !== req.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized"
            });
        }

        course = await Course.findByIdAndUpdate(courseId, { isPublished: false }, { new: true })

        return res.status(200).json(course);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `UnPublish course error ${error}`
        })
    }
}


export const getCourseByIdForCreator = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.userId;

        // Check user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Only educator can access
        if (user.role !== "educator") {
            return res.status(403).json({
                success: false,
                message: "Only educators are allowed"
            });
        }

        // Find course
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // Check course ownership
        if (course.creator.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this course"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course fetched successfully",
            course
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Get course error: ${error.message}`
        });
    }
};



export const freeCourseEnrollment = async (req, res) => {
    try {

        const { courseId } = req.params;
        const userId = req.userId;
        
        const course = await Course.findById(courseId);

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course not found"
            });
        }



        if (course.price && course.price > 0) {
            return res.status(400).json({
                success: false,
                message: "This is a paid course"
            });
        }

        if (!course.enrolledStudent.includes(req.userId)) {

            course.enrolledStudent.push(req.userId);

            await course.save();
        }





        if (!user.enrolledCourses.includes(courseId)) {
            user.enrolledCourses.push(courseId);
            await user.save();
        }

        return res.status(200).json({
            success: true,
            message: "enrolled successfully",
            course,
            user
        })

    } catch (error) {
        console.log("enroll free course error :", error);

        return res.status(500).json({
            success: false,
            message: `Enroll free course error: ${error.message}`
        });
    }
}



export const getMyCourses = async (req, res) => {
    try {

        const studentId = req.userId;

        const student = await User.findById(studentId)
            .populate({
                path: "enrolledCourses",
                populate: {
                    path: "lectures"
                }
            });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        const courses = student.enrolledCourses.map(course => {

            const courseProgress = student.progress.find(
                item =>
                    item.course.toString() === course._id.toString()
            );

            return {
                ...course.toObject(),

                completedLectures:
                    courseProgress?.completedLectures || []
            };
        });

        return res.status(200).json({
            success: true,
            courses
        });

    } catch (error) {

        console.log("Get my courses error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch my courses"
        });
    }
};