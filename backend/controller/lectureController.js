import uploadOnCloudinary from "../config/cloudinary.js";
import Course from "../models/courseModel.js";
import Lecture from "../models/lectureModel.js";



export const createLecture = async (req, res) => {
    try {
        const { title, description, order, isPreviewFree } = req.body;
        const { courseId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(400).json({
                message: "No course found"
            })
        }

        if (course.creator.toString() !== req.userId.toString()) {

            return res.status(403).json({
                success: false,
                message: "You are not authorized to add a lecture to this course"
            });

        }

        if (!title) {
            return res.status(400).json({
                message: "title required"
            })
        }


        const videoFile = req.files?.video?.[0];
        const resourceFiles = req.files?.resources || [];

        if (!videoFile) {
            return res.status(400).json({
                success: false,
                message: "Lecture video is required"
            });
        }

        const videoUpload = await uploadOnCloudinary(
            videoFile.path, {
            resource_type: "raw"
        }

        );

        const resources = [];

        for (const file of resourceFiles) {
            const result = await uploadOnCloudinary(
                file.path,
            );

            resources.push({
                name: file.originalname,
                url: result,
                type: file.mimetype
            });
        }

        const lecture = await Lecture.create({
            title,

            description: description || "",

            videoUrl: videoUpload,

            order: order || 0,

            isPublished: false,

            isPreviewFree: isPreviewFree === "true",

            course: courseId,

            resources
        })

        course.lectures.push(lecture._id);

        await course.save();

        return res.status(201).json({
            success: true,
            message: "Lecture created successfully",
            lecture
        })

    } catch (error) {
        console.log("Create lecture error:", error);
        return res.status(500).json({
            success: false,
            message: `Create lecture error: ${error.message}`
        });
    }
};

export const getLectures = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);


        if (!course) {
            return res.status(400).json({
                success: false,
                message: "No valid course"
            })
        }

        // console.log("course.creator:", course.creator);

        // if (course.creator.toString() !== req.userId.toString()) {
        //     return res.status(403).json({
        //         success: false,
        //         message: "You are not authorized"
        //     });
        // }

        const lectures = await Lecture.find({ course: courseId }).sort({ order: 1 })

        

        return res.status(200).json({
            lectures
        })



    } catch (error) {
        console.log("Get lecture error:", error);
        return res.status(500).json({
            success: false,
            message: `Get lecture error: ${error.message}`
        });
    }
}


export const getLectureById = async (req, res) => {
    try {
        const { lectureId } = req.params;

        const lecture = await Lecture.findById(lectureId);

        if (!lecture) {
            return res.status(404).json({
                success: false,
                message: "Lecture not found"
            });
        }

        return res.status(200).json({
            success: true,
            lecture
        });

    } catch (error) {
        console.log("Get lecturebyId error:", error);
        return res.status(500).json({
            success: false,
            message: `Get lecturebyID error: ${error.message}`
        });
    }
}
//----------------------
// UPDATE  LECTURE
//----------------------

export const updateLecture = async (req, res) => {
    try {

        const { title, description, order, isPreviewFree } = req.body;
        const { lectureId } = req.params;

        // Find lecture
        let lecture = await Lecture.findById(lectureId);

        if (!lecture) {
            return res.status(404).json({
                success: false,
                message: "Lecture not found"
            });
        }

        // Title validation
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }


        // Find course
        const course = await Course.findById(lecture.course);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }


        // Check ownership
        if (course.creator.toString() !== req.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized"
            });
        }

        // Update basic information


        lecture.title = title;
        lecture.description = description || "";
        lecture.order = order || 0;
        lecture.isPreviewFree =
            isPreviewFree === "true" || isPreviewFree === true;



        // Replace video ONLY if provided


        const videoFile = req.files?.video?.[0];

        if (videoFile) {

            const videoUpload = await uploadOnCloudinary(
                videoFile.path
            );

            if (!videoUpload) {
                return res.status(500).json({
                    success: false,
                    message: "Video upload failed"
                });
            }

            lecture.videoUrl = videoUpload;
        }



        // Replace resources ONLY if provided


        const resourceFiles = req.files?.resources || [];

        console.log("RESOURCE FILES:", resourceFiles);

        if (resourceFiles.length > 0) {

            const resources = [];

            for (const file of resourceFiles) {

                const result = await uploadOnCloudinary(
                    file.path
                );

                console.log("upload file ", result);

                if (result) {
                    resources.push({
                        name: file.originalname,
                        url: result,
                        type: file.mimetype
                    });
                }
            }

            lecture.resources = resources;
        }

        // Save
        await lecture.save();


        return res.status(200).json({
            success: true,
            message: "Lecture updated successfully",
            lecture
        });

    } catch (error) {

        console.log("Update lecture error:", error);

        return res.status(500).json({
            success: false,
            message: `Update lecture error: ${error.message}`
        });
    }
};


export const deleteLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;

        // Find lecture
        const lecture = await Lecture.findById(lectureId);

        if (!lecture) {
            return res.status(404).json({
                success: false,
                message: "Lecture not found"
            });
        }

        // Find course
        const course = await Course.findById(lecture.course);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // Check creator
        if (course.creator.toString() !== req.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized"
            });
        }

        // Delete lecture
        await Lecture.findByIdAndDelete(lectureId);

        await Course.findByIdAndUpdate(
            course._id,
            {
                $pull: {
                    lectures: lectureId
                }
            }
        );

        return res.status(200).json({
            success: true,
            message: "Lecture deleted successfully"
        });

    } catch (error) {

        console.log("Delete lecture error:", error);

        return res.status(500).json({
            success: false,
            message: `Delete lecture error: ${error.message}`
        });
    }
};

//--------------------
// PUBLISH LECTURE
//--------------------

export const publishLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;

        const lecture = await Lecture.findById(lectureId);

        if (!lecture) {
            return res.status(404).json({
                success: false,
                message: "Lecture not found"
            });
        }

        const course = await Course.findById(lecture.course);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (course.creator.toString() !== req.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized"
            });
        }

        lecture.isPublished = true;

        await lecture.save();

        return res.status(200).json({
            success: true,
            message: "Lecture published successfully",
            lecture
        });

    } catch (error) {
        console.log("Publish lecture error:", error);

        return res.status(500).json({
            success: false,
            message: `Publish lecture error: ${error.message}`
        });
    }
};

//--------------------------
// UNPUBLISH LECTURE
//--------------------------


export const unpublishLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;

        const lecture = await Lecture.findById(lectureId);

        if (!lecture) {
            return res.status(404).json({
                success: false,
                message: "Lecture not found"
            });
        }

        const course = await Course.findById(lecture.course);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (course.creator.toString() !== req.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized"
            });
        }

        lecture.isPublished = false;

        await lecture.save();

        return res.status(200).json({
            success: true,
            message: "Lecture unpublished successfully",
            lecture
        });

    } catch (error) {
        console.log("Unpublish lecture error:", error);

        return res.status(500).json({
            success: false,
            message: `Unpublish lecture error: ${error.message}`
        });
    }
};

