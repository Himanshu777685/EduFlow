import React, { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { serverURL } from "../App";
import { VscLoading } from "react-icons/vsc";
import { IoArrowBack } from "react-icons/io5";
import {
  FiEdit2,
  FiMail,
  FiBookOpen,
  FiUser,
  FiCamera,
  FiX
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";


const Profile = () => {

  const dispatch = useDispatch();

  const { userData } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  const [editProfile, setEditProfile] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(userData?.user?.name || "");
  const [description, setDescription] = useState(
    userData?.user?.description || ""
  );

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    // Check file size
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setSelectedImage(file);

    // Preview
    const preview = URL.createObjectURL(file);
    setPreviewImage(preview);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);

      if (selectedImage) {
        formData.append("photo", selectedImage);
      }

      const response = await axios.put(
        `${serverURL}/api/user/profile`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      if (response.data.success) {

        dispatch(
          setUserData({
            user: response.data.user
          })
        )

        setEditProfile(false);
        setEditAbout(false);
        toast.success("Profile updated")
      }


    } catch (error) {
      console.log("Profile update error:", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">

      <div className="mx-auto max-w-6xl">

        {/* PAGE HEADER */}
        <div className="mb-8 ">
          <div className="flex gap-3">
            <IoArrowBack className="h-10 w-5 stroke-width-[4] cursor-pointer" onClick={() => window.history.back()}/>
            <h1 className="text-3xl font-bold text-slate-800">
              Profile
            </h1>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Manage your profile and track your learning progress.
          </p>
        </div>


        {/* TOP SECTION */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">


          {/* PROFILE CARD */}
          <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

              {/* PROFILE IMAGE */}
              <div className="relative flex-shrink-0">

                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-slate-100 bg-slate-100">

                  {userData?.user?.avatar ? (
                    <img
                      src={userData.user.avatar}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FiUser
                      size={55}
                      className="text-slate-400"
                    />
                  )}

                </div>

              </div>


              {/* USER INFO */}
              <div className="min-w-0">

                <h2 className="truncate text-2xl font-bold text-slate-800">
                  {userData?.user?.name || "Your Name"}
                </h2>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <FiMail />
                  <span className="truncate">
                    {userData?.user?.email || "your@email.com"}
                  </span>
                </div>

                <div className="mt-3 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                  {userData?.user?.role === "educator" ? "Educator" : "Student"}
                </div>

              </div>

            </div>


            {/* EDIT BUTTON */}
            <button
              onClick={() => setEditProfile(true)}
              className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-100 hover:text-blue-600"
              title="Edit profile"
            >
              <FiEdit2 size={17} />
            </button>

          </div>


          {/* ABOUT CARD */}
          <div className="relative min-h-[220px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-xl font-semibold text-slate-800">
              About Me
            </h2>

            <div className="mt-5 pr-8">

              {userData?.user?.description ? (

                <p className="whitespace-pre-line leading-7 text-slate-600">
                  {userData?.user?.description}
                </p>

              ) : (

                <div className="flex h-28 items-center justify-center rounded-xl bg-slate-50 text-center text-sm text-slate-400">
                  <p>
                    No description added yet.
                    <br />
                    Tell others a little about yourself.
                  </p>
                </div>

              )}

            </div>


            {/* EDIT BUTTON */}
            <button
              onClick={() => setEditAbout(true)}
              className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-100 hover:text-blue-600"
              title="Edit about"
            >
              <FiEdit2 size={17} />
            </button>

          </div>

        </div>


        {/* LEARNING SECTION */}
        <div className="mt-8">

          <div className="mb-4 flex items-center justify-between">

            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                My Learning
              </h2>

              <p className="text-sm text-slate-500">
                Courses you're currently enrolled in.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              <FiBookOpen />
              {userData?.user?.enrolledCourses?.length} Courses
            </div>

          </div>


          {/* COURSE AREA */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            {userData?.user?.enrolledCourses?.length === 0 ? (

              <div className="flex min-h-[220px] flex-col items-center justify-center text-center">

                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                  <FiBookOpen
                    size={28}
                    className="text-slate-400"
                  />
                </div>

                <h3 className="text-lg font-semibold text-slate-700">
                  No courses yet
                </h3>

                <p className="mt-1 max-w-md text-sm text-slate-400">
                  You haven't enrolled in any courses yet.
                  Explore the available courses and start learning.
                </p>

              </div>

            ) : (

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                {userData?.user?.enrolledCourses?.map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                  />
                ))}

              </div>

            )}

          </div>

        </div>

      </div>


      {/* EDIT PROFILE MODAL */}
      {editProfile && (
        <EditModal
          title="Edit Profile"
          onClose={() => setEditProfile(false)}
        >

          <form onSubmit={handleSubmit} className="space-y-5">


            {/* PROFILE PHOTO */}
            <div className="flex flex-col items-center">

              <div className="relative">

                {/* Profile Image */}
                <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-slate-100 bg-slate-100">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : userData?.user?.avatar ? (
                    <img
                      src={userData?.user?.avatar}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                      <FiUser size={45} />
                    </div>
                  )}
                </div>

                {/* Camera Button */}
                <label
                  htmlFor="profile-photo"
                  className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-md transition hover:bg-blue-700"
                >
                  <FiCamera size={18} />
                </label>

                <input
                  id="profile-photo"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="hidden"
                  onChange={handleImageChange}
                />

              </div>

              <h3 className="mt-3 text-sm font-semibold text-slate-700">
                Profile Photo
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                JPG, PNG or WEBP • Max 5MB
              </p>

            </div>


            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>





            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl flex items-center justify-center bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
            >

              {loading ? (
                <>
                  <div className="flex gap-2">
                    <VscLoading className="h-5 w-5 animate-spin" />
                    Saving...</div>
                </>
              ) : (
                "Save Changes"
              )}
            </button>

          </form>

        </EditModal>
      )}


      {/* EDIT ABOUT MODAL */}
      {editAbout && (
        <EditModal
          title="Edit About Me"
          onClose={() => setEditAbout(false)}
        >

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                About Me
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
                placeholder="Tell us something about yourself..."
              />
            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl flex items-center justify-center bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <div className="flex gap-2">
                    <VscLoading className="h-5 w-5 animate-spin" />
                    Saving...</div>
                </>
              ) : (
                "Save Changes"
              )}
            </button>

          </form>

        </EditModal>
      )}

    </div>
  );
};



/* ============================
   COURSE CARD
============================ */

const CourseCard = ({ course }) => {

  const progress = course.progress || 0;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-md">

      {course.thumbnail && (
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-40 w-full object-cover"
        />
      )}

      <div className="p-5">

        <h3 className="font-semibold text-slate-800">
          {course.title}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {course.instructor || "Course"}
        </p>


        {/* PROGRESS */}
        <div className="mt-5">

          <div className="mb-2 flex justify-between text-xs">

            <span className="text-slate-500">
              Progress
            </span>

            <span className="font-medium text-blue-600">
              {progress}%
            </span>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">

            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${progress}%`
              }}
            />

          </div>

        </div>


        <button className="mt-5 text-sm font-medium text-blue-600 hover:text-blue-700">
          Continue Learning →
        </button>

      </div>

    </div>
  );
};



/* ============================
   MODAL
============================ */

const EditModal = ({
  title,
  children,
  onClose
}) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">

      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        >
          <FiX />
        </button>


        <h2 className="mb-6 text-2xl font-bold text-slate-800">
          {title}
        </h2>

        {children}

      </div>

    </div>
  );
};

export default Profile;