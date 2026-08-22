import React from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    BookOpen,
    CheckCircle2,
    GraduationCap,
    Laptop,
    PlayCircle,
    Target,
    Users,
    CreditCard,
    BarChart3,
} from "lucide-react";
import Nav from "../components/Nav";
import Footer from "./Footer";

const About = () => {

    const navigate = useNavigate();

    return (

        <div className="min-h-screen bg-white text-gray-900">

            <Nav />

            {/* ================= HERO ================= */}

            <section className="border-b border-gray-100">

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center py-20 lg:py-28">

                        {/* LEFT */}

                        <div>

                            <div className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 mb-6">
                                <GraduationCap size={17} />
                                Learning made practical
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">

                                Learn skills.

                                <span className="block text-indigo-600">
                                    Build something.
                                </span>

                            </h1>

                            <p className="mt-6 text-lg text-gray-500 leading-8 max-w-xl">

                                EduFlow is a learning platform where students
                                can explore courses, learn through structured
                                lectures, and track their learning progress.

                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 mt-8">

                                <button
                                    onClick={() => navigate("/courses")}
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                                >
                                    Explore Courses
                                    <ArrowRight size={18} />
                                </button>

                                <button
                                    onClick={() => navigate("/signup")}
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition"
                                >
                                    Create Account
                                </button>

                            </div>

                        </div>


                        {/* RIGHT - SIMPLE PRODUCT PREVIEW */}

                        <div className="relative">

                            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-5 sm:p-7">

                                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                                    {/* HEADER */}

                                    <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">

                                        <div className="flex items-center gap-3">

                                            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                                <BookOpen size={20} />
                                            </div>

                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    Your Courses
                                                </p>

                                                <p className="text-xs text-gray-400">
                                                    Continue learning
                                                </p>
                                            </div>

                                        </div>

                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />

                                    </div>


                                    {/* COURSE ROWS */}

                                    <div className="p-5 space-y-3">

                                        <CoursePreview
                                            number="01"
                                            title="Course lectures"
                                            text="Structured learning"
                                            icon={<PlayCircle size={18} />}
                                        />

                                        <CoursePreview
                                            number="02"
                                            title="Learning progress"
                                            text="Track completed lectures"
                                            icon={<BarChart3 size={18} />}
                                        />

                                        <CoursePreview
                                            number="03"
                                            title="Learning resources"
                                            text="Course materials"
                                            icon={<BookOpen size={18} />}
                                        />

                                    </div>


                                    {/* FOOTER */}

                                    <div className="px-5 pb-5">

                                        <div className="rounded-xl bg-indigo-50 p-4">

                                            <div className="flex items-start gap-3">

                                                <CheckCircle2
                                                    size={19}
                                                    className="text-indigo-600 mt-0.5 shrink-0"
                                                />

                                                <div>

                                                    <p className="text-sm font-semibold text-gray-900">
                                                        Learn at your own pace
                                                    </p>

                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Complete lectures as you progress through a course.
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= WHAT IS EDUFLOW ================= */}

            <section className="py-20">

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">

                        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                            About EduFlow
                        </p>

                        <h2 className="text-3xl sm:text-4xl font-bold mt-3">
                            A simple place to learn and manage your courses
                        </h2>

                        <p className="text-gray-500 leading-7 mt-5">
                            EduFlow connects students and educators through
                            a single learning platform. Students can discover
                            courses, enroll in them, access lectures, and
                            track completed lessons.
                        </p>

                        <p className="text-gray-500 leading-7 mt-4">
                            Educators can create courses, add lectures and
                            resources, and control which content is published
                            for students.
                        </p>

                    </div>


                    {/* TWO USER TYPES */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">

                        <RoleCard
                            icon={<Laptop size={22} />}
                            title="For Students"
                            description="Find courses, enroll in the ones you want to learn, access available lectures, and keep track of your completed lessons."
                            items={[
                                "Browse available courses",
                                "Enroll in free or paid courses",
                                "Access course lectures",
                                "Track lecture completion",
                            ]}
                        />

                        <RoleCard
                            icon={<Users size={22} />}
                            title="For Educators"
                            description="Create and manage educational content and make structured courses available to students."
                            items={[
                                "Create and manage courses",
                                "Add lectures and resources",
                                "Publish or unpublish lectures",
                                "Manage course content",
                            ]}
                        />

                    </div>

                </div>

            </section>


            {/* ================= HOW IT WORKS ================= */}

            <section className="py-20 bg-gray-50 border-y border-gray-100">

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="max-w-2xl mb-14">

                        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                            How it works
                        </p>

                        <h2 className="text-3xl sm:text-4xl font-bold mt-3">
                            From finding a course to tracking your progress
                        </h2>

                        <p className="text-gray-500 mt-4 leading-7">
                            The learning workflow is kept simple so you can
                            focus on the course rather than managing the platform.
                        </p>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                        <Step
                            number="01"
                            icon={<BookOpen size={21} />}
                            title="Explore"
                            text="Browse courses and check their descriptions, lectures, and available content."
                        />

                        <Step
                            number="02"
                            icon={<CreditCard size={21} />}
                            title="Enroll"
                            text="Enroll in free courses or complete payment for a paid course."
                        />

                        <Step
                            number="03"
                            icon={<PlayCircle size={21} />}
                            title="Learn"
                            text="Access the lectures available to you and learn at your own pace."
                        />

                        <Step
                            number="04"
                            icon={<Target size={21} />}
                            title="Track"
                            text="Mark lectures as completed and keep track of your learning progress."
                        />

                    </div>

                </div>

            </section>


            {/* ================= FEATURES ================= */}

            <section className="py-20">

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center max-w-2xl mx-auto mb-14">

                        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                            Platform features
                        </p>

                        <h2 className="text-3xl sm:text-4xl font-bold mt-3">
                            Built around the learning workflow
                        </h2>

                        <p className="text-gray-500 mt-4 leading-7">
                            The platform brings the important parts of
                            online course learning into one place.
                        </p>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <FeatureCard
                            icon={<BookOpen size={22} />}
                            title="Structured Courses"
                            description="Courses are organized into individual lectures so students can follow the content step by step."
                        />

                        <FeatureCard
                            icon={<PlayCircle size={22} />}
                            title="Lecture Access"
                            description="Students can access lectures based on course enrollment and the access rules configured for the course."
                        />

                        <FeatureCard
                            icon={<BarChart3 size={22} />}
                            title="Progress Tracking"
                            description="Completed lectures are saved so students can keep track of their progress even after leaving the course."
                        />

                        <FeatureCard
                            icon={<CreditCard size={22} />}
                            title="Course Enrollment"
                            description="Support for both free enrollment and paid course purchases gives students different ways to access courses."
                        />

                        <FeatureCard
                            icon={<Users size={22} />}
                            title="Student & Educator Roles"
                            description="Separate student and educator workflows keep learning and course management organized."
                        />

                        <FeatureCard
                            icon={<Target size={22} />}
                            title="Self-Paced Learning"
                            description="Students can move through their enrolled courses at their own pace and return to their progress later."
                        />

                    </div>

                </div>

            </section>


            {/* ================= SIMPLE MISSION ================= */}

            <section className="py-20 bg-gray-50">

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="border border-gray-200 bg-white rounded-3xl p-8 sm:p-12 text-center">

                        <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                            <GraduationCap size={24} />
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-bold">
                            Learning should be simple
                        </h2>

                        <p className="max-w-2xl mx-auto mt-5 text-gray-500 leading-7">
                            EduFlow is built around a straightforward idea:
                            give students an organized place to learn and
                            give educators the tools to create and manage
                            useful course content.
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= CTA ================= */}

            <section className="py-16 border-t border-gray-100">

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                        <div>

                            <h2 className="text-2xl sm:text-3xl font-bold">
                                Ready to start learning?
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Explore the available courses and find something
                                worth learning.
                            </p>

                        </div>

                        <button
                            onClick={() => navigate("/courses")}
                            className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                        >
                            Browse Courses
                            <ArrowRight size={18} />
                        </button>

                    </div>

                </div>

            </section>

            <Footer/>

        </div>
    );
};


/* ================================================= */
/* COURSE PREVIEW */
/* ================================================= */

const CoursePreview = ({
    number,
    title,
    text,
    icon,
}) => {

    return (

        <div className="flex items-center gap-4 border border-gray-100 rounded-xl p-4">

            <div className="w-9 h-9 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center shrink-0">
                {icon}
            </div>

            <div className="flex-1 min-w-0">

                <p className="text-sm font-medium text-gray-900">
                    {title}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                    {text}
                </p>

            </div>

            <span className="text-xs font-semibold text-gray-300">
                {number}
            </span>

        </div>

    );
};


/* ================================================= */
/* ROLE CARD */
/* ================================================= */

const RoleCard = ({
    icon,
    title,
    description,
    items,
}) => {

    return (

        <div className="border border-gray-200 rounded-2xl p-6 sm:p-7">

            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                {icon}
            </div>

            <h3 className="text-xl font-semibold text-gray-900">
                {title}
            </h3>

            <p className="text-sm text-gray-500 leading-6 mt-3">
                {description}
            </p>

            <div className="mt-6 space-y-3">

                {items.map((item, index) => (

                    <div
                        key={index}
                        className="flex items-center gap-3"
                    >

                        <CheckCircle2
                            size={17}
                            className="text-indigo-600 shrink-0"
                        />

                        <span className="text-sm text-gray-600">
                            {item}
                        </span>

                    </div>

                ))}

            </div>

        </div>

    );
};


/* ================================================= */
/* STEP */
/* ================================================= */

const Step = ({
    number,
    icon,
    title,
    text,
}) => {

    return (

        <div className="bg-white border border-gray-200 rounded-2xl p-6">

            <div className="flex items-center justify-between mb-6">

                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    {icon}
                </div>

                <span className="text-sm font-bold text-gray-300">
                    {number}
                </span>

            </div>

            <h3 className="font-semibold text-gray-900">
                {title}
            </h3>

            <p className="text-sm text-gray-500 leading-6 mt-2">
                {text}
            </p>

        </div>

    );
};


/* ================================================= */
/* FEATURE CARD */
/* ================================================= */

const FeatureCard = ({
    icon,
    title,
    description,
}) => {

    return (

        <div className="border border-gray-200 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-sm transition">

            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                {icon}
            </div>

            <h3 className="text-lg font-semibold text-gray-900">
                {title}
            </h3>

            <p className="text-sm text-gray-500 leading-6 mt-2">
                {description}
            </p>

        </div>

    );
};


export default About;