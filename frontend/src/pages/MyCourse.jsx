import React, { useEffect, useState } from "react";
import {
    BookOpen,
    Clock,
    PlayCircle,
    ArrowRight,
    ArrowLeft,
    CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../App";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const MyCourse = () => {

    const navigate = useNavigate();

    const user = useSelector((state) => state.user.userData);

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchMyCourses = async () => {

            try {

                setLoading(true);

                const result = await axios.get(
                    `${serverURL}/api/course/myCourses`,
                    {
                        withCredentials: true
                    }
                );

                if (result.data.success) {
                    setCourses(result.data.courses);
                }

            } catch (error) {

                console.log(
                    "Error fetching my courses:",
                    error.response?.data?.message || error.message
                );

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load your courses"
                );

            } finally {

                setLoading(false);

            }
        };

        if (user) {
            fetchMyCourses();
        }

    }, [user]);


    const getProgress = (course) => {

        const totalLectures = course.lectures?.length || 0;

        const completedLectures =
            course.completedLectures?.length || 0;

        if (totalLectures === 0) {
            return 0;
        }

        return Math.round(
            (completedLectures / totalLectures) * 100
        );
    };


    const handleOpenCourse = (courseId) => {
        navigate(`/course/${courseId}`);
    };


    // ---------------- LOADING ----------------

    if (loading) {

        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">

                <p className="text-gray-500">
                    Loading your courses...
                </p>

            </div>
        );

    }


    return (

        <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">

            <div className="max-w-6xl mx-auto">

                {/* BACK BUTTON */}

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition"
                >
                    <ArrowLeft size={18} />

                    <span className="text-sm font-medium">
                        Back
                    </span>
                </button>


                {/* HEADER */}

                <div className="mb-8">

                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        My Courses
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Continue learning from where you left off.
                    </p>

                </div>


                {/* EMPTY */}

                {courses.length === 0 ? (

                    <div className="bg-white border border-gray-200 rounded-2xl py-16 text-center">

                        <BookOpen
                            size={45}
                            className="mx-auto text-gray-300 mb-4"
                        />

                        <h2 className="text-lg font-semibold text-gray-700">
                            No courses yet
                        </h2>

                        <p className="text-sm text-gray-400 mt-2 mb-6">
                            Start learning by enrolling in a course.
                        </p>

                        <button
                            onClick={() => navigate("/courses")}
                            className="px-5 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                        >
                            Browse Courses
                        </button>

                    </div>

                ) : (

                    /* COURSE GRID */

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {courses.map((course) => {

                            const progress = getProgress(course);

                            const totalLectures =
                                course.lectures?.length || 0;

                            const completedLectures =
                                course.completedLectures?.length || 0;

                            const isCompleted =
                                totalLectures > 0 &&
                                completedLectures === totalLectures;


                            return (

                                <div
                                    key={course._id}
                                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
                                >

                                    {/* THUMBNAIL */}

                                    <div className="h-48 bg-gray-100">

                                        {course.thumbnail ? (

                                            <img
                                                src={course.thumbnail}
                                                alt={course.title}
                                                className="w-full h-full object-cover"
                                            />

                                        ) : (

                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <BookOpen size={40} />
                                            </div>

                                        )}

                                    </div>


                                    {/* CONTENT */}

                                    <div className="p-5">

                                        <h2 className="font-bold text-lg text-gray-900 truncate">
                                            {course.title}
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1 line-clamp-2 min-h-10">
                                            {course.subTitle}
                                        </p>


                                        {/* STATS */}

                                        <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">

                                            <div className="flex items-center gap-1.5">
                                                <BookOpen size={15} />
                                                <span>
                                                    {totalLectures} Lectures
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <Clock size={15} />
                                                <span>
                                                    Self paced
                                                </span>
                                            </div>

                                        </div>


                                        {/* PROGRESS */}

                                        <div className="mt-5">

                                            <div className="flex items-center justify-between mb-2">

                                                <span className="text-xs font-medium text-gray-600">
                                                    Progress
                                                </span>

                                                <span className="text-xs font-semibold text-gray-900">
                                                    {progress}%
                                                </span>

                                            </div>


                                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">

                                                <div
                                                    className="h-full bg-green-500 rounded-full transition-all duration-300"
                                                    style={{
                                                        width: `${progress}%`
                                                    }}
                                                />

                                            </div>


                                            <p className="text-xs text-gray-400 mt-2">
                                                {completedLectures} of{" "}
                                                {totalLectures} lectures completed
                                            </p>

                                        </div>


                                        {/* STATUS */}

                                        {isCompleted && (

                                            <div className="flex items-center gap-2 mt-4 text-xs font-medium text-green-600 bg-green-50 px-3 py-2 rounded-lg">

                                                <CheckCircle size={15} />

                                                Course Completed

                                            </div>

                                        )}


                                        {/* BUTTON */}

                                        <button
                                            onClick={() =>
                                                handleOpenCourse(course._id)
                                            }
                                            className="w-full mt-5 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition"
                                        >

                                            <PlayCircle size={17} />

                                            {progress === 0
                                                ? "Start Learning"
                                                : isCompleted
                                                    ? "View Course"
                                                    : "Continue Learning"
                                            }

                                            <ArrowRight size={16} />

                                        </button>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}

            </div>

        </div>
    );
};

export default MyCourse;