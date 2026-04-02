import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AIAssistant() {
  const { eventId } = useParams();

  const [formData, setFormData] = useState({
    eventName: "",
    type: "",
    location: "",
    details: "",
  });

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH EVENT DATA
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/event/${eventId}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        const event = res.data.event;

        setFormData({
          eventName: event.ename ?? "",
          type: event.type ?? "",
          location: event.location ?? "",
          details: "",
        });
      } catch (err) {
        console.log("Error fetching event:", err);
      }
    };

    if (eventId) fetchEvent();
  }, [eventId]);

  // 🔥 ONLY DETAILS CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, details: e.target.value });
  };

  // 🔥 AI CALL
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setResponse("");

      const res = await axios.post(
        "http://localhost:8080/api/ai/suggestions",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setResponse(res.data.data);
    } catch (err) {
      console.log(err);
      setResponse("❌ Failed to get AI suggestions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#0D1117] text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">🤖 AI Event Assistant</h1>

      <div className="grid gap-4 mb-6">

        {/* EVENT NAME */}
        <div>
          <label className="text-sm text-gray-400">Event Name</label>
          <input
            value={formData.eventName}
            readOnly
            className="w-full p-2 bg-[#161B22] border border-gray-600 rounded opacity-70 cursor-not-allowed"
          />
        </div>

        {/* TYPE */}
        <div>
          <label className="text-sm text-gray-400">Event Type</label>
          <input
            value={formData.type}
            readOnly
            className="w-full p-2 bg-[#161B22] border border-gray-600 rounded opacity-70 cursor-not-allowed"
          />
        </div>

        {/* LOCATION */}
        <div>
          <label className="text-sm text-gray-400">Location</label>
          <input
            value={formData.location}
            readOnly
            className="w-full p-2 bg-[#161B22] border border-gray-600 rounded opacity-70 cursor-not-allowed"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm text-gray-400">Your Requirement</label>
          <textarea
            name="details"
            placeholder="Describe what you want (decor, vibe, theme...)"
            value={formData.details}
            onChange={handleChange}
            className="w-full p-2 bg-[#161B22] border border-gray-600 rounded"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 px-4 py-2 rounded"
        >
          {loading ? "Generating..." : "Get AI Suggestions"}
        </button>
      </div>

      {/* RESPONSE */}
      {response && (
        <div className="bg-[#161B22] p-4 rounded border border-gray-700 whitespace-pre-line">
          {response}
        </div>
      )}
    </div>
  );
}

export default AIAssistant;