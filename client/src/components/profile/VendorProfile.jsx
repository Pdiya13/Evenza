import React, { useState } from "react";
import axios from "axios";

function VendorProfile({ profile, setProfile }) {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(profile);

  const token = localStorage.getItem("token");

  const updateProfile = async () => {
    try {
      const res = await axios.put(
        "http://localhost:8080/api/profile",
        form,
        { headers: { Authorization: token } }
      );

      setProfile(res.data.user);
      setEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">

      <div className="w-full max-w-xl p-8 rounded-2xl 
        bg-gradient-to-br from-[#0D1117] to-[#161B22] 
        border border-gray-700 shadow-[0_0_30px_rgba(0,150,255,0.15)]">

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full 
            bg-gradient-to-br from-blue-500 to-purple-500 
            flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            {profile.name?.charAt(0).toUpperCase()}
          </div>

          <h2 className="mt-3 text-xl font-semibold text-white">
            {profile.name}
          </h2>

          <p className="text-gray-400 text-sm">{profile.email}</p>
        </div>

        {/* Fields */}
        <div className="space-y-4">

          <div>
            <p className="text-gray-400 text-sm mb-1">Name</p>
            <input
              value={form.name}
              disabled={!edit}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-modern"
            />
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-1">Email</p>
            <input
              value={form.email}
              disabled
              className="input-modern opacity-60"
            />
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-1">Phone</p>
            <input
              value={form.phone}
              disabled={!edit}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="input-modern"
            />
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-1">Category</p>
            <input
              value={form.category}
              disabled={!edit}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="input-modern"
            />
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-1">Price</p>
            <input
              value={form.price}
              disabled={!edit}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="input-modern"
            />
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-1">Experience</p>
            <input
              value={form.experience}
              disabled={!edit}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
              className="input-modern"
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center">
          {edit ? (
            <button onClick={updateProfile} className="btn-glow">
              Save Changes
            </button>
          ) : (
            <button onClick={() => setEdit(true)} className="btn-glow-green">
              Edit Profile
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default VendorProfile;