import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function RateVendor() {
  const { vendorId, eventId } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    if (!rating) return toast.error("Please select rating");

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/vendor/addRating",
        {
          vendorId,
          eventId,
          rating,
          review,
        },
        {
          headers: { Authorization: token },
        }
      );

      if (res.data.success) {
        toast.success("Rating submitted successfully ⭐");
        navigate(-1);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error submitting rating");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#161B22] text-white px-4">
      <div className="w-full max-w-md bg-[#0D1117] p-8 rounded-xl border border-[#30363d] shadow-[0_0_25px_rgba(59,130,246,0.2)]">

        {/* 🔙 BACK BUTTON */}
        <div className="flex items-center mb-4">
            <button
                onClick={() => navigate(-1)}
                className="px-3 py-1 rounded bg-[#1c1f26] border border-gray-600 hover:bg-[#2a2f3a] transition"
                >
                ← Back
            </button>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Rate Vendor
        </h2>

        {/* ⭐ STAR SELECT */}
        <div className="flex justify-center gap-2 mb-6 text-3xl z-10 relative">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={`transition transform ${
                    star <= rating ? "text-blue-500" : "text-gray-500"
                } hover:scale-125`}
                >
                ★
                </button>
            ))}
        </div>

        <p className="text-center text-gray-400 mb-4">
        Selected Rating: {rating}
        </p>

        {/* REVIEW */}
        <textarea
          placeholder="Write your experience..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full p-3 rounded bg-[#1c1f26] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          rows={4}
        />

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2 rounded font-semibold transition ${
            loading
              ? "bg-yellow-300 cursor-not-allowed"
              : "bg-blue-200 hover:bg-blue-300 text-black"
          }`}
        >
          {loading ? "Submitting..." : "Submit Rating"}
        </button>
      </div>
    </div>
  );
}

export default RateVendor;