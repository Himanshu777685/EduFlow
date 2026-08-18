import React from "react";
import { useSelector } from "react-redux";

const CoursePerformance = () => {

    const { creatorCourses } = useSelector(
        (state) => state.course
    );

    const topCourses = [...(creatorCourses || [])]
        .sort(
            (a, b) =>
                (b.enrolledStudent?.length ?? 0) -
                (a.enrolledStudent?.length ?? 0)
        )
        .slice(0, 4);

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5">

            {/* Header */}
            <div className="mb-5">
                <h2 className="text-lg font-semibold text-gray-900">
                    Course Performance
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Your top performing courses
                </p>
            </div>

            {/* Courses */}
            <div className="space-y-5">

                {topCourses.length > 0 ? (
                    topCourses.map((course) => {

                        const students =
                            course.enrolledStudent?.length ?? 0;

                        const revenue =
                            (course.price ?? 0) * students;

                        return (
                            <div
                                key={course._id}
                                className="space-y-2"
                            >

                                <div className="flex justify-between items-center">
                                    <p className="font-medium text-gray-800 truncate max-w-[60%]">
                                        {course.title}
                                    </p>

                                    <p className="text-sm font-medium text-gray-700">
                                        ₹{revenue}
                                    </p>
                                </div>

                                {/* Progress bar */}
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-purple-500 rounded-full"
                                        style={{
                                            width: `${Math.min(
                                                (students /
                                                    Math.max(
                                                        topCourses[0]?.enrolledStudent?.length ?? 1,
                                                        1
                                                    )) *
                                                    100,
                                                100
                                            )}%`
                                        }}
                                    />
                                </div>

                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>
                                        {students} students
                                    </span>

                                    <span>
                                        ₹{course.price ?? 0} / course
                                    </span>
                                </div>

                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        No courses available
                    </div>
                )}

            </div>
        </div>
    );
};

export default CoursePerformance;