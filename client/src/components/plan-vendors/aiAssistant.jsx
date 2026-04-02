import React, { useState } from "react";
import axios from "axios";

function AIAssistant() {
  const [formData, setFormData] = useState({
    eventName: "",
    type: "",
    budget: "",
    location: "",
    details: "",
  });

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // call AI API
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

      {/* FORM */}
      <div className="grid gap-4 mb-6">

        <input
          type="text"
          name="eventName"
          placeholder="Event Name"
          value={formData.eventName}
          onChange={handleChange}
          className="p-2 bg-[#161B22] border border-gray-600 rounded"
        />

        <input
          type="text"
          name="type"
          placeholder="Event Type (Wedding, Party...)"
          value={formData.type}
          onChange={handleChange}
          className="p-2 bg-[#161B22] border border-gray-600 rounded"
        />

        <input
          type="number"
          name="budget"
          placeholder="Budget"
          value={formData.budget}
          onChange={handleChange}
          className="p-2 bg-[#161B22] border border-gray-600 rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="p-2 bg-[#161B22] border border-gray-600 rounded"
        />

        <textarea
          name="details"
          placeholder="Describe event details..."
          value={formData.details}
          onChange={handleChange}
          className="p-2 bg-[#161B22] border border-gray-600 rounded"
        />

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