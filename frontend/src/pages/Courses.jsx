import React, { useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import CourseCard from "../components/CourseCard";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";

const Courses = () => {

  const [search, setSearch] = useState("");

  const {allCourses} = useSelector(state=>state.course);
  console.log("from courses: ");
  console.log(allCourses)
  
  
  const filteredCourses = allCourses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 ">

      <Nav />

      {/* Header */}
      <div className="pt-25 px-5 lg-px-2 max-w-7xl  mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Explore Courses
            </h1>

            <p className="text-gray-500 mt-2">
              Learn new skills and grow your career.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">

            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />

          </div>

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

        {/* Courses */}
        <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 pb-10 gap-6">

          {filteredCourses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
            />
          ))}

        </div>

      </div>

    </div>
  );
};

export default Courses;