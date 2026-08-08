import React, { useState } from "react";
import axios from "axios";
import {
    FiArrowLeft,
    FiUpload,
    FiImage,
    FiBookOpen,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../App";

const CreateCourses = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        subTitle: "",
        description: "",
        level: "",
        price: "",
    });

    const [thumbnail, setThumbnail] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleThumbnail = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setThumbnail(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.category) {
            alert("Title and category are required");
            return;
        }

        try {
            setLoading(true);

            const data = new FormData();

            data.append("title", formData.title);
            data.append("category", formData.category);
            data.append("subTitle", formData.subTitle);
            data.append("description", formData.description);
            data.append("level", formData.level);
            data.append("price", formData.price);


            if (thumbnail) {
                data.append("thumbnail", thumbnail);
            }

            const result = await axios.post(
                `${serverURL}/api/course/createCourse`,
                data,
                {
                    withCredentials: true,
                }
            );

            console.log(result.data);

            alert("Course created successfully");

            navigate("/creator-courses");

        } catch (error) {
            console.log("Create course error:", error);

            alert(
                error.response?.data?.message ||
                "Something went wrong while creating the course"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">

            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex items-center gap-3 mb-8">

                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-200 transition"
                    >
                        <FiArrowLeft size={20} />
                    </button>

                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Create Course
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Create and publish a new course for your students.
                        </p>
                    </div>

                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Main Details */}
                        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">

                            <div className="flex items-center gap-2 mb-6">
                                <FiBookOpen
                                    className="text-indigo-600"
                                    size={20}
                                />

                                <h2 className="text-lg font-semibold text-gray-900">
                                    Course Information
                                </h2>
                            </div>

                            {/* Title */}
                            <div className="mb-5">

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Course Title
                                    <span className="text-red-500 ml-1">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Complete React Development"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />

                            </div>

                            {/* Subtitle */}
                            <div className="mb-5">

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Course Subtitle
                                </label>

                                <input
                                    type="text"
                                    name="subTitle"
                                    value={formData.subTitle}
                                    onChange={handleChange}
                                    placeholder="A short description of your course"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />

                            </div>
                            {/* Category */}
                            <div className="mb-5">

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                    <span className="text-red-500 ml-1">*</span>
                                </label>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                >
                                    <option value="">
                                        Select category
                                    </option>

                                    <option value="Development">
                                        Development
                                    </option>

                                    <option value="Programming">
                                        Programming
                                    </option>

                                    <option value="Database">
                                        Database
                                    </option>

                                    <option value="Design">
                                        Design
                                    </option>

                                    <option value="Data Science">
                                        Data Science
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>
                                </select>

                            </div>

                            {/* fees + Level */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Level
                                    </label>

                                    <select
                                        name="level"
                                        value={formData.level}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
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

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Course Price
                                    </label>

                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                            ₹
                                        </span>

                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            min="0"
                                            placeholder="e.g. 499"
                                            className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>

                            </div>

                            {/* Description */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Course Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="7"
                                    placeholder="Describe what students will learn in this course..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                />

                            </div>

                        </div>

                        {/* Thumbnail */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 h-fit">

                            <h2 className="text-lg font-semibold text-gray-900 mb-5">
                                Course Thumbnail
                            </h2>

                            <label
                                htmlFor="thumbnail"
                                className="block cursor-pointer"
                            >

                                <div className="relative w-full aspect-video rounded-xl border-2 border-dashed border-gray-300 overflow-hidden hover:border-indigo-400 transition">

                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt="Course thumbnail preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">

                                            <FiImage size={40} />

                                            <p className="text-sm mt-3">
                                                Upload thumbnail
                                            </p>

                                            <p className="text-xs mt-1 text-gray-400">
                                                PNG, JPG or JPEG
                                            </p>

                                        </div>
                                    )}

                                </div>

                            </label>

                            <input
                                id="thumbnail"
                                type="file"
                                accept="image/png,image/jpeg,image/jpg"
                                onChange={handleThumbnail}
                                className="hidden"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    document
                                        .getElementById("thumbnail")
                                        .click()
                                }
                                className="w-full flex items-center justify-center gap-2 mt-4 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                            >
                                <FiUpload size={17} />
                                {thumbnail
                                    ? "Change Thumbnail"
                                    : "Choose Image"}
                            </button>

                            <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                                Choose a clear image that represents your
                                course. This will be displayed to students
                                on the course card.
                            </p>

                        </div>

                    </div>

                    {/* Bottom Actions */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl text-sm font-medium transition"
                        >
                            {loading
                                ? "Creating Course..."
                                : "Create Course"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default CreateCourses;