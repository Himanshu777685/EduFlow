import React, { useState } from "react";
import {
    FiPlus,
    FiSearch,
    FiEdit2,
    FiTrash2,
    FiEye,
    FiMoreVertical,
    FiBookOpen,
    FiUsers,
} from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const CreatorCourses = () => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    // Temporary data
    const courses = [
        {
            id: 1,
            title: "Complete React Development",
            description:
                "Learn React from fundamentals to advanced concepts and build real-world applications.",
            thumbnail:
                "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
            category: "Development",
            students: 124,
            lessons: 42,
            status: "Published",
            price: 499,
            updated: "2 days ago",
        },
        {
            id: 2,
            title: "Node.js & Express Backend",
            description:
                "Build scalable backend applications using Node.js, Express and MongoDB.",
            thumbnail:
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
            category: "Backend",
            students: 86,
            lessons: 36,
            status: "Published",
            price: 449,
            updated: "5 days ago",
        },
        {
            id: 3,
            title: "Data Structures & Algorithms",
            description:
                "Master DSA concepts and improve your problem solving skills.",
            thumbnail:
                "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
            category: "Programming",
            students: 0,
            lessons: 58,
            status: "Draft",
            price: 599,
            updated: "Yesterday",
        },
        {
            id: 4,
            title: "MongoDB Masterclass",
            description:
                "Learn MongoDB database design, queries and real-world applications.",
            thumbnail:
                "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
            category: "Database",
            students: 52,
            lessons: 28,
            status: "Published",
            price: 399,
            updated: "1 week ago",
        },
    ];

    const filteredCourses = courses.filter((course) => {
        const matchesSearch = course.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus =
            status === "All" || course.status === status;

        return matchesSearch && matchesStatus;
    });

    const totalStudents = courses.reduce(
        (total, course) => total + course.students,
        0
    );

    const publishedCourses = courses.filter(
        (course) => course.status === "Published"
    ).length;

    const draftCourses = courses.filter(
        (course) => course.status === "Draft"
    ).length;

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 p-5 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <div className="flex gap-3">
                        <IoArrowBack className="h-10 w-5 stroke-width-[4] cursor-pointer" onClick={() => navigate(-1)}/>
                        <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            My Courses
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage and track the courses you have created.
                        </p>
                    </div>
                    </div>

                    <button className="flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer rounded-xl font-medium transition" onClick={()=>navigate('/create-courses')}>
                        <FiPlus size={18} />
                        Create Course
                    </button>

                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">

                    {/* Total */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5">
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Total Courses
                                </p>

                                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                                    {courses.length}
                                </h2>
                            </div>

                            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <FiBookOpen size={21} />
                            </div>

                        </div>
                    </div>

                    {/* Published */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5">
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Published
                                </p>

                                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                                    {publishedCourses}
                                </h2>
                            </div>

                            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-green-50 text-green-600">
                                <FiEye size={21} />
                            </div>

                        </div>
                    </div>

                    {/* Students */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5">
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Total Students
                                </p>

                                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                                    {totalStudents}
                                </h2>
                            </div>

                            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                                <FiUsers size={21} />
                            </div>

                        </div>
                    </div>

                </div>

                {/* Search + Filter */}
                <div className="flex  flex-col  md:flex-row gap-10 mt-8">

                    <div className="relative flex-1">

                        <FiSearch
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search your courses..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                    </div>

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none text-gray-700"
                    >
                        <option value="All">All Courses</option>
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                    </select>

                </div>

                {/* Course count */}
                <div className="mt-8 mb-4">
                    <p className="text-sm text-gray-500">
                        Showing{" "}
                        <span className="font-semibold text-gray-800">
                            {filteredCourses.length}
                        </span>{" "}
                        courses
                    </p>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {filteredCourses.map((course) => (

                        <div
                            key={course.id}
                            className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition"
                        >

                            {/* Thumbnail */}
                            <div className="relative h-48">

                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />

                                {/* Status */}
                                <span
                                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${
                                        course.status === "Published"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                                >
                                    {course.status}
                                </span>

                                {/* More */}
                                <button className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-lg text-gray-600 hover:text-gray-900">
                                    <FiMoreVertical size={18} />
                                </button>

                            </div>

                            {/* Content */}
                            <div className="p-5">

                                <div className="flex items-center justify-between gap-3">

                                    <span className="text-xs font-medium text-indigo-600">
                                        {course.category}
                                    </span>

                                    <span className="text-sm font-semibold text-gray-900">
                                        ₹{course.price}
                                    </span>

                                </div>

                                <h2 className="text-lg font-semibold text-gray-900 mt-2 line-clamp-2">
                                    {course.title}
                                </h2>

                                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                    {course.description}
                                </p>

                                {/* Stats */}
                                <div className="flex items-center gap-5 mt-4 text-sm text-gray-500">

                                    <div className="flex items-center gap-1.5">
                                        <FiUsers size={15} />
                                        {course.students} students
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                        <FiBookOpen size={15} />
                                        {course.lessons} lessons
                                    </div>

                                </div>

                                <p className="text-xs text-gray-400 mt-3">
                                    Updated {course.updated}
                                </p>

                                {/* Actions */}
                                <div className="flex items-center gap-2 mt-5 pt-4 border-t border-gray-100">

                                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition">
                                        <FiEdit2 size={15} />
                                        Edit
                                    </button>

                                    <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:text-red-600 hover:border-red-200 transition">
                                        <FiTrash2 size={16} />
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* Empty State */}
                {filteredCourses.length === 0 && (
                    <div className="bg-white border border-gray-200 rounded-2xl py-16 text-center mt-6">

                        <FiBookOpen
                            size={35}
                            className="mx-auto text-gray-300"
                        />

                        <h2 className="text-lg font-semibold text-gray-800 mt-4">
                            No courses found
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Try changing your search or filter.
                        </p>

                    </div>
                )}

            </div>
        </div>
    );
};

export default CreatorCourses;