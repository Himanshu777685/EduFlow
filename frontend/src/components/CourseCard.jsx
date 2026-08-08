import React from "react";
import { FiClock, FiBookOpen, FiStar } from "react-icons/fi";

const CourseCard = ({ course }) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all shadow-lg duration-300 group">

            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Category */}
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-700">
                    {course.category}
                </span>
            </div>

            {/* Content */}
            <div className="p-5">

                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {course.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {course.description}
                </p>

                {/* Instructor */}
                <div className="flex items-center gap-2 mt-4">
                    <img
                        src={course.instructorImage}
                        alt={course.instructor}
                        className="w-8 h-8 rounded-full object-cover"
                    />

                    <span className="text-sm text-gray-600">
                        {course.instructor}
                    </span>
                </div>

                {/* Course Info */}
                <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">

                    <div className="flex items-center gap-1">
                        <FiBookOpen size={15} />
                        <span>{course.lessons} Lessons</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <FiClock size={15} />
                        <span>{course.duration}</span>
                    </div>

                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-3">
                    <FiStar
                        size={16}
                        className="text-yellow-500 fill-yellow-500"
                    />

                    <span className="text-sm font-medium">
                        {course.rating}
                    </span>

                    <span className="text-sm text-gray-400">
                        ({course.reviews})
                    </span>
                </div>

                {/* Bottom */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">

                    <div>
                        <span className="text-xl font-bold text-gray-900">
                            ₹{course.price}
                        </span>
                    </div>

                    <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition">
                        View Course
                    </button>

                </div>

            </div>
        </div>
    );
};

export default CourseCard;