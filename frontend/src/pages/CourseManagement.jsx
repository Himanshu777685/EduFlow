import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    ArrowLeft,
    Edit3,
    Plus,
    MoreVertical,
    Users,
    BookOpen,
    IndianRupee,
    Clock3,
    PlayCircle,
    Trash2,
    Pencil,
} from "lucide-react";

import getCourseforEducator from "../customHooks/getCourseforEducator";
import { useEffect } from "react";
import axios from "axios";
import { serverURL } from "../App";

const CourseManagement = () => {

    const { courseId } = useParams();

    const navigate = useNavigate();

    const {
        course,
        loading,
        error,
    } = getCourseforEducator({ courseId });


    const [isPublished, setIsPublished] = useState(false)

    const [lectures, setLectures] = useState([]);

    useEffect(() => {

        const fetchLectures = async () => {
            try {
                const result = await axios.get(
                    `${serverURL}/api/lecture/educator/${courseId}/lectures`,
                    {
                        withCredentials: true
                    }
                );

                setLectures(result.data.lectures);

            } catch (error) {
                console.log("STATUS:", error.response?.status);
                console.log("DATA FROM BACKEND:", error.response?.data);
                console.log("MESSAGE:", error.response?.data?.message);
            }
        };

        if (courseId) {
            fetchLectures();
        }

    }, [courseId]);

    useEffect(() => {
        console.log("Course in component:", course);
        if (course) {
            setIsPublished(course.isPublished || false)
        }
    }, [course]);


    // ---------------- LOADING ----------------

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
                <p className="text-gray-500">
                    Loading course...
                </p>
            </div>
        );
    }


    // ---------------- ERROR ----------------

    if (error) {
        return (
            <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">

                <div className="text-center">

                    <p className="text-red-500 mb-4">
                        {error}
                    </p>

                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 rounded-lg bg-purple-600 text-white"
                    >
                        Go Back
                    </button>

                </div>

            </div>
        );
    }


    if (!course) {
        return (
            <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
                <p className="text-gray-500">
                    Course not found
                </p>
            </div>
        );
    }


    // ---------------- DATA ----------------

    const studentCount =
        course.enrolledStudent?.length || 0;

    const lessonCount =
        course.lectures?.length || 0;

    const revenue =
        (course.price || 0) * studentCount;



    const handlePublish = async () => {
        try {
            if (!isPublished) {
                await axios.put(`${serverURL}/api/course/publishCourse/${courseId}`,
                    {},
                    { withCredentials: true }
                )


                setIsPublished(true);
            } else {
                await axios.put(`${serverURL}/api/course/unPublishCourse/${courseId}`,
                    {},
                    { withCredentials: true }
                )

                setIsPublished(false)
            }
        } catch (error) {

        }
    }

    return (

        <div className="min-h-screen bg-[#f8fafc]">

            <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">


                {/* BACK BUTTON */}

                <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-5 transition"
                >
                    <ArrowLeft size={18} />

                    <span className="text-sm font-medium">
                        Back to Dashboard
                    </span>
                </button>


                {/* HEADER */}

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

                    <div>

                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {course.title}
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage your course content and lessons
                        </p>

                    </div>


                    <div className="flex items-center gap-3">


                        <button
                            onClick={handlePublish}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition cursor-pointer font-medium ${isPublished
                                ? "border-red-200 text-red-600 bg-white hover:bg-red-50"
                                : "border-green-200 text-green-600 bg-white hover:bg-green-50"
                                }`}
                        >
                            <Edit3 size={17} />

                            {isPublished ? "Unpublish" : "Publish"}
                        </button>


                        <button
                            onClick={() =>
                                navigate(
                                    `/edit-course/${courseId}`
                                )
                            }
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-purple-200 text-purple-600 bg-white hover:bg-purple-50 transition font-medium"
                        >
                            <Edit3 size={17} />

                            Edit Course
                        </button>



                        <button
                            onClick={() =>
                                navigate(`/courseforeducator/${courseId}/create-lecture`)
                            }
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition font-medium"
                        >
                            <Plus size={18} />

                            Add Lesson
                        </button>

                    </div>

                </div>


                {/* COURSE OVERVIEW */}

                <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-6">

                    <div className="grid grid-cols-1 lg:grid-cols-5">


                        {/* THUMBNAIL */}

                        <div className="lg:col-span-2">

                            <div className="h-full min-h-[250px] bg-gray-100">

                                {course.thumbnail ? (

                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />

                                ) : (

                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        No Thumbnail
                                    </div>

                                )}

                            </div>

                        </div>


                        {/* COURSE INFORMATION */}

                        <div className="lg:col-span-3 p-6 sm:p-8">

                            <div className="flex items-center justify-between mb-3">

                                <span className={`px-3 py-1 rounded-full ${isPublished ? "bg-green-50" : "bg-red-50"} ${isPublished ? "text-green-600" : "text-red-600"} text-xs font-semibold`}>
                                    {isPublished ? "Published" : "Unpublished"}
                                </span>

                                <span className="text-lg font-bold text-gray-900">
                                    ₹{course.price || 0}
                                </span>

                            </div>


                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                {course.title}
                            </h2>


                            <p className="text-gray-500 text-sm mb-5">
                                {course.subTitle}
                            </p>


                            <div>

                                <h3 className="font-semibold text-gray-900 mb-2">
                                    About this course
                                </h3>

                                <p className="text-sm leading-6 text-gray-600">
                                    {course.description}
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* STATISTICS */}

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">

                    <StatCard
                        icon={<Users size={20} />}
                        title="Students"
                        value={studentCount}
                        iconClass="bg-blue-50 text-blue-600"
                    />

                    <StatCard
                        icon={<BookOpen size={20} />}
                        title="Lessons"
                        value={lessonCount}
                        iconClass="bg-purple-50 text-purple-600"
                    />

                    <StatCard
                        icon={<IndianRupee size={20} />}
                        title="Revenue"
                        value={`₹${revenue}`}
                        iconClass="bg-yellow-50 text-yellow-600"
                    />

                </section>


                {/* LESSONS */}

                <section className="bg-white border border-gray-200 rounded-2xl">


                    {/* LESSON HEADER */}

                    <div className="px-5 sm:px-6 py-5 border-b border-gray-100 flex items-center justify-between">

                        <div>

                            <h2 className="text-lg font-semibold text-gray-900">
                                Course Lessons
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Manage the content students will learn
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                navigate(`/courseforeducator/${courseId}/create-lecture`)
                            }
                            className="hidden sm:flex items-center gap-2 text-purple-600 font-medium hover:text-purple-700"
                        >
                            <Plus size={18} />

                            Add Lesson
                        </button>

                    </div>


                    {/* LESSON LIST */}

                    <div className="p-4 sm:p-6">

                        {lessonCount === 0 ? (

                            <div className="py-12 text-center">

                                <div className="w-14 h-14 mx-auto rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                                    <BookOpen size={25} />
                                </div>


                                <h3 className="font-semibold text-gray-900">
                                    No lessons yet
                                </h3>


                                <p className="text-sm text-gray-500 mt-1 mb-5">
                                    Start building your course by adding your first lesson.
                                </p>


                                <button
                                    onClick={() =>
                                        navigate(`/courseforeducator/${courseId}/create-lecture`)
                                    }
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition cursor-pointer"
                                >
                                    <Plus size={18} />

                                    Add First Lesson
                                </button>

                            </div>

                        ) : (

                            <div className="space-y-3">

                                {console.log(lectures)}


                                {course.lectures.map((lectureId, index) => {

                                    const lecture = lectures.find(
                                        (lecture) => lecture._id === lectureId
                                    );

                                    console.log(lecture)
                                    console.log(lecture?.title)

                                    return (
                                        <LessonCard
                                            key={lectureId}
                                            lecture={lecture}
                                            lectureId={lectureId}
                                            index={index}
                                            courseId={courseId}
                                            lectureTitle={lecture?.title}
                                        />
                                    );
                                })}

                            </div>

                        )}

                    </div>

                </section>

            </main>

        </div>
    );
};


/* ============================= */
/* STAT CARD */
/* ============================= */

const StatCard = ({
    icon,
    title,
    value,
    iconClass,
}) => {

    return (

        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">

            <div
                className={`w-11 h-11 rounded-lg flex items-center justify-center ${iconClass}`}
            >
                {icon}
            </div>


            <div>

                <p className="text-sm text-gray-500">
                    {title}
                </p>

                <p className="text-xl font-bold text-gray-900 mt-1">
                    {value}
                </p>

            </div>

        </div>

    );
};


/* ============================= */
/* LESSON CARD */
/* ============================= */

const LessonCard = ({
    lectureId,
    lecture,
    index,
    courseId,
    lectureTitle
}) => {

    const navigate = useNavigate();

    return (

        <div className="group border border-gray-200 rounded-xl p-4 hover:border-purple-200 hover:shadow-sm transition">

            <div className="flex items-center gap-4">


                {/* NUMBER */}

                <div className="w-10 h-10 shrink-0 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-semibold">

                    {String(index + 1).padStart(2, "0")}

                </div>


                {/* ICON */}

                <div className="hidden sm:flex w-10 h-10 rounded-lg bg-gray-100 items-center justify-center text-gray-500">

                    <PlayCircle size={20} />

                </div>


                {/* CONTENT */}

                <div className="flex-1 min-w-0">

                    <h3 className="font-semibold text-gray-900 truncate">

                        {lectureTitle ||
                            `Lesson ${index + 1}`}

                    </h3>


                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">

                        {/* {lesson.duration && (

                            <span className="flex items-center gap-1">

                                <Clock3 size={13} />

                                {lesson.duration}

                            </span>

                        )} */}


                        {lecture?.isPublished && (

                            <span className="text-green-600">
                                Published
                            </span>

                        )}

                    </div>

                </div>


                {/* ACTIONS */}

                <div className="flex items-center gap-1">

                    <button
                        onClick={() =>
                            navigate(
                                `/courseforeducator/${courseId}/editLecture/${lectureId}`
                            )
                        }
                        className="p-2 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition"
                    >
                        <Pencil size={17} />
                    </button>


                    <button
                        className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                    >
                        <Trash2 size={17} />
                    </button>


                    <button
                        className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition"
                    >
                        <MoreVertical size={18} />
                    </button>

                </div>

            </div>

        </div>

    );
};


export default CourseManagement