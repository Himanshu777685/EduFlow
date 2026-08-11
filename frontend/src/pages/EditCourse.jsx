
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiSave, FiImage } from "react-icons/fi";
import axios from "axios";

import { serverURL } from "../App";
import getCourseforEducator from "../customHooks/getCourseforEducator";

export const EditCourse = () => {

    // =========================
    // URL + Navigation
    // =========================

    const { courseId } = useParams();
    const navigate = useNavigate();


    // =========================
    // Get Course
    // =========================

    const {
        course,
        loading,
        error,
    } = getCourseforEducator({ courseId });


    // =========================
    // Form State
    // =========================

    const [formData, setFormData] = useState({
        title: "",
        subTitle: "",
        description: "",
        category: "",
        level: "",
        price: "",
    });


    // =========================
    // Thumbnail State
    // =========================

    const [thumbnail, setThumbnail] = useState(null);

    const [preview, setPreview] = useState("");


    // =========================
    // Update State
    // =========================

    const [updating, setUpdating] = useState(false);

    const [updateError, setUpdateError] = useState("");


    // =========================
    // Fill Form When Course Loads
    // =========================

    useEffect(() => {

        if (!course) return;

        console.log("Course received:", course);

        setFormData({
            title: course.title || "",
            subTitle: course.subTitle || "",
            description: course.description || "",
            category: course.category || "",
            level: course.level || "",
            price: course.price ?? "",
        });

        // Existing thumbnail
        setPreview(course.thumbnail || "");

    }, [course]);


    // =========================
    // Handle Input Change
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    // =========================
    // Handle Thumbnail
    // =========================

    const handleThumbnailChange = (e) => {

        const file = e.target.files?.[0];

        if (!file) return;

        // Store actual file
        setThumbnail(file);

        // Create preview
        const imageUrl = URL.createObjectURL(file);

        setPreview(imageUrl);

    };


    // =========================
    // Submit
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setUpdating(true);
            setUpdateError("");


            // =========================
            // FormData
            // =========================

            const data = new FormData();

            data.append("title", formData.title);
            data.append("subTitle", formData.subTitle);
            data.append("description", formData.description);
            data.append("category", formData.category);
            data.append("level", formData.level);
            data.append("price", formData.price);


            // Only send thumbnail if changed
            if (thumbnail) {
                data.append("thumbnail", thumbnail);
            }


            // =========================
            // API Request
            // =========================

            const result = await axios.put(
                `${serverURL}/api/course/editCourse/${courseId}`,
                data,
                {
                    withCredentials: true,
                }
            );


            console.log("Updated course:", result.data);


            // =========================
            // Navigate
            // =========================

            navigate(`/courseforeducator/${courseId}`);

        } catch (error) {

            console.log("EDIT COURSE ERROR:", error);

            setUpdateError(
                error.response?.data?.message ||
                "Failed to update course"
            );

        } finally {

            setUpdating(false);

        }

    };


    // =========================
    // Loading
    // =========================

    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">

                <div className="text-center">

                    <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

                    <p className="text-gray-500">
                        Loading course...
                    </p>

                </div>

            </div>
        );

    }


    // =========================
    // Fetch Error
    // =========================

    if (error) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">

                <div className="bg-white p-8 rounded-xl shadow-sm border text-center">

                    <p className="text-red-500 mb-5">
                        {error}
                    </p>

                    <button
                        onClick={() => navigate(-1)}
                        className="px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                    >
                        Go Back
                    </button>

                </div>

            </div>
        );

    }


    // =========================
    // UI
    // =========================

    return (

        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">

            <div className="max-w-5xl mx-auto">


                {/* =========================
                    Header
                ========================= */}

                <div className="flex items-center justify-between mb-8">

                    <div className="flex items-center gap-4">

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="w-10 h-10 rounded-lg bg-white border border-gray-200
                            flex items-center justify-center
                            hover:bg-gray-100 transition"
                        >

                            <FiArrowLeft size={20} />

                        </button>


                        <div>

                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                Edit Course
                            </h1>

                            <p className="text-gray-500 mt-1">
                                Update your course information
                            </p>

                        </div>

                    </div>

                </div>


                {/* =========================
                    Form
                ========================= */}

                <form onSubmit={handleSubmit}>

                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">


                        <h2 className="text-xl font-semibold text-gray-900 mb-7">
                            Course Information
                        </h2>


                        {/* =========================
                            THUMBNAIL
                        ========================= */}

                        <div className="mb-8">

                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Course Thumbnail
                            </label>


                            <div className="flex flex-col sm:flex-row gap-6 items-start">


                                {/* Preview */}

                                <div className="w-full sm:w-56">

                                    {preview ? (

                                        <img
                                            src={preview}
                                            alt="Course thumbnail"
                                            className="w-full h-32 object-cover rounded-xl border border-gray-200"
                                        />

                                    ) : (

                                        <div
                                            className="w-full h-32 rounded-xl border-2 border-dashed
                                            border-gray-300 flex flex-col items-center justify-center
                                            text-gray-400"
                                        >

                                            <FiImage size={28} />

                                            <span className="text-sm mt-2">
                                                No thumbnail
                                            </span>

                                        </div>

                                    )}

                                </div>


                                {/* Upload */}

                                <div className="flex-1">

                                    <input
                                        id="thumbnail"
                                        type="file"
                                        accept="image/png,image/jpeg,image/jpg,image/webp"
                                        onChange={handleThumbnailChange}
                                        className="block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2.5 file:px-4
                                        file:rounded-lg file:border-0
                                        file:text-sm file:font-medium
                                        file:bg-blue-50 file:text-blue-600
                                        hover:file:bg-blue-100
                                        cursor-pointer"
                                    />


                                    <p className="text-xs text-gray-500 mt-2">
                                        Upload a new image only if you want to change
                                        the current thumbnail.
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* =========================
                            TITLE
                        ========================= */}

                        <div className="mb-6">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Course Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter course title"
                                className="w-full px-4 py-3 border border-gray-300
                                rounded-lg outline-none
                                focus:ring-2 focus:ring-blue-500
                                focus:border-blue-500"
                                required
                            />

                        </div>


                        {/* =========================
                            SUBTITLE
                        ========================= */}

                        <div className="mb-6">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subtitle
                            </label>

                            <input
                                type="text"
                                name="subTitle"
                                value={formData.subTitle}
                                onChange={handleChange}
                                placeholder="Enter course subtitle"
                                className="w-full px-4 py-3 border border-gray-300
                                rounded-lg outline-none
                                focus:ring-2 focus:ring-blue-500
                                focus:border-blue-500"
                            />

                        </div>


                        {/* =========================
                            DESCRIPTION
                        ========================= */}

                        <div className="mb-6">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe what students will learn..."
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-300
                                rounded-lg outline-none resize-none
                                focus:ring-2 focus:ring-blue-500
                                focus:border-blue-500"
                                required
                            />

                        </div>


                        {/* =========================
                            CATEGORY + LEVEL
                        ========================= */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">


                            {/* Category */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300
                                    rounded-lg bg-white outline-none
                                    focus:ring-2 focus:ring-blue-500"
                                    required
                                >

                                    <option value="">
                                        Select category
                                    </option>

                                    <option value="Development">
                                        Development
                                    </option>

                                    <option value="Design">
                                        Design
                                    </option>

                                    <option value="Business">
                                        Business
                                    </option>

                                    <option value="Data Science">
                                        Data Science
                                    </option>

                                    <option value="Marketing">
                                        Marketing
                                    </option>

                                </select>

                            </div>


                            {/* Level */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Level
                                </label>

                                <select
                                    name="level"
                                    value={formData.level}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300
                                    rounded-lg bg-white outline-none
                                    focus:ring-2 focus:ring-blue-500"
                                    required
                                >

                                    <option value="">
                                        Select level
                                    </option>

                                    <option value="Beginner">
                                        Beginner
                                    </option>

                                    <option value="Intermediate">
                                        Intermediate
                                    </option>

                                    <option value="Advanced">
                                        Advanced
                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* =========================
                            PRICE
                        ========================= */}

                        <div className="mb-8 max-w-sm">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Course Price (₹)
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                min="0"
                                placeholder="Enter course price"
                                className="w-full px-4 py-3 border border-gray-300
                                rounded-lg outline-none
                                focus:ring-2 focus:ring-blue-500
                                focus:border-blue-500"
                                required
                            />

                        </div>


                        {/* =========================
                            UPDATE ERROR
                        ========================= */}

                        {updateError && (

                            <div className="mb-6 px-4 py-3 rounded-lg
                                bg-red-50 border border-red-200">

                                <p className="text-sm text-red-600">
                                    {updateError}
                                </p>

                            </div>

                        )}


                        {/* =========================
                            BUTTONS
                        ========================= */}

                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">


                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-6 py-3 rounded-lg
                                border border-gray-300
                                text-gray-700 font-medium
                                hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                disabled={updating}
                                className="px-6 py-3 rounded-lg
                                bg-blue-600 text-white
                                font-medium
                                flex items-center justify-center gap-2
                                hover:bg-blue-700 transition
                                disabled:opacity-60
                                disabled:cursor-not-allowed"
                            >

                                <FiSave size={18} />

                                {updating
                                    ? "Saving..."
                                    : "Save Changes"
                                }

                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </div>

    );
};

