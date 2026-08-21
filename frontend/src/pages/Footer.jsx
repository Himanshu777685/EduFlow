import React from "react";
import { BookOpen, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {

    const navigate = useNavigate();
    return (
        <footer className="border-t border-gray-200 bg-white mt-16">

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* BRAND */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center">
                                <BookOpen size={19} />
                            </div>

                            <span className="text-lg font-bold text-gray-900">
                                EduFlow
                            </span>
                        </div>

                        <p className="text-sm text-gray-500 max-w-sm leading-6">
                            A learning platform designed to help students
                            access courses, lectures and learning resources
                            in one place.
                        </p>
                    </div>


                    {/* PLATFORM */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">
                            Platform
                        </h3>

                        <div className="space-y-3 text-sm text-gray-500">
                            <p className="hover:text-gray-900 cursor-pointer" onClick={()=>navigate('/courses')}>
                                Courses
                            </p>

                            <p className="hover:text-gray-900 cursor-pointer" onClick={()=>navigate('/')}>
                                Home
                            </p>

                            <p className="hover:text-gray-900 cursor-pointer" onClick={()=>navigate('/about')}>
                                About
                            </p>
                        </div>
                    </div>


                    {/* CONTACT */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">
                            Connect
                        </h3>

                        <div className="space-y-3">

                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Mail size={16} />
                                <span>support@eduflow.com</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                
                                <span>EduFlow</span>
                            </div>

                        </div>
                    </div>

                </div>


                {/* BOTTOM */}
                <div className="border-t border-gray-100 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">

                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()} EduFlow. All rights reserved.
                    </p>

                    <p className="text-xs text-gray-400">
                        Learn. Track. Grow.
                    </p>

                </div>

            </div>

        </footer>
    );
};

export default Footer;