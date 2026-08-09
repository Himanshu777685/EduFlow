import React from "react";
import { BookOpen, GraduationCap, Users, IndianRupee } from "lucide-react";
import { useSelector } from "react-redux";



const StatsCards = () => {

  const { creatorCourses } = useSelector(state => state.course)
  console.log("from stats card : ")
  console.log(creatorCourses);

  const publishedCourses = creatorCourses?.filter(
    (course) => course.isPublished
  )?.length || 0;

  const totalStudents = creatorCourses.reduce(
    (total, course) => total + course.enrolledStudents?.length,
    0
  );

  const totalRevenue = creatorCourses.reduce(
    (total, course) =>
        total +( course.price||0) *( course.enrolledStudents?.length || 0),
    0
);

  const stats = [
    {
      title: "Total Courses",
      value: creatorCourses?.length,
      icon: BookOpen,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
    },
    {
      title: "Published Courses",
      value: publishedCourses,
      icon: GraduationCap,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "Total Students",
      value: totalStudents || 0,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue}`,
      icon: IndianRupee,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {stat.value}
                </h2>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}
              >
                <Icon size={21} className={stat.iconColor} />
              </div>
            </div>

          </div>
        );
      })}
    </section>
  );
};

export default StatsCards;
