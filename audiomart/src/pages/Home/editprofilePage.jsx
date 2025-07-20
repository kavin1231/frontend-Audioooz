import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSave,
  FaTimes,
  FaCamera,
} from "react-icons/fa";
import axios from "axios";
import mediaUpload from "../../utils/mediaUpload";
import Header from "../../header";
import Footer from "../../footer";

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Image upload states
  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imgVersion, setImgVersion] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `${BackendUrl}/api/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userData = response.data;
        setUser(userData); // Set user data for image display
        setFormData({
          firstname: userData.firstname || "",
          lastname: userData.lastname || "",
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.address || "",
        });
        setImageError(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load profile data");
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getProfileImageUrl = () => {
    if (preview) return preview;
    if (user?.profilePicture && user.profilePicture.trim() !== "") {
      return `${user.profilePicture}?v=${imgVersion}`;
    }
    const initials = `${user?.firstName || "U"}+${user?.lastName || ""}`;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      initials
    )}&background=10b981&color=fff&size=128&font-size=0.33`;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      setError("Please select a valid image file (JPEG, PNG, GIF)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    const filePreview = URL.createObjectURL(file);
    setPreview(filePreview);
    setUploading(true);
    setImageError(false);
    setError("");

    try {
      const imageUrl = await mediaUpload(file);
      const token = localStorage.getItem("token");
      await axios.post(
        `${BackendUrl}/api/users/upload-profile-picture`,
        { imageUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setUser((prev) => ({
        ...prev,
        profilePicture: imageUrl,
      }));
      setImgVersion((prev) => prev + 1);
      setPreview(null);
      URL.revokeObjectURL(filePreview);
      setSuccess("Profile picture updated successfully!");
      setImageError(false);
    } catch (err) {
      setError(
        typeof err === "string"
          ? err
          : err.response?.data?.error || "Image upload failed"
      );
      setPreview(null);
      URL.revokeObjectURL(filePreview);
    } finally {
      setUploading(false);
    }
  };

  const renderProfileImage = () => {
    const imageUrl = getProfileImageUrl();
    return (
      <div className="relative group mb-6">
        <div className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center overflow-hidden">
          {imageError ? (
            <div className="w-full h-full bg-green-600 flex items-center justify-center text-white text-2xl font-bold">
              {(user?.firstName?.[0] || "U").toUpperCase()}
              {(user?.lastName?.[0] || "").toUpperCase()}
            </div>
          ) : (
            <img
              src={imageUrl}
              alt="Profile"
              className="w-full h-full object-cover"
              onLoad={() => {
                setImageLoading(false);
                setImageError(false);
              }}
              onLoadStart={() => setImageLoading(true)}
              onError={() => {
                setImageLoading(false);
                setImageError(true);
              }}
            />
          )}
        </div>
        <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-full cursor-pointer transition-opacity">
          <FaCamera className="text-white opacity-0 group-hover:opacity-100" size={24} />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            disabled={uploading}
          />
        </label>
        {(uploading || imageLoading) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          </div>
        )}
        <p className="text-center text-sm text-gray-500 mt-2">
          Click on image to change profile picture
        </p>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");

    try {
      await axios.put(`${BackendUrl}/api/users/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setSuccess("Profile updated successfully!");
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex justify-center items-center">
          <div className="text-lg text-gray-600">Loading profile...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
          </div>

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="text-green-700">{success}</div>
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="text-red-700">{error}</div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              {/* Profile Image Upload Section */}
              {renderProfileImage()}

              {/* Form Section */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <FaUser className="inline mr-2" size={14} />
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                      placeholder="Enter your first name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <FaUser className="inline mr-2" size={14} />
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                      placeholder="Enter your last name"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <FaEnvelope className="inline mr-2" size={14} />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <FaPhone className="inline mr-2" size={14} />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <FaMapMarkerAlt className="inline mr-2" size={14} />
                      Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                      placeholder="Enter your full address"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    <FaTimes size={16} />
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    <FaSave size={16} />
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}