import React from "react";
import {
  ArrowRight,
  Play,
  CheckCircle2,
  BookOpen,
  BarChart3,
  Clock3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {

    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 overflow-hidden">
      



      {/* ================= HERO ================= */}
      <main id="home">
        <section className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-12 md:pt-20 pb-20">
          
          {/* Background blur decorations */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />

          <div className="absolute top-40 right-0 w-80 h-80 bg-violet-200/30 rounded-full blur-3xl pointer-events-none" />


          <div className="relative grid lg:grid-cols-2 gap-14 lg:gap-8 items-center">

            {/* ================= LEFT CONTENT ================= */}
            <div className="max-w-xl">

              {/* Small badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-7">
                <span className="w-2 h-2 bg-indigo-500 rounded-full" />
                Your learning journey, simplified
              </div>


              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] leading-[1.08] font-bold tracking-tight text-slate-900">
                Learn smarter.
                <br />

                <span className="text-indigo-600">
                  Grow with EduFlow.
                </span>
              </h1>


              {/* Description */}
              <p className="mt-6 text-base md:text-lg leading-7 text-slate-500 max-w-lg">
                Everything you need to learn, practice, and track your
                progress — all in one simple learning platform.
              </p>


              {/* CTA */}
              <div className="flex flex-wrap items-center gap-4 mt-8">

                <button className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-medium shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition" onClick={()=>navigate("/courses")}>
                  Explore Courses

                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>


                <button className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:border-indigo-200 hover:text-indigo-600 transition" onClick={()=>navigate("/about")}>
                  <Play size={16} fill="currentColor" />
                  How it works
                </button>

              </div>


              {/* Trust / Stats */}
              <div className="flex flex-wrap items-center gap-8 mt-10 pt-8 border-t border-slate-200">

                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    10K+
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Learners
                  </p>
                </div>

                <div className="w-px h-10 bg-slate-200" />

                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    500+
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Courses
                  </p>
                </div>

                <div className="w-px h-10 bg-slate-200" />

                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    95%
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Completion
                  </p>
                </div>

              </div>

            </div>


            {/* ================= RIGHT VISUAL ================= */}
            <div className="relative flex justify-center lg:justify-end">

              {/* Main image container */}
              <div className="relative w-full max-w-[570px]">

                {/* Decorative background */}
                <div className="absolute inset-5 bg-indigo-100 rounded-[2rem] rotate-3" />

                <div className="relative bg-white rounded-[2rem] border border-slate-200 shadow-2xl shadow-slate-300/40 overflow-hidden">

                  {/* Image */}
                  <img
                    src="Hero-image.png"
                    alt="EduFlow learning platform"
                    className="w-full h-auto object-cover"
                  />

                </div>


                {/* ================= FLOATING CARD 1 ================= */}
                <div className="absolute -left-5 md:-left-10 top-12 bg-white rounded-2xl border border-slate-100 shadow-xl p-4 flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                    <CheckCircle2
                      size={21}
                      className="text-green-500"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Course progress
                    </p>

                    <p className="text-sm font-semibold text-slate-800">
                      78% completed
                    </p>
                  </div>

                </div>


                {/* ================= FLOATING CARD 2 ================= */}
                <div className="absolute -right-4 md:-right-8 bottom-12 bg-white rounded-2xl border border-slate-100 shadow-xl p-4">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                      <BarChart3
                        size={20}
                        className="text-indigo-600"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Weekly progress
                      </p>

                      <p className="text-sm font-semibold text-slate-800">
                        +24% this week
                      </p>
                    </div>

                  </div>

                </div>


                {/* ================= SMALL CARD ================= */}
                <div className="absolute -right-3 md:-right-12 top-10 hidden sm:block bg-white rounded-xl border border-slate-100 shadow-lg px-4 py-3">

                  <div className="flex items-center gap-2">

                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                      <Clock3
                        size={16}
                        className="text-orange-500"
                      />
                    </div>

                    <div>
                      <p className="text-[10px] text-slate-400">
                        Learning time
                      </p>

                      <p className="text-xs font-semibold">
                        12h 45m
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* ================= FEATURES STRIP ================= */}
        <section
          id="features"
          className="border-y border-slate-200 bg-white"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-8">

            <div className="grid sm:grid-cols-3 gap-6">

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <BookOpen
                    size={21}
                    className="text-indigo-600"
                  />
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    Learn at your pace
                  </p>

                  <p className="text-sm text-slate-500">
                    Courses built for you
                  </p>
                </div>
              </div>


              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                  <BarChart3
                    size={21}
                    className="text-green-600"
                  />
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    Track your progress
                  </p>

                  <p className="text-sm text-slate-500">
                    See how far you've come
                  </p>
                </div>
              </div>


              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
                  <CheckCircle2
                    size={21}
                    className="text-orange-500"
                  />
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    Stay consistent
                  </p>

                  <p className="text-sm text-slate-500">
                    Build better learning habits
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

      </main>
    </div>
  );
};

export default Hero;