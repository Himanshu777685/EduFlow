import React from "react";
import { BookOpen, GraduationCap, Users, IndianRupee } from "lucide-react";

const stats = [
  {
    title: "Total Courses",
    value: "12",
    change: "+2 new this month",
    icon: BookOpen,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    title: "Published Courses",
    value: "8",
    change: "+1 new this month",
    icon: GraduationCap,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Total Students",
    value: "1,248",
    change: "+120 this month",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Total Revenue",
    value: "₹48,540",
    change: "+12% this month",
    icon: IndianRupee,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
];

const StatsCards = () => {
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

            <p className="mt-4 text-xs font-medium text-emerald-600">
              ↗ {stat.change}
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default StatsCards;
