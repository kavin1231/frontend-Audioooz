import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3005";

export default function AdminInquiryResponsePage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseTexts, setResponseTexts] = useState({});
  const [submitting, setSubmitting] = useState({});

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/api/inquiries/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInquiries(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load inquiries.");
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  const handleResponseChange = (inquiryId, value) => {
    setResponseTexts((prev) => ({ ...prev, [inquiryId]: value }));
  };

  const handleSubmitResponse = async (inquiryId) => {
    const responseText = responseTexts[inquiryId]?.trim();
    if (!responseText) return;

    setSubmitting((prev) => ({ ...prev, [inquiryId]: true }));
    setError(null);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_BASE_URL}/api/inquiries/${inquiryId}/response`,
        { response: responseText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry.id === inquiryId ? { ...inquiry, response: responseText } : inquiry
        )
      );
      setResponseTexts((prev) => ({ ...prev, [inquiryId]: "" }));
    } catch {
      setError("Failed to submit response.");
    } finally {
      setSubmitting((prev) => ({ ...prev, [inquiryId]: false }));
    }
  };

  if (loading)
    return <div className="text-center py-8">Loading inquiries...</div>;

  if (error)
    return <div className="text-red-600 text-center py-8">{error}</div>;

  if (inquiries.length === 0)
    return <div className="text-center py-8">No inquiries found.</div>;

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          Farmer Inquiries Management
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-gray-700 border-b">
                  Farmer Message
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-700 border-b">
                  Admin Response
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-700 border-b">
                  Respond
                </th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => (
                <tr
                  key={inquiry.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 align-top">{inquiry.message}</td>
                  <td className="py-3 px-4 align-top text-gray-600 whitespace-pre-wrap">
                    {inquiry.response || (
                      <span className="italic text-gray-400">No response yet</span>
                    )}
                  </td>
                  <td className="py-3 px-4 align-top">
                    <textarea
                      rows={2}
                      value={responseTexts[inquiry.id] || ""}
                      onChange={(e) => handleResponseChange(inquiry.id, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mb-2 outline-none focus:border-indigo-400 resize-none"
                      placeholder="Type your response..."
                    />
                    <button
                      onClick={() => handleSubmitResponse(inquiry.id)}
                      disabled={submitting[inquiry.id]}
                      className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      {submitting[inquiry.id] ? "Submitting..." : "Submit"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}
