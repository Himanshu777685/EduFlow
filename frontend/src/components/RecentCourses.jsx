import React from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// const courses = [
//   {
//     title: "React.js - Complete Guide",
//     description: "Learn React from basics to advanced concepts with practical projects.",
//     status: "Published",
//     students: 125,
//     price: "₹1,999",
//     image: "https://placehold.co/96x72/111827/61dafb?text=React",
//   },
//   {
//     title: "Node.js & Express.js",
//     description: "Master backend development with Node.js, Express and MongoDB.",
//     status: "Unpublished",
//     students: 0,
//     price: "₹1,499",
//     image: "https://placehold.co/96x72/1f2937/84cc16?text=Node",
//   },
//   {
//     title: "Python for Data Science",
//     description: "Data analysis, visualization and machine learning using Python.",
//     status: "Published",
//     students: 320,
//     price: "₹2,499",
//     image: "https://placehold.co/96x72/1e293b/facc15?text=Python",
//   },
// ];



const RecentCourses = ({ search }) => {

  const { creatorCourses } = useSelector(state => state.course);

  const courses = creatorCourses?.slice(0, 4);


  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search?.toLowerCase())
  );

  const navigate = useNavigate()
  return (
    <section className="rounded-2xl border  border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Recent Courses</h2>
          <p className="mt-1 text-xs text-slate-500">
            Manage your latest courses
          </p>
        </div>

        <button className="text-sm font-semibold cursor-pointer text-violet-600 hover:text-violet-700" onClick={() => navigate("/creator-courses")}>
          View all
        </button>
      </div>

      <div className="space-y-3 shadow-lg">
        {filteredCourses.map((course) => (
          <div
            key={course.title}
            className="group flex items-center gap-4 rounded-xl border border-slate-100 p-3 transition hover:border-violet-200 hover:bg-violet-50/30"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-16 w-20 rounded-lg object-cover"
            />

            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold text-slate-800">
                {course.title}
              </h3>

              <p className="mt-1 truncate text-xs text-slate-500">
                {course.description}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <span
                  className={`rounded-full px-2 py-1 font-medium ${course?.isPublished
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-amber-600"
                    }`}
                >
                  {course?.isPublished ? "Published" : "Draft"}
                </span>

                <span className="text-slate-500">
                  {course?.enrolledStudents?.length || 0} Students
                </span>

                <span className="text-slate-500">{`₹${course?.price }`|| "Free"}</span>
              </div>
            </div>

            <button className="rounded-lg border border-slate-200 p-2 text-slate-500 opacity-70 transition hover:bg-white hover:text-slate-800 group-hover:opacity-100">
              <MoreHorizontal size={18} />
            </button>
          </div>
        ))}

        {filteredCourses.length === 0 && (
          <div className="py-10 text-center text-sm text-slate-500">
            No courses found.
          </div>
        )}
      </div>

    </section>
  );
};

export default RecentCourses;
