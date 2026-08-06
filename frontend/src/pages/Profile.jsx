
import React, { useState } from "react";
import axios from "axios";
import { serverURL } from "../App";

function Profile() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);

      if (photo) {
        formData.append("photo", photo);
      }

      const result = await axios.put(
        `${serverURL}/api/user/profile`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(result.data);
      alert("Profile updated successfully");

    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message || "Profile update failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">

        <h1 className="text-2xl font-bold text-center mb-6">
          Edit Profile
        </h1>

        {/* Profile Photo */}
        <div className="flex flex-col items-center mb-6">

          <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">

            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500">
                Photo
              </span>
            )}

          </div>

          <label className="mt-3 cursor-pointer text-blue-600 hover:text-blue-700">
            Change Photo

            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell something about yourself..."
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Update Profile
          </button>

        </form>

      </div>

    </div>
  );
}

export default Profile;

