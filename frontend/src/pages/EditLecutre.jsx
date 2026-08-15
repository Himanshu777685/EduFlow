import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
    ArrowLeft,
    Upload,
    FileText,
    Video,
    X,
    Plus
} from "lucide-react";

import { serverURL } from "../App";
import { useEffect } from "react";
import { ImSpinner2 } from "react-icons/im";

const EditLecture = () => {

    const { lectureId, courseId } = useParams();
    const navigate = useNavigate();



    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [order, setOrder] = useState(0);
    const [isPreviewFree, setIsPreviewFree] = useState(false);

    const [video, setVideo] = useState(null);
    const [resources, setResources] = useState([]);

    const [existingVideo, setExistingVideo] = useState("");
    const [existingResources, setExistingResources] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {

        const getLecture = async () => {

            try {

                const result = await axios.get(
                    `${serverURL}/api/lecture/lecture/${lectureId}`,
                    {
                        withCredentials: true
                    }
                );

                const lecture = result.data.lecture;

                console.log("Lecture:", lecture);

                // Set existing values
                setTitle(lecture.title || "");
                setDescription(lecture.description || "");
                setOrder(lecture.order || 0);
                setIsPreviewFree(lecture.isPreviewFree || false);

                //Existing Video
                setExistingVideo(lecture.videoUrl || "");

                // Existing resources
                setResources(lecture.resources || []);

            } catch (error) {

                console.log(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load lecture"
                );

            } finally {

                setLoading(false);

            }
        };

        getLecture();

    }, [lectureId]);


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">

                <ImSpinner2 className="w-8 h-8 text-purple-600 animate-spin" />
            </div>
        );
    }



    // ---------------- VIDEO ----------------

    const handleVideoChange = (e) => {

        const file = e.target.files[0] || existingVideo;

        if (file) {
            setVideo(file);
        }
    };


    // ---------------- RESOURCES ----------------

    const handleResourceChange = (e) => {

        const files = Array.from(e.target.files);

        setResources((prev) => [
            ...prev,
            ...files
        ]);
    };


    const removeResource = (index) => {

        setResources((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };


    // ---------------- CREATE LECTURE ----------------

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        if (!title.trim()) {
            setError("Lecture title is required");
            return;
        }

        try {

            setLoading(true);


            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);
            formData.append("order", order);
            formData.append("isPreviewFree", isPreviewFree);



            // Video
            if (video) {
                formData.append("video", video);
            }



            // Resources
            resources.forEach((file) => {
                formData.append("resources", file);
            });


            const result = await axios.put(
                `${serverURL}/api/lecture/updateLecture/${lectureId}`,
                formData,
                {
                    withCredentials: true
                }
            );


            console.log(result.data);

            setSuccess("Lecture created successfully");


            // Go back after short delay
            setTimeout(() => {
                navigate(`/courseforeducator/${courseId}`);
            }, 800);


        } catch (error) {

            console.log("Create lecture error:", error);

            setError(
                error.response?.data?.message ||
                "Something went wrong"
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="min-h-screen bg-[#f8fafc]">

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">


                {/* BACK */}

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6"
                >
                    <ArrowLeft size={18} />

                    Back
                </button>


                {/* HEADER */}

                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl">
                            <Video size={22} />
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900">
                            Edit Lecture
                        </h1>
                    </div>

                    <p className="text-gray-500">
                        Update your lecture content, video, resources and settings.
                    </p>
                </div>


                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-8 space-y-8"
                >


                    {/* ERROR */}

                    {error && (

                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>

                    )}


                    {/* SUCCESS */}

                    {success && (

                        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
                            {success}
                        </div>

                    )}


                    <div className="flex items-center gap-3 pb-3 border-b border-gray-100">

                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                            <FileText size={18} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Basic Information
                            </h2>

                            <p className="text-xs text-gray-500">
                                Update the lecture title and description
                            </p>
                        </div>

                    </div>

                    {/* TITLE */}

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Lecture Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            placeholder="e.g. Introduction to Python"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />

                    </div>


                    {/* DESCRIPTION */}

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            rows={5}
                            placeholder="What will students learn in this lecture?"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />

                    </div>


                    {/* VIDEO */}

                    <div className="flex items-center justify-between mb-3">

                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Lecture Video
                            </h2>

                            <p className="text-xs text-gray-500 mt-1">
                                Preview your current or newly selected video
                            </p>
                        </div>

                        {video && (
                            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-medium">
                                New video selected
                            </span>
                        )}

                    </div>

                    <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-950">

                        {/* <video
                            src={existingVideo || URL.createObjectURL(video)}
                            controls
                            className="w-full max-h-[450px] object-contain"
                        /> */}
                        {video
                            ? (

                                <video
                                    src={URL.createObjectURL(video)}
                                    controls
                                    className="w-full rounded-xl max-h-112.5 object-contain"
                                />

                            )
                            : existingVideo
                                ? (


                                    <video
                                        src={existingVideo}
                                        controls
                                        className="w-full rounded-xl max-h-112.5 object-contain"
                                    />

                                )
                                : "Upload lecture video"
                        }

                    </div>


                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Change Lecture Video
                        </label>

                        <label className="border-2 border-dashed border-gray-300 hover:border-indigo-400 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition">

                            <Video
                                size={32}
                                className="text-indigo-500 mb-3"
                            />
                            <span className="text-xs text-gray-400 mt-1">
                                MP4, WebM, MOV
                            </span>

                            {/* <span className="font-medium text-gray-700">
                                
                            </span> */}

                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleVideoChange}
                                className="hidden"
                            />



                        </label>


                    </div>


                    {/* RESOURCES */}

                    <div>

                        <label className="group border-2 border-dashed border-gray-300
                  hover:border-indigo-400 hover:bg-indigo-50/30
                  rounded-2xl p-8 flex flex-col items-center
                  justify-center cursor-pointer transition">

                            <div className="w-12 h-12 rounded-xl bg-indigo-50
                    text-indigo-600 flex items-center justify-center mb-3
                    group-hover:scale-105 transition">
                                <Upload size={22} />
                            </div>

                            <span className="font-semibold text-gray-700">
                                Add lecture resources
                            </span>

                            <span className="text-xs text-gray-400 mt-1">
                                PDF, DOC, PPT and other documents · Maximum 5 files
                            </span>

                            <input
                                type="file"
                                multiple
                                onChange={handleResourceChange}
                                className="hidden"
                            />

                        </label>


                        {/* RESOURCE LIST */}

                        {resources.length > 0 && (

                            <div className="mt-4 space-y-2">

                                {resources.map((file, index) => (

                                    <div
                                        key={index}
                                        className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3"
                                    >

                                        <div className="flex items-center gap-3 min-w-0">

                                            <FileText
                                                size={18}
                                                className="text-indigo-500 shrink-0"
                                            />

                                            <span className="text-sm text-gray-700 truncate">
                                                {file.name}
                                            </span>

                                        </div>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeResource(index)
                                            }
                                            className="text-gray-400 hover:text-red-500"
                                        >
                                            <X size={18} />
                                        </button>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>


                    {/* ORDER + PREVIEW */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">


                        {/* ORDER */}

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Lecture Order
                            </label>

                            <input
                                type="number"
                                min="0"
                                value={order}
                                onChange={(e) =>
                                    setOrder(e.target.value)
                                }
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />

                        </div>


                        {/* PREVIEW */}

                        <div className="border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between">

                            <div>

                                <p className="text-sm font-semibold text-gray-700">
                                    Free Preview
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    Allow students to watch this lecture for free
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    setIsPreviewFree(
                                        !isPreviewFree
                                    )
                                }
                                className={`relative w-11 h-6 rounded-full transition ${isPreviewFree
                                    ? "bg-indigo-500"
                                    : "bg-gray-300"
                                    }`}
                            >

                                <span
                                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${isPreviewFree
                                        ? "left-6"
                                        : "left-1"
                                        }`}
                                />

                            </button>

                        </div>

                    </div>


                    {/* SUBMIT */}

                    <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row
                items-center justify-between gap-4">

                        <p className="text-xs text-gray-400">
                            Changes will be saved to this lecture.
                        </p>

                        <div className="flex gap-3">

                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-5 py-2.5 rounded-xl border border-gray-200
                       text-gray-600 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 px-6 py-2.5
                       bg-indigo-600 text-white rounded-xl
                       font-medium shadow-sm
                       hover:bg-indigo-700
                       hover:shadow-md
                       transition disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <ImSpinner2 className="animate-spin" size={17} />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Plus size={18} />
                                        Save Changes
                                    </>
                                )}
                            </button>

                        </div>

                    </div>


                </form>

            </main>

        </div>
    );
};

export default EditLecture;