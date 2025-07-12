import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../header";
import Footer from "../../footer";

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    // Load user info from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("Loaded user:", storedUser); // For debugging
    if (storedUser) setUser(storedUser);

    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3005/api/inquiries/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInquiries(response.data);
      } catch {
        setError("Failed to load inquiries.");
      }
    };

    fetchInquiries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3005/api/inquiries/",
        { message, name: user.name, email: user.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("");

      const response = await axios.get("http://localhost:3005/api/inquiries/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInquiries(response.data);
    } catch {
      setError("Failed to submit inquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full">
        <Header />
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center text-sm bg-white p-6 rounded shadow-md max-w-3xl mx-auto"
        >
          <p className="text-lg text-blue-600 font-medium pb-2">Contact Us</p>
          <h1 className="text-4xl font-semibold text-slate-700 pb-4">
            Get in touch with us
          </h1>
          <p className="text-sm text-gray-500 text-center pb-10">
            If you have any questions, send us a message and we’ll respond shortly.
          </p>

          {/* Name and Email - auto-filled */}
          <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
            <div className="w-full">
              <label className="text-black/70">Your Name</label>
              <input
                type="text"
                value={user.name}
                readOnly
                title="Auto-filled from your profile"
                className="h-12 p-2 mt-2 w-full border border-gray-300 rounded bg-gray-100 outline-none cursor-not-allowed"
              />
            </div>
            <div className="w-full">
              <label className="text-black/70">Your Email</label>
              <input
                type="email"
                value={user.email}
                readOnly
                title="Auto-filled from your profile"
                className="h-12 p-2 mt-2 w-full border border-gray-300 rounded bg-gray-100 outline-none cursor-not-allowed"
              />
            </div>
          </div>

          {/* Inquiry Textarea */}
          <div className="mt-6 w-[350px] md:w-[700px]">
            <label className="text-black/70">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full mt-2 p-2 h-40 border border-gray-300 rounded resize-none outline-none focus:border-indigo-300"
              placeholder="Type your inquiry here..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-5 bg-indigo-600 text-white h-12 w-56 px-4 rounded active:scale-95 transition"
          >
            {loading ? "Submitting..." : "Send Message"}
          </button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>

        {/* Inquiry History Table */}
        <div className="mt-12 max-w-5xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Your Inquiries and Admin Responses
          </h3>
          {inquiries.length === 0 ? (
            <p className="text-gray-600">No inquiries found.</p>
          ) : (
            <div className="overflow-x-auto bg-white shadow-md rounded">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="py-2 px-4 text-left">Message</th>
                    <th className="py-2 px-4 text-left">Admin Response</th>
                    <th className="py-2 px-4 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="border-t hover:bg-gray-100">
                      <td className="py-2 px-4">{inquiry.message}</td>
                      <td className="py-2 px-4">
                        {inquiry.response || "No response yet"}
                      </td>
                      <td className="py-2 px-4">
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-10">
        <Footer />
      </footer>
    </div>
  );
}
