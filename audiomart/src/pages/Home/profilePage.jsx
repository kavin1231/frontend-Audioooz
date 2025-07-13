import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Camera,
  KeyRound,
  X,
} from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import Header from "../../header";
import Footer from "../../footer";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imgVersion, setImgVersion] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:3005/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUser(response.data);
        setImageError(false);
      } catch (err) {
        setError("Failed to load profile data");
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

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
        "http://localhost:3005/api/users/upload-profile-picture",
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

  const handlePasswordChange = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All password fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3005/api/users/change-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess("Password changed successfully!");
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Password change failed");
    }
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setError("");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const renderProfileImage = () => {
    const imageUrl = getProfileImageUrl();
    return (
      <div className="relative group">
        <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center overflow-hidden">
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
          <Camera className="text-white opacity-0 group-hover:opacity-100 w-6 h-6" />
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
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Unable to load profile</div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {success && (
            <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              {success}
              <button
                onClick={() => setSuccess("")}
                className="absolute top-0 right-0 mt-2 mr-2 text-green-700 hover:text-green-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
              <button
                onClick={() => setError("")}
                className="absolute top-0 right-0 mt-2 mr-2 text-red-700 hover:text-red-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 h-32" />
            <div className="relative px-6 pb-6">
              <div className="absolute -top-16 left-6">{renderProfileImage()}</div>
              <div className="pt-20 flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-gray-600 capitalize mt-1">{user.role}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    to="/profile/edit"
                    className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Link>
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <KeyRound className="w-4 h-4 mr-2" />
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard title="Personal Information">
              <InfoRow label="Email" value={user.email} icon={<Mail />} />
              <InfoRow label="Phone" value={user.phone || "N/A"} icon={<Phone />} />
              <InfoRow label="Address" value={user.address || "N/A"} icon={<MapPin />} />
            </InfoCard>
            <InfoCard title="Account Information">
              <InfoRow label="Role" value={user.role} icon={<User />} />
              <InfoRow label="Status" value={user.isBlocked ? "Blocked" : "Active"} icon={<User />} />
              <InfoRow label="Email Verified" value={user.emailVerified ? "Yes" : "No"} icon={<Mail />} />
              <InfoRow label="Member Since" value={new Date(user.createdAt).toLocaleDateString()} icon={<User />} />
            </InfoCard>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 mb-3 last:mb-0">
    <div className="text-gray-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-gray-800 font-medium">{value}</p>
    </div>
  </div>
);

const InfoCard = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
    {children}
  </div>
);
