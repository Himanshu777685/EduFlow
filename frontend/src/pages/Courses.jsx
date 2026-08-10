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
  // const courses = [
  //   {
  //     id: 1,
  //     title: "Complete React Development",
  //     description:
  //       "Learn React from fundamentals to advanced concepts and build real-world applications.",
  //     category: "Development",
  //     instructor: "Himanshu Kumar",
  //     instructorImage:
  //       "https://i.pravatar.cc/100?img=12",
  //     thumbnail:
  //       "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
  //     lessons: 42,
  //     duration: "12h 30m",
  //     rating: 4.8,
  //     reviews: 124,
  //     price: 499
  //   },
  //   {
  //     id: 2,
  //     title: "Data Structures & Algorithms",
  //     description:
  //       "Master DSA concepts and improve your problem-solving skills with practical problems.",
  //     category: "Programming",
  //     instructor: "Alex Johnson",
  //     instructorImage:
  //       "https://i.pravatar.cc/100?img=11",
  //     thumbnail:
  //       "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
  //     lessons: 58,
  //     duration: "18h 20m",
  //     rating: 4.9,
  //     reviews: 218,
  //     price: 599
  //   },
  //   {
  //     id: 3,
  //     title: "Node.js & Express Backend",
  //     description:
  //       "Build scalable backend applications using Node.js, Express, MongoDB and REST APIs.",
  //     category: "Backend",
  //     instructor: "Sarah Williams",
  //     instructorImage:
  //       "https://i.pravatar.cc/100?img=32",
  //     thumbnail:
  //       "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  //     lessons: 36,
  //     duration: "10h 45m",
  //     rating: 4.7,
  //     reviews: 96,
  //     price: 449
  //   },
  //   {
  //     id: 4,
  //     title: "MongoDB & Database Design",
  //     description:
  //       "Understand MongoDB, database architecture, schemas, queries and real-world applications.",
  //     category: "Database",
  //     instructor: "David Smith",
  //     instructorImage:
  //       "https://i.pravatar.cc/100?img=13",
  //     thumbnail:
  //       "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
  //     lessons: 28,
  //     duration: "8h 15m",
  //     rating: 4.6,
  //     reviews: 74,
  //     price: 399
  //   }
  // ];

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

        {/* Filters */}
        <div className="hidden lg:flex items-center gap-3 mt-8">

          <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
            All Courses
          </button>

          <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
            Development
          </button>

          <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
            Programming
          </button>

          <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
            Database
          </button>

          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600">
            <FiFilter size={16} />
            Filter
          </button>

        </div>
        <div className="lg:hidden mt-6">
          <select
            className=" px-4 py-2 bg-white border border-gray-200 rounded-xl text-lg text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option className="text-sm " value="all">All Courses</option>
            <option className="text-sm " value="development">Development</option>
            <option className="text-sm " value="programming">Programming</option>
            <option className="text-sm " value="database">Database</option>
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