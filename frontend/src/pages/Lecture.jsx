import { ArrowLeft, Video } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { serverURL } from '../App'
import { FileText } from 'lucide-react'

const Lecture = () => {

    const navigate = useNavigate()
    let { lectureId, courseId } = useParams();

    const [lecture, setLecture] = useState(null);
    const [lectures, setLectures] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getLecture = async () => {
            try {

                setLoading(true);
                const result = await axios.get(`${serverURL}/api/lecture/lecture/${lectureId}`, { withCredentials: true })

                console.log("Current lecture:", result.data.lecture);

                setLecture(result.data.lecture);



            } catch (error) {
                console.log("Error fetching lecture:", error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load lecture"
                );
            } finally {
                setLoading(false)
            }

        }

        if (lectureId) {
            getLecture();
        }
    }, [lectureId])

    useEffect(() => {

        const getLectures = async () => {
            try {
                setLoading(true);

                console.log(courseId)

                const result = await axios.get(`${serverURL}/api/lecture/${courseId}/lectures`, { withCredentials: true })

                console.log("lectures: ", result.data)

                setLectures(result.data.lectures);

            } catch (error) {
                console.log("Error fetching lectures:", error);
                setError(
                    error.response?.data?.message ||
                    "Failed to load lectures"
                );
            } finally {
                setLoading(false);

            }
        }

        if (courseId) {
            getLectures();
        }
    }, [courseId])


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
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">
                    {error}
                </p>
            </div>
        );
    }

    return (


        <div className='min-h-screen w-full p-3 '>

            <button
                onClick={() => navigate(`/courseforeducator/${courseId}`)}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-5 p-5 transition "
            >
                <ArrowLeft size={18} />

                <span className="text-sm font-medium">
                    Back to Course Page
                </span>
            </button>


            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
                <div className="space-y-5">

                    {/* VIDEO */}
                    <div className="bg-black rounded-xl overflow-hidden aspect-video">
                        {/* video will come here */}
                        <video
                            src={lecture?.videoUrl}
                            controls
                            className="w-full h-full object-contain"
                        />
                    </div>


                    {/* LECTURE INFO */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">

                        <h1 className="text-2xl font-bold text-gray-900">
                            {lecture.title}
                        </h1>

                        <p className="text-gray-500 mt-3">
                            {lecture.description}
                        </p>

                    </div>

                </div>

                <div className='space-y-5'>

                    {/* COURSE LECTURES */}
                    <div className="bg-white border border-gray-200 rounded-xl">

                        <div className="p-5 border-b border-gray-200">

                            <h2 className="font-semibold text-gray-900">
                                Course Lectures
                            </h2>

                            <p className="text-xs text-gray-500 mt-1">
                                {lectures.length} {lectures.length === 1 ? "lecture" : "lectures"}
                            </p>

                        </div>

                        <div className="p-3 max-h-125 overflow-y-auto">

                            {lectures.length > 0 ? (

                                <div className="space-y-2">

                                    {lectures.map((item, index) => {

                                        const isActive = item._id === lectureId;

                                        return (
                                            <button
                                                key={item._id}
                                                onClick={() =>{
                                                    lectureId = item._id;
                                                    navigate(`/course/${courseId}/lecture/${lectureId}`)}
                                                }
                                                className={`w-full text-left flex items-center gap-3 p-3 rounded-lg border transition
                                    ${isActive
                                                        ? "bg-blue-50 border-blue-300"
                                                        : "border-transparent hover:bg-gray-50 hover:border-gray-200"
                                                    }
                                `}
                                            >

                                                {/* Lecture icon */}
                                                <div
                                                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0
                                        ${isActive
                                                            ? "bg-blue-100 text-blue-600"
                                                            : "bg-gray-100 text-gray-500"
                                                        }
                                    `}
                                                >
                                                    <Video size={18} />
                                                </div>

                                                {/* Lecture information */}
                                                <div className="min-w-0 flex-1">

                                                    <p
                                                        className={`text-sm font-medium truncate
                                            ${isActive
                                                                ? "text-blue-700"
                                                                : "text-gray-800"
                                                            }
                                        `}
                                                    >
                                                        {index + 1}. {item.title}
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

                        <div className='p-4'>

                            <div className="space-y-4">

                                {lecture?.resources?.length > 0 ? (

                                    lecture.resources.map((resource, index) => (

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
                                                {resource.name || `Resource ${index + 1}`}
                                            </span>

                                        </a>

                                    ))

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
    )
}

export default Lecture
