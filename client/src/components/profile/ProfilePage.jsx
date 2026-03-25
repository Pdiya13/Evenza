import React, { useEffect, useState } from "react";
import axios from "axios";
import UserProfile from "./UserProfile";
import VendorProfile from "./VendorProfile";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/profile", {
        headers: { Authorization: token },
      });

      setProfile(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  if (!profile) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {profile.role === "user" ? (
        <UserProfile profile={profile} setProfile={setProfile} />
      ) : (
        <VendorProfile profile={profile} setProfile={setProfile} />
      )}
    </div>
  );
}

export default ProfilePage;