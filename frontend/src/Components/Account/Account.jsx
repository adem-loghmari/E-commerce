import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (editMode === "personal" || editMode === "all") {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
    }

    if (editMode === "password" || editMode === "all") {
      if (!formData.currentPassword)
        newErrors.currentPassword = "Current password is required";
      if (!formData.newPassword) {
        newErrors.newPassword = "New password is required";
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword = "Password must be at least 6 characters";
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");

    if (!validate()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare the data to send based on what's being edited
      const payload = {};
      if (editMode === "personal" || editMode === "all") {
        if (formData.name) payload.name = formData.name;
        if (formData.email) payload.email = formData.email;
        if (formData.phone) payload.phone = formData.phone;
      }
      if (editMode === "password" || editMode === "all") {
        if (formData.newPassword) payload.password = formData.newPassword;
      }

      // Add the user ID from the token (handled by fetchUser middleware)
      const response = await fetch("/api/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Update failed");
      }

      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSelection = (mode) => {
    setEditMode(mode);
    setErrors({});
    setSuccessMessage("");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/getuser", {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const user = await response.json();
        setUserData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
        });

        // Pre-fill the form with user data
        setFormData((prev) => ({
          ...prev,
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.message.includes("authenticate")) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-24">
        <div className="max-w-md mx-auto">
          <div className="bg-white shadow rounded-lg overflow-hidden p-6 text-center">
            <p>Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }
  if (!editMode) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-24">
        <div className="max-w-md mx-auto">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
              <h1 className="text-2xl font-bold">Your Profile</h1>
              <p className="text-blue-100">
                Review your information before editing
              </p>
            </div>

            {/* Profile Information Display */}
            <div className="p-6 space-y-4">
              <div className="space-y-4 border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Personal Information
                </h3>
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-sm text-gray-900 mt-1">
                    {userData?.name || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Email Address
                  </p>
                  <p className="text-sm text-gray-900 mt-1">
                    {userData?.email || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Phone Number
                  </p>
                  <p className="text-sm text-gray-900 mt-1">
                    {userData?.phone || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Account Actions
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  What would you like to update?
                </p>

                <button
                  onClick={() => handleEditSelection("personal")}
                  className="w-full px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit Personal Information
                </button>

                <button
                  onClick={() => handleEditSelection("password")}
                  className="w-full px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-3"
                >
                  Change Password
                </button>

                <button
                  onClick={() => navigate("/profile")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-3"
                >
                  Back to Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <h1 className="text-2xl font-bold">Edit Profile</h1>
            <p className="text-blue-100">
              {editMode === "personal" && "Update your personal information"}
              {editMode === "password" && "Change your password"}
              {editMode === "all" && "Update your profile information"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {(editMode === "personal" || editMode === "all") && (
              <>
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </>
            )}

            {(editMode === "password" || editMode === "all") && (
              <div className="pt-4 border-t border-gray-200">
                {editMode === "all" && (
                  <h3 className="text-lg font-medium text-gray-900">
                    Change Password
                  </h3>
                )}

                {/* Current Password */}
                <div className={editMode === "all" ? "mt-4" : ""}>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${
                      errors.currentPassword ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your current password"
                  />
                  {errors.currentPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.currentPassword}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div className="mt-4">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${
                      errors.newPassword ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your new password"
                  />
                  {errors.newPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="mt-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
                    placeholder="Confirm your new password"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            )}

            {errors.submit && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{errors.submit}</p>
              </div>
            )}

            {successMessage && (
              <div className="rounded-md bg-green-50 p-4">
                <p className="text-sm text-green-700">{successMessage}</p>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => setEditMode(null)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back
              </button>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
