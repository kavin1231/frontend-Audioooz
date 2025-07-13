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
        console.warn("No token found, redirecting...");
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

        console.log("API response:", response.data);
        setUser(response.data);
        setImageError(false); // Reset image error when user data loads
      } catch (err) {
        console.error("Fetch failed:", err);
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

  // Clear messages after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Debug function to check image issues
  useEffect(() => {
    if (user) {
      console.log("Debug Info:");
      console.log("User data:", user);
      console.log("Profile Picture URL:", user?.profilePicture);
      console.log("Generated URL:", getProfileImageUrl());
      console.log("Preview:", preview);
      console.log("First Name:", user?.firstName);
      console.log("Last Name:", user?.lastName);
    }
  }, [user]);

  // Improved profile image URL generation
  const getProfileImageUrl = () => {
    if (preview) return preview;

    if (user?.profilePicture && user.profilePicture.trim() !== "") {
      return `${user.profilePicture}?v=${imgVersion}`; // versioning to bust cache
    }

    const firstName = user?.firstName || "User";
    const lastName = user?.lastName || "";
    const initials = `${firstName}+${lastName}`.replace(/\s+/g, "+");

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

      const response = await axios.post(
        "http://localhost:3005/api/users/upload-profile-picture",
        { imageUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update the user profile picture
      setUser((prev) => ({
        ...prev,
        profilePicture: imageUrl,
      }));

      // Increment version to force image refresh
      setImgVersion((prev) => prev + 1);

      setPreview(null);
      URL.revokeObjectURL(filePreview);
      setSuccess("Profile picture updated successfully!");
      setImageError(false);
    } catch (err) {
      console.error("Upload failed:", err);
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
      console.error("Password change failed:", err);
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

  // Render profile image with better error handling
  const renderProfileImage = () => {
    const imageUrl = getProfileImageUrl();

    return (
      
      <div className="relative group">
        
        <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center overflow-hidden">
          {imageError ? (
            // Fallback to initials if image fails
            <div className="w-full h-full bg-green-600 flex items-center justify-center text-white text-2xl font-bold">
              {(user?.firstName?.[0] || "U").toUpperCase()}
              {(user?.lastName?.[0] || "").toUpperCase()}
            </div>
          ) : (
            <img
              src={imageUrl}
              alt={`${user?.firstName || "User"} ${
                user?.lastName || ""
              } Profile`}
              className="w-full h-full object-cover"
              key={`${user?.profilePicture || "default"}-${Date.now()}`} // ❌ Remove this line
              onLoad={() => {
                setImageLoading(false);
                setImageError(false);
                console.log("Profile image loaded successfully");
              }}
              onLoadStart={() => setImageLoading(true)}
              onError={(e) => {
                console.error("Failed to load profile image, using fallback");
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success/Error Messages */}
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
            <div className="absolute -top-16 left-6">
              {renderProfileImage()}
            </div>

            <div className="pt-20 flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.firstName || "User"} {user.lastName || ""}
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
            <InfoRow
              label="Email"
              value={user.email || "Not provided"}
              icon={<Mail className="w-5 h-5" />}
            />
            <InfoRow
              label="Phone"
              value={user.phone || "Not provided"}
              icon={<Phone className="w-5 h-5" />}
            />
            <InfoRow
              label="Address"
              value={user.address || "Not provided"}
              icon={<MapPin className="w-5 h-5" />}
            />
          </InfoCard>

          <InfoCard title="Account Information">
            <InfoRow
              label="Role"
              value={user.role || "User"}
              icon={<User className="w-5 h-5" />}
            />
            <InfoRow
              label="Account Status"
              value={user.isBlocked ? "Blocked" : "Active"}
              icon={<User className="w-5 h-5" />}
            />
            <InfoRow
              label="Email Verified"
              value={user.emailVerified ? "Yes" : "No"}
              icon={<Mail className="w-5 h-5" />}
            />
            <InfoRow
              label="Member Since"
              value={
                user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"
              }
              icon={<User className="w-5 h-5" />}
            />
          </InfoCard>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Change Password</h2>
              <button
                onClick={closePasswordModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handlePasswordChange}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Update Password
                </button>
                <button
                  onClick={closePasswordModal}
                  className="px-4 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 mb-3 last:mb-0">
    <div className="text-gray-500 flex-shrink-0">{icon}</div>
    <div className="flex-1">
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
