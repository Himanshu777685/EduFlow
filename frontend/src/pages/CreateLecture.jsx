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

const CreateLecture = () => {

    const { courseId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [order, setOrder] = useState(0);
    const [isPreviewFree, setIsPreviewFree] = useState(false);

    const [video, setVideo] = useState(null);
    const [resources, setResources] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // ---------------- VIDEO ----------------

    const handleVideoChange = (e) => {

        const file = e.target.files[0];

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

        if (!video) {
            setError("Lecture video is required");
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
            formData.append("video", video);


            // Resources
            resources.forEach((file) => {
                formData.append("resources", file);
            });


            const result = await axios.post(
                `${serverURL}/api/lecture/create-lecture/${courseId}`,
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

                <div className="mb-7">

                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Create New Lecture
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Add a new lesson to your course.
                    </p>

                </div>


                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-8 space-y-7"
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

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Lecture Video
                        </label>

                        <label className="border-2 border-dashed border-gray-300 hover:border-indigo-400 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition">

                            <Video
                                size={32}
                                className="text-indigo-500 mb-3"
                            />

                            <span className="font-medium text-gray-700">
                                {video
                                    ? video.name
                                    : "Upload lecture video"
                                }
                            </span>

                            <span className="text-xs text-gray-400 mt-1">
                                MP4, WebM, MOV
                            </span>

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

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Resources
                        </label>

                        <label className="border-2 border-dashed border-gray-300 hover:border-indigo-400 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition">

                            <FileText
                                size={28}
                                className="text-indigo-500 mb-2"
                            />

                            <span className="font-medium text-gray-700">
                                Add PDF / Documents
                            </span>

                            <span className="text-xs text-gray-400 mt-1">
                                Maximum 5 files
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

                    <div className="pt-3 flex justify-end">

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition disabled:opacity-50"
                        >

                            <Plus size={18} />

                            {loading
                                ? "Creating..."
                                : "Create Lecture"
                            }

                        </button>

                    </div>


                </form>

            </main>

        </div>
    );
};

export default CreateLecture;