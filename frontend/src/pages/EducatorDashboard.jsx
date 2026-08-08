import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCards from "../components/StatsCards";
import RecentCourses from "../components/RecentCourses";
import OverviewChart from "../components/OverviewChart";
import Nav from "../components/Nav";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EducatorDashboard = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800">
            <Nav />
            <div className=" pt-16 mx-5 min-h-screen">

                <main className="p-4 sm:p-6  lg:p-8">
                    <div className="flex items-center justify-between">
                        <div className="mb-7">
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                                Dashboard
                            </h1>
                            <p className="mt-1 text-sm text-slate-500">
                                Welcome back! Here's what's happening with your courses.
                            </p>
                        </div>

                        <button className="flex items-center justify-center gap-2 rounded-xl border-2 border-violet-300 py-3 px-4 text-sm font-semibold text-violet-600 transition hover:bg-violet-50" onClick={()=>navigate("/create-courses")} >
                            <Plus size={17} />
                            Create New Course
                        </button>
                    </div>

                    <StatsCards />

                    <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <RecentCourses search={search} />
                        <OverviewChart />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default EducatorDashboard;
