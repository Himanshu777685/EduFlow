import React, { useEffect, useState } from 'react'
import { ArrowLeft, BookOpen, Clock, PlayCircle, Lock } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { serverURL } from '../App'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const StudentCourse = () => {

    const { courseId } = useParams()
    const navigate = useNavigate()

    const user = useSelector((state) => state.user.userData)
    console.log("USER FROM REDUX:", user);

    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [lectures, setLectures] = useState([]);

    const [completedLectures, setCompletedLectures] = useState([]);
    const [completingLecture, setCompletingLecture] = useState(null);

    const isFree = !course?.price || course?.price === 0;
    const isEnrolled = course?.enrolledStudent?.includes(user?.user?._id);


    useEffect(() => {

        const getCourse = async () => {

            try {

                setLoading(true)

                const result = await axios.get(
                    `${serverURL}/api/course/getCourse/${courseId}`
                )

                console.log("course: ", result.data.course)

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

    useEffect(() => {

        const fetchProgress = async () => {
            try {

                const result = await axios.get(
                    `${serverURL}/api/lecture/progress/${courseId}`,
                    {
                        withCredentials: true
                    }
                );

                if (result.data.success) {
                    setCompletedLectures(
                        result.data.completedLectures
                    );
                }

            } catch (error) {

                console.log(
                    "Error fetching course progress:",
                    error.response?.data?.message || error.message
                );

            }
        };

        if (courseId && isEnrolled) {
            fetchProgress();
        }

    }, [courseId, isEnrolled]);


    const handleCompleteLecture = async (lectureId) => {

        try {

            setCompletingLecture(lectureId);

            const result = await axios.post(
                `${serverURL}/api/lecture/completeLecture/${lectureId}`,
                {},
                {
                    withCredentials: true
                }
            );

            if (result.data.success) {

                setCompletedLectures(prev => {

                    if (prev.includes(lectureId)) {
                        return prev;
                    }

                    return [...prev, lectureId];
                });

                toast.success("Lecture completed");
            }

        } catch (error) {

            console.log(
                "Error completing lecture:",
                error.response?.data?.message || error.message
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to mark lecture as completed"
            );

        } finally {

            setCompletingLecture(null);
        }
    };

    const isLectureCompleted = (lectureId) => {
        return completedLectures.some(
            id => id.toString() === lectureId.toString()
        );
    };


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





    const handlePayment = async () => {
        try {
            setLoading(true);

            // Create Razorpay order
            const result = await axios.post(
                `${serverURL}/api/payment/create-order/${courseId}`,
                {},
                {
                    withCredentials: true
                }
            );

            console.log("Order:", result.data);

            const { order } = result.data;

            // Razorpay checkout options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,

                amount: order.amount,
                currency: order.currency,

                name: "EduFlow",
                description: course.title,

                order_id: order.id,

                handler: async function (response) {

                    try {

                        const verifyResult = await axios.post(
                            `${serverURL}/api/payment/verify-payment`,
                            {
                                razorpay_order_id:
                                    response.razorpay_order_id,

                                razorpay_payment_id:
                                    response.razorpay_payment_id,

                                razorpay_signature:
                                    response.razorpay_signature,

                                courseId: courseId
                            },
                            {
                                withCredentials: true
                            }
                        );

                        console.log(
                            "Payment verification:",
                            verifyResult.data
                        );

                        if (verifyResult.data.success) {

                            setCourse(verifyResult.data.course);
                            toast.success("Payment successful!");

                            // Later we can update enrollment state
                            // and redirect to the course/lecture page.

                        }

                    } catch (error) {

                        console.log(
                            "Payment verification error:",
                            error
                        );

                        toast.error("Payment verification failed");

                    }
                },

                prefill: {
                    name: "",
                    email: ""
                },

                theme: {
                    color: "#000000"
                }
            };

            const razorpay = new window.Razorpay(options);

            razorpay.open();

        } catch (error) {

            console.log("Payment error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to start payment"
            );

        } finally {

            setLoading(false);

        }
    };

    const handleFreeEnrollment = async () => {
        try {
            setLoading(true);
            const result = await axios.put(`${serverURL}/api/course/${courseId}/freeCourseEnrollment`, {}, { withCredentials: true });

            console.log(result.data);

            if (result.data.success) {
                toast.success("Course enrolled successfully")
                setCourse(result.data.course)
            }

        } catch (error) {
            console.log(error);
            toast.error("Enrollment not done")
        } finally {
            setLoading(false);
        }
    }



    console.log("USER ID:", user?.user?._id);
    console.log("COURSE ENROLLED STUDENTS:", course?.enrolledStudent);
    console.log("IS ENROLLED:", isEnrolled);

    const handleOpenLecture = (lecture) => {
        try {
            console.log(lecture);

            const canAccess =
                lecture?.isPreviewFree ||
                isFree ||
                isEnrolled;

            if (canAccess) {
                navigate(
                    `/course/${course._id}/student-lecture/${lecture._id}`
                );
                return;
            }

            toast.error("Please enroll in this course to access this lecture.");

        } catch (error) {
            console.log(error);
        }
    };

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


                            <div className="flex items-center justify-between mt-4">

                                {isEnrolled ? (
                                    <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                                        ✓ Enrolled
                                    </span>
                                ) : (
                                    <span className="text-lg font-bold text-gray-900">
                                        {course.price === 0
                                            ? "Free"
                                            : `₹${course.price}`
                                        }
                                    </span>
                                )}


                            </div>

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
                            disabled={isEnrolled}
                            onClick={() => {

                                if (isFree) {
                                    handleFreeEnrollment();
                                } else {
                                    handlePayment();
                                }

                            }}

                            className={`px-6 py-3 rounded-lg ${isEnrolled
                                ? "bg-blue-600 w-full sm:w-fit py-3 px-7 text-white cursor-not-allowed"
                                : "w-full sm:w-fit px-7 py-3 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition"
                                }`}
                        >
                            {isFree
                                ? isEnrolled
                                    ? "✓ Enrolled"
                                    : "Start Learning"
                                : isEnrolled
                                    ? "✓ Enrolled"
                                    : `Buy Course ₹${course?.price}`
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

                                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => handleOpenLecture(lecture)}>

                                    <h3 className="text-sm font-medium text-gray-900 truncate">
                                        {lecture.title}
                                    </h3>

                                    <p className="text-xs text-gray-400 mt-1">
                                        Lecture {index + 1}
                                    </p>

                                </div>

                                <div className='text-sm text-gray-400 flex justify-center items-center gap-2 '>
                                    <BookOpen size={18} className='text-gray-400' />
                                    {lecture.resources.length} document
                                </div>

                                {isLectureCompleted(lecture._id) ? (

                                    <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full whitespace-nowrap">
                                        ✓ Completed
                                    </span>

                                ) : (

                                    (isFree || lecture.isPreviewFree || isEnrolled) && (

                                        <button
                                            onClick={() => handleCompleteLecture(lecture._id)}
                                            disabled={completingLecture === lecture._id}
                                            className="text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full whitespace-nowrap transition disabled:opacity-50"
                                        >
                                            {completingLecture === lecture._id
                                                ? "Saving..."
                                                : "Mark Complete"
                                            }
                                        </button>

                                    )
                                )}

                                {/* ACCESS ICON */}

                                {(isFree || lecture.isPreviewFree || isEnrolled) ? (

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