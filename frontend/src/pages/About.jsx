import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Code2,
  Users,
  Target,
  Award,
  Rocket,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Laptop,
} from "lucide-react";
import Nav from "../components/Nav";

const About = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900">

      <Nav />

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden">

        {/* Background decoration */}

        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-indigo-50 blur-3xl" />

        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-indigo-50 blur-3xl" />


        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">

            {/* LEFT */}

            <div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-500 text-sm font-medium mb-6">

                <GraduationCap size={16} />

                Learn. Build. Grow.

              </div>


              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">

                Learn skills that

                <span className="text-indigo-500">
                  {" "}move your career
                </span>

                {" "}forward.

              </h1>


              <p className="mt-6 text-lg text-gray-500 leading-8 max-w-xl">

                We believe learning should be practical,
                accessible, and focused on real-world skills.
                Our platform helps students learn, build
                projects, and prepare for their careers.

              </p>


              <div className="flex flex-col sm:flex-row gap-3 mt-8">

                <button
                  onClick={() => navigate("/courses")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
                >
                  Explore Courses
                  <ArrowRight size={18} />
                </button>


                <button
                  onClick={() => navigate("/signup")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  Get Started
                </button>

              </div>

            </div>


            {/* RIGHT */}

            <div className="relative">

              <div className="bg-indigo-500 rounded-3xl p-6 sm:p-8 shadow-xl shadow-indigo-100">

                <div className="bg-white rounded-2xl p-6">

                  {/* Card Header */}

                  <div className="flex items-center justify-between mb-8">

                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                        <Laptop size={22} />
                      </div>

                      <div>

                        <p className="font-semibold">
                          Learn by Building
                        </p>

                        <p className="text-sm text-gray-500">
                          Practical learning
                        </p>

                      </div>

                    </div>


                    <div className="w-3 h-3 rounded-full bg-indigo-500" />

                  </div>


                  {/* Progress */}

                  <div className="space-y-5">

                    <ProgressItem
                      title="Web Development"
                      progress="85%"
                    />

                    <ProgressItem
                      title="JavaScript"
                      progress="70%"
                    />

                    <ProgressItem
                      title="React Development"
                      progress="60%"
                    />

                  </div>


                  {/* Bottom Card */}

                  <div className="mt-8 p-4 rounded-xl bg-indigo-50">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-lg bg-white text-indigo-500 flex items-center justify-center">
                        <Rocket size={19} />
                      </div>

                      <div>

                        <p className="text-sm font-semibold">
                          Keep building
                        </p>

                        <p className="text-xs text-gray-500 mt-0.5">
                          Every project takes you one step further.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= STATS ================= */}

      <section className="border-y border-gray-100">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-2 lg:grid-cols-4">

            <Stat
              value="50+"
              label="Courses"
            />

            <Stat
              value="5K+"
              label="Students"
            />

            <Stat
              value="20+"
              label="Expert Instructors"
            />

            <Stat
              value="100+"
              label="Projects"
            />

          </div>

        </div>

      </section>


      {/* ================= WHAT WE DO ================= */}

      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-2xl mx-auto text-center mb-14">

            <p className="text-sm font-semibold text-indigo-500 uppercase tracking-wider">
              What we do
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Learning designed for the real world
            </h2>

            <p className="text-gray-500 mt-4 leading-7">
              We focus on helping learners develop practical
              skills that they can actually use to build
              projects and grow their careers.
            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <FeatureCard
              icon={<BookOpen size={23} />}
              title="Structured Learning"
              description="Follow carefully organized courses that take you from fundamentals to advanced concepts."
            />

            <FeatureCard
              icon={<Code2 size={23} />}
              title="Build Real Projects"
              description="Turn what you learn into practical projects that strengthen your skills and portfolio."
            />

            <FeatureCard
              icon={<Target size={23} />}
              title="Career Focused"
              description="Learn skills that help you prepare for internships, placements, and real-world development."
            />

          </div>

        </div>

      </section>


      {/* ================= WHY CHOOSE US ================= */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* LEFT */}

            <div>

              <p className="text-sm font-semibold text-indigo-500 uppercase tracking-wider">
                Why choose us
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold mt-3">
                More than just watching videos
              </h2>

              <p className="text-gray-500 mt-5 leading-7">
                Learning technology should not be limited to
                memorizing concepts. Our approach combines
                knowledge with hands-on practice so you can
                actually understand how things work.
              </p>


              <div className="mt-8 space-y-5">

                <Benefit
                  title="Learn at your own pace"
                  description="Study whenever it fits your schedule."
                />

                <Benefit
                  title="Practical projects"
                  description="Apply concepts by building real applications."
                />

                <Benefit
                  title="Industry-relevant skills"
                  description="Focus on technologies and skills used in modern development."
                />

                <Benefit
                  title="Experienced educators"
                  description="Learn from structured and easy-to-understand lessons."
                />

              </div>

            </div>


            {/* RIGHT */}

            <div>

              <div className="bg-indigo-50 rounded-3xl p-6 sm:p-8">

                <div className="bg-white rounded-2xl border border-indigo-100 p-6 shadow-sm">

                  <div className="flex items-center gap-4 mb-7">

                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                      <Award size={24} />
                    </div>

                    <div>

                      <h3 className="font-semibold text-lg">
                        Your Learning Journey
                      </h3>

                      <p className="text-sm text-gray-500">
                        Learn → Practice → Build → Grow
                      </p>

                    </div>

                  </div>


                  <div className="space-y-5">

                    <JourneyStep
                      number="01"
                      title="Learn"
                      text="Understand the fundamentals."
                    />

                    <JourneyStep
                      number="02"
                      title="Practice"
                      text="Solve problems and strengthen concepts."
                    />

                    <JourneyStep
                      number="03"
                      title="Build"
                      text="Create projects using what you learned."
                    />

                    <JourneyStep
                      number="04"
                      title="Grow"
                      text="Use your skills to move toward your goals."
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= MISSION ================= */}

      <section className="py-20 bg-gray-50">

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="relative overflow-hidden bg-indigo-500 rounded-3xl px-6 sm:px-10 lg:px-16 py-14 text-center">

            {/* Decorative circles */}

            <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-400 rounded-full opacity-40" />

            <div className="absolute -bottom-24 -left-20 w-60 h-60 bg-indigo-600 rounded-full opacity-40" />


            <div className="relative">

              <div className="w-14 h-14 mx-auto rounded-2xl bg-white/15 text-white flex items-center justify-center mb-6">

                <Users size={27} />

              </div>


              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Our mission
              </h2>


              <p className="max-w-2xl mx-auto mt-5 text-indigo-50 leading-7">
                Our mission is to make quality technical
                education accessible to everyone and help
                learners turn knowledge into real skills,
                meaningful projects, and better career
                opportunities.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="border-t border-gray-100">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div>

              <h2 className="text-2xl sm:text-3xl font-bold">
                Ready to start learning?
              </h2>

              <p className="text-gray-500 mt-2">
                Explore our courses and start building your
                skills today.
              </p>

            </div>


            <button
              onClick={() => navigate("/courses")}
              className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
            >
              Browse Courses
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </section>

    </div>
  );
};


/* ============================= */
/* PROGRESS ITEM */
/* ============================= */

const ProgressItem = ({ title, progress }) => {

  return (
    <div>

      <div className="flex items-center justify-between mb-2">

        <span className="text-sm font-medium text-gray-700">
          {title}
        </span>

        <span className="text-xs text-gray-500">
          {progress}
        </span>

      </div>

      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">

        <div
          className="h-full bg-indigo-500 rounded-full"
          style={{ width: progress }}
        />

      </div>

    </div>
  );
};


/* ============================= */
/* STAT */
/* ============================= */

const Stat = ({ value, label }) => {

  return (
    <div className="py-8 text-center border-r last:border-r-0 border-gray-100">

      <p className="text-2xl sm:text-3xl font-bold text-gray-900">
        {value}
      </p>

      <p className="text-sm text-gray-500 mt-1">
        {label}
      </p>

    </div>
  );
};


/* ============================= */
/* FEATURE CARD */
/* ============================= */

const FeatureCard = ({
  icon,
  title,
  description,
}) => {

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-sm transition">

      <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-5">
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


/* ============================= */
/* BENEFIT */
/* ============================= */

const Benefit = ({
  title,
  description,
}) => {

  return (
    <div className="flex items-start gap-3">

      <CheckCircle2
        size={20}
        className="text-indigo-500 mt-0.5 shrink-0"
      />

      <div>

        <h4 className="font-semibold text-gray-900">
          {title}
        </h4>

        <p className="text-sm text-gray-500 mt-1">
          {description}
        </p>

      </div>

    </div>
  );
};


/* ============================= */
/* JOURNEY STEP */
/* ============================= */

const JourneyStep = ({
  number,
  title,
  text,
}) => {

  return (
    <div className="flex items-center gap-4">

      <div className="w-10 h-10 shrink-0 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center font-semibold text-sm">
        {number}
      </div>

      <div>

        <p className="font-semibold text-gray-900">
          {title}
        </p>

        <p className="text-sm text-gray-500 mt-0.5">
          {text}
        </p>

      </div>

    </div>
  );
};


export default About;