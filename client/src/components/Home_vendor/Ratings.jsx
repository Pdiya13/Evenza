import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RatingCard from './RatingCard';

function Ratings() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avg, setAvg] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/vendor/getvendorRatings",
        {
          headers: { Authorization: token },
        }
      );

      if (res.data.success) {
        setRatings(res.data.data);
        setAvg(res.data.avgRating || 0);
      }

    } catch (err) {
      console.error("Error fetching ratings:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 font-poppins-custom text-white">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-700 pb-3">
        <h1 className="text-3xl font-bold">Vendor Ratings</h1>

        <div className="flex items-center gap-2 text-yellow-400 text-lg font-semibold">
          ⭐ Average Rating : {avg} / 5
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-gray-400">Loading ratings...</p>

      ) : ratings.length === 0 ? (

        /* EMPTY STATE */
        <div className="text-center text-gray-400 mt-20">
          <p className="text-xl mb-2">No ratings yet 😕</p>
          <p className="text-sm">Once users rate you, they will appear here</p>
        </div>

      ) : (

        /* GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {ratings.map((r) => (
            <RatingCard
              key={r._id}
              userName={r.userId?.name || "User"}
              comment={r.review}
              rating={r.rating}
              eventName={r.eventId?.ename || "Event"}
              date={new Date(r.createdAt).toLocaleDateString()}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Ratings;