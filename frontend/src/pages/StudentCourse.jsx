import React, { useEffect, useState } from 'react'
import { ArrowLeft, BookOpen, Clock, PlayCircle, Lock } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { serverURL } from '../App'

const StudentCourse = () => {

    const { courseId } = useParams()
    const navigate = useNavigate()

    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [lectures, setLectures] = useState([]);

    useEffect(() => {

        const getCourse = async () => {

            try {

                setLoading(true)

                const result = await axios.get(
                    `${serverURL}/api/course/getCourse/${courseId}`
                )

                console.log("course: ", result.data)

                setCourse(result.data.course)

            } catch (error) {

                console.log(error)

            } finally {

                setLoading(false)

            }
        }

        if (courseId) {
            getCourse()
        }

    }, [courseId])

    useEffect(() => {
        const fetchLectures = async () => {
            try {
                setLoading(true);

                const result = await axios.get(`${serverURL}/api/lecture/${courseId}/lectures`, { withCredentials: true });

                console.log("lectures", result.data.lectures);

                setLectures(result.data.lectures);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        if (courseId) {
            fetchLectures();
        }
    }, [courseId])


    // ---------------- LOADING ----------------

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">
                    Loading course...
                </p>
            </div>
        )
    }


    // ---------------- COURSE NOT FOUND ----------------

    if (!course) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">

                <p className="text-gray-500 mb-4">
                    Course not found
                </p>

                <button
                    onClick={() => navigate("/courses")}
                    className="text-blue-600 hover:underline"
                >
                    Back to Courses
                </button>

            </div>
        )
    }


    const isFree = !course.price || course.price === 0


    return (

        <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">

            {/* BACK BUTTON */}

            <button
                onClick={() => navigate("/courses")}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition"
            >
                <ArrowLeft size={18} />

                <span className="text-sm font-medium">
                    Back to Courses
                </span>
            </button>


            {/* COURSE HERO */}

            <section className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

                <div className="grid grid-cols-1 lg:grid-cols-5">


                    {/* THUMBNAIL */}

                    <div className="lg:col-span-2">

                        <div className="h-full min-h-72 bg-gray-100">

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

                    <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col justify-center">


                        {/* BADGE + PRICE */}

                        <div className="flex items-center justify-between mb-4">

                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold
                                ${isFree
                                        ? "bg-green-50 text-green-600"
                                        : "bg-blue-50 text-blue-600"
                                    }`}
                            >
                                {isFree ? "FREE COURSE" : "PAID COURSE"}
                            </span>


                            <span className="text-xl font-bold text-gray-900">

                                {isFree
                                    ? "Free"
                                    : `₹${course.price}`
                                }

                            </span>

                        </div>


                        {/* TITLE */}

                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">

                            {course.title}

                        </h1>


                        {/* SUBTITLE */}

                        <p className="text-gray-500 text-sm sm:text-base mb-6">

                            {course.subTitle}

                        </p>


                        {/* COURSE STATS */}

                        <div className="flex flex-wrap gap-5 text-sm text-gray-500 mb-6">

                            <div className="flex items-center gap-2">

                                <BookOpen size={17} />

                                <span>
                                    {course.lectures?.length || 0} Lectures
                                </span>

                            </div>


                            <div className="flex items-center gap-2">

                                <Clock size={17} />

                                <span>
                                    Self paced learning
                                </span>

                            </div>

                        </div>


                        {/* CTA */}

                        <button
                            onClick={() => {

                                if (isFree) {
                                    // later we will navigate to first lecture
                                    console.log("Start learning")

                                } else {
                                    // later payment logic
                                    console.log("Buy course")

                                }

                            }}
                            className="w-full sm:w-fit px-7 py-3 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition"
                        >

                            {isFree
                                ? "Start Learning"
                                : `Buy Course · ₹${course.price}`
                            }

                        </button>

                    </div>

                </div>

            </section>


            <section className='max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm mt-8 p-5'>
                <h1 className='font-bold text-xl text-gray-900 mb-2'>About this course </h1>
                <p className=' text-gray-600'>{course?.description}</p>
            </section>


            {/* COURSE CONTENT */}

            <section className="max-w-6xl mx-auto mt-8">

                <div className="mb-4">

                    <h2 className="text-xl font-bold text-gray-900">
                        Course Content
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {course.lectures?.length || 0} lectures
                    </p>

                </div>


                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

                    {lectures?.length > 0 ? (

                        lectures.map((lecture, index) => (

                            <div
                                key={lecture._id || index}
                                className="flex items-center gap-4 px-5 py-4 border-b last:border-b-0 border-gray-100"
                            >

                                {/* NUMBER */}

                                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">

                                    <span className="text-sm font-semibold text-gray-600">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                </div>


                                {/* LECTURE INFO */}

                                <div className="flex-1 min-w-0">

                                    <h3 className="text-sm font-medium text-gray-900 truncate">
                                        {lecture.title}
                                    </h3>

                                    <p className="text-xs text-gray-400 mt-1">
                                        Lecture {index + 1}
                                    </p>

                                </div>

                                <div className='text-sm text-gray-400 flex justify-center items-center gap-2 '>
                                    <BookOpen size={18} className='text-gray-400'/>
                                    {lecture.resources.length} document
                                </div>


                                {/* ACCESS ICON */}

                                {(isFree || lecture.isPreviewFree) ? (

                                    <PlayCircle
                                        size={19}
                                        className="text-green-600 shrink-0"
                                    />

                                ) : (

                                    <Lock
                                        size={17}
                                        className="text-gray-400 shrink-0"
                                    />

                                )}

                            </div>

                        ))

                    ) : (

                        <div className="py-12 text-center text-gray-400">
                            No lectures available yet.
                        </div>

                    )}

                </div>

            </section>

        </div>
    )
}

export default StudentCourse