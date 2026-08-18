// import React, { useEffect, useState } from "react";
// import { ArrowLeft, ArrowRight, FileText, Play } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { serverURL } from "../App";

// const StudentLecture = () => {
//     const { courseId, lectureId } = useParams();
//     const navigate = useNavigate();

//     const [lecture, setLecture] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchLecture = async () => {
//             try {
//                 const result = await axios.get(
//                     `${serverURL}/api/lecture/lecture/${lectureId}`,
//                     {
//                         withCredentials: true,
//                     }
//                 );

//                 console.log("student lecture", result.data)
//                 setLecture(result.data.lecture);

//             } catch (error) {
//                 console.log("Error fetching lecture:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchLecture();
//     }, [lectureId]);

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <p className="text-gray-500">Loading lecture...</p>
//             </div>
//         );
//     }

//     if (!lecture) {
//         return (
//             <div className="min-h-screen flex flex-col items-center justify-center gap-4">
//                 <p className="text-gray-500">Lecture not found.</p>

//                 <button
//                     onClick={() => navigate(`/course/${courseId}`)}
//                     className="px-4 py-2 bg-black text-white rounded-lg"
//                 >
//                     Back to Course
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">

//             {/* Header */}
//             <div className="bg-white border-b px-4 md:px-8 py-4">
//                 <div className="max-w-7xl mx-auto flex items-center gap-4">

//                     <button
//                         onClick={() => navigate(-1)}
//                         className="p-2 rounded-full hover:bg-gray-100"
//                     >
//                         <ArrowLeft size={22} />
//                     </button>

//                     <div>
//                         <h1 className="font-semibold text-lg">
//                             {lecture.title}
//                         </h1>

//                         <p className="text-sm text-gray-500">
//                             Lecture
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">

//                 {/* Video */}
//                 <div className="bg-black rounded-xl overflow-hidden aspect-video">
//                     {lecture.videoUrl ? (
//                         <video
//                             src={lecture.videoUrl}
//                             controls
//                             className="w-full h-full"
//                         />
//                     ) : (
//                         <div className="h-full flex items-center justify-center text-white">
//                             <div className="text-center">
//                                 <Play
//                                     size={45}
//                                     className="mx-auto mb-3"
//                                 />
//                                 <p>Video not available</p>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Lecture Information */}
//                 <div className="mt-6 bg-white rounded-xl p-5">

//                     <h2 className="text-2xl font-semibold">
//                         {lecture.title}
//                     </h2>

//                     {lecture.description && (
//                         <p className="mt-3 text-gray-600 leading-relaxed">
//                             {lecture.description}
//                         </p>
//                     )}

//                 </div>

//                 {/* Notes / Resources */}
//                 {lecture.resources && (
//                     <div className="mt-5 bg-white rounded-xl p-5">

//                         <div className="flex items-center gap-2 mb-3">
//                             <FileText size={20} />
//                             <h3 className="font-semibold">
//                                 Lecture Notes
//                             </h3>
//                         </div>

//                         <a
//                             href={lecture.notes}
//                             target="_blank"
//                             rel="noreferrer"
//                             className="text-blue-600 hover:underline"
//                         >
//                             View Notes
//                         </a>

//                     </div>
//                 )}

//                 {/* Navigation */}
//                 <div className="flex justify-between items-center mt-6">

//                     <button
//                         onClick={() => navigate(-1)}
//                         className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-100"
//                     >
//                         <ArrowLeft size={18} />
//                         Back to Course
//                     </button>

//                     <button
//                         className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
//                     >
//                         Next Lecture
//                         <ArrowRight size={18} />
//                     </button>

//                 </div>

//             </div>
//         </div>
//     );
// };

// export default StudentLecture;



import { ArrowLeft, Video, FileText , Lock} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../App";
import { useSelector } from "react-redux";

const StudentLecture = () => {
    const navigate = useNavigate();
    const { lectureId, courseId } = useParams();

    const userData = useSelector((state) => state.user.userData);
    const user = userData?.user;
    
    const [lecture, setLecture] = useState(null);
    const [lectures, setLectures] = useState([]);
    const [course, setCourse] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getCourse = async () => {
            try {
                const result = await axios.get(
                    `${serverURL}/api/course/getCourse/${courseId}`
                );

                console.log("Student lecture course:", result.data.course);

                setCourse(result.data.course);

            } catch (error) {
                console.log("Error fetching course:", error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load course"
                );
            } 
        };

        if (courseId) {
            getCourse();
        }
    }, [courseId]);


    // Get current lecture
    useEffect(() => {
        const getLecture = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await axios.get(
                    `${serverURL}/api/lecture/lecture/${lectureId}`,
                    { withCredentials: true }
                );

                console.log("Current lecture:", result.data.lecture);

                setLecture(result.data.lecture);

            } catch (error) {
                console.log("Error fetching lecture:", error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load lecture"
                );
            } finally {
                setLoading(false);
            }
        };

        if (lectureId) {
            getLecture();
        }
    }, [lectureId]);



    // Get all lectures of course
    useEffect(() => {
        const getLectures = async () => {
            try {
                const result = await axios.get(
                    `${serverURL}/api/lecture/${courseId}/lectures`,
                    { withCredentials: true }
                );

                console.log("Lectures:", result.data);

                setLectures(result.data.lectures);

            } catch (error) {
                console.log("Error fetching lectures:", error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load lectures"
                );
            }
        };

        if (courseId) {
            getLectures();
        }
    }, [courseId]);

    const isFree = !course?.price || course.price === 0;

    const isEnrolled = course?.enrolledStudent?.some(
        id => id.toString() === user?._id?.toString()
    );

    const canAccess =
        lecture?.isPreviewFree ||
        isFree ||
        isEnrolled;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">
                    Loading lecture...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col gap-4 items-center justify-center">
                <p className="text-red-500">
                    {error}
                </p>

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                    <ArrowLeft size={18} />
                    Go Back
                </button>
            </div>
        );
    }

    if (lecture && course && !canAccess) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">

                <div className="text-center">

                    <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                        <Lock size={28} className="text-gray-400" />
                    </div>

                    <h1 className="text-xl font-semibold text-gray-900 mt-5">
                        Lecture Locked
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Please enroll in this course to access this lecture.
                    </p>

                    <button
                        onClick={() => navigate(`/course/${courseId}`)}
                        className="mt-5 px-5 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                    >
                        Back to Course
                    </button>

                </div>

            </div>
        );
    }

    return (
        <div className="min-h-screen w-full p-3">

            {/* BACK TO COURSE */}
            <button
                onClick={() => navigate(`/course/${courseId}`)}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-5 p-5 transition"
            >
                <ArrowLeft size={18} />

                <span className="text-sm font-medium">
                    Back to Course Page
                </span>
            </button>


            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">

                {/* LEFT SIDE */}
                <div className="space-y-5">

                    {/* VIDEO */}
                    <div className="bg-black rounded-xl overflow-hidden aspect-video">

                        {lecture?.videoUrl ? (
                            <video
                                src={lecture.videoUrl}
                                controls
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white">
                                <div className="text-center">
                                    <Video
                                        size={40}
                                        className="mx-auto mb-3"
                                    />

                                    <p>
                                        Video not available
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>


                    {/* LECTURE INFO */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">

                        <h1 className="text-2xl font-bold text-gray-900">
                            {lecture?.title}
                        </h1>

                        {lecture?.description && (
                            <p className="text-gray-500 mt-3 leading-relaxed">
                                {lecture.description}
                            </p>
                        )}

                    </div>

                </div>


                {/* RIGHT SIDE */}
                <div className="space-y-5">

                    {/* COURSE LECTURES */}
                    <div className="bg-white border border-gray-200 rounded-xl">

                        <div className="p-5 border-b border-gray-200">

                            <h2 className="font-semibold text-gray-900">
                                Course Lectures
                            </h2>

                            <p className="text-xs text-gray-500 mt-1">
                                {lectures.length}{" "}
                                {lectures.length === 1
                                    ? "lecture"
                                    : "lectures"}
                            </p>

                        </div>


                        <div className="p-3 max-h-125 overflow-y-auto">

                            {lectures.length > 0 ? (

                                <div className="space-y-2">

                                    {lectures.map((item, index) => {

                                        const isActive =
                                            item._id === lectureId;

                                        return (
                                            <button
                                                key={item._id}
                                                onClick={() =>
                                                    navigate(
                                                        `/course/${courseId}/student-lecture/${item._id}`
                                                    )
                                                }
                                                className={`w-full text-left flex items-center gap-3 p-3 rounded-lg border transition
                                                ${isActive
                                                        ? "bg-blue-50 border-blue-300"
                                                        : "border-transparent hover:bg-gray-50 hover:border-gray-200"
                                                    }`}
                                            >

                                                {/* ICON */}
                                                <div
                                                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0
                                                    ${isActive
                                                            ? "bg-blue-100 text-blue-600"
                                                            : "bg-gray-100 text-gray-500"
                                                        }`}
                                                >
                                                    <Video size={18} />
                                                </div>


                                                {/* LECTURE INFO */}
                                                <div className="min-w-0 flex-1">

                                                    <p
                                                        className={`text-sm font-medium truncate
                                                        ${isActive
                                                                ? "text-blue-700"
                                                                : "text-gray-800"
                                                            }`}
                                                    >
                                                        {index + 1}.{" "}
                                                        {item.title}
                                                    </p>

                                                    {item.description && (
                                                        <p className="text-xs text-gray-500 truncate mt-1">
                                                            {item.description}
                                                        </p>
                                                    )}

                                                </div>

                                            </button>
                                        );
                                    })}

                                </div>

                            ) : (

                                <p className="text-sm text-gray-400 p-2">
                                    No lectures available.
                                </p>

                            )}

                        </div>

                    </div>


                    {/* RESOURCES */}
                    <div className="bg-white border border-gray-200 rounded-xl">

                        <div className="p-5 border-b border-gray-200">

                            <h2 className="font-semibold text-gray-900">
                                Resources
                            </h2>

                        </div>


                        <div className="p-4">

                            <div className="space-y-4">

                                {lecture?.resources?.length > 0 ? (

                                    lecture.resources.map(
                                        (resource, index) => (

                                            <a
                                                key={index}
                                                href={resource.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-3 rounded-lg border border-blue-200 hover:bg-blue-50 transition"
                                            >

                                                <FileText
                                                    size={20}
                                                    className="text-blue-500 shrink-0"
                                                />

                                                <span className="text-sm text-gray-700 truncate">
                                                    {resource.name ||
                                                        `Resource ${index + 1
                                                        }`}
                                                </span>

                                            </a>

                                        )
                                    )

                                ) : (

                                    <p className="text-sm text-gray-400">
                                        No resources available.
                                    </p>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default StudentLecture;