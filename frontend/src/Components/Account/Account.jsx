import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Typography,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import { Person, Lock, ArrowBack } from "@mui/icons-material";

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
      <Container maxWidth="sm" sx={{ py: 4, mt: 3 }}>
        <Card>
          <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "300px" }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography color="textSecondary">Loading your profile...</Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  if (!editMode) {
    return (
      <Container maxWidth="sm" sx={{ py: 4, mt: 3 }}>
        <Card>
          <CardHeader
            title="Your Profile"
            subheader="Review your information before editing"
            sx={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #2e1065 100%)",
              color: "white",
              "& .MuiCardHeader-subheader": { color: "rgba(255,255,255,0.7)" },
            }}
          />
          <CardContent sx={{ pt: 3 }}>
            <Stack spacing={3}>
              <Box sx={{ pb: 2, borderBottom: "1px solid #e0e0e0" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
                  <Person sx={{ mr: 1, fontSize: 20, verticalAlign: "middle" }} />
                  Personal Information
                </Typography>
                <Stack spacing={1.5}>
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Full Name
                    </Typography>
                    <Typography variant="body2">
                      {userData?.name || "Not provided"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Email Address
                    </Typography>
                    <Typography variant="body2">
                      {userData?.email || "Not provided"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Phone Number
                    </Typography>
                    <Typography variant="body2">
                      {userData?.phone || "Not provided"}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
                  Account Actions
                </Typography>
                <Typography variant="caption" color="textSecondary" sx={{ display: "block", mb: 2 }}>
                  What would you like to update?
                </Typography>
                <Stack spacing={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Person />}
                    onClick={() => handleEditSelection("personal")}
                    sx={{ textTransform: "none" }}
                  >
                    Edit Personal Information
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    startIcon={<Lock />}
                    onClick={() => handleEditSelection("password")}
                    sx={{ textTransform: "none" }}
                  >
                    Change Password
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => navigate("/profile")}
                    sx={{ textTransform: "none" }}
                  >
                    Back to Profile
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4, mt: 3 }}>
      <Card>
        <CardHeader
          title="Edit Profile"
          subheader={
            editMode === "personal"
              ? "Update your personal information"
              : editMode === "password"
              ? "Change your password"
              : "Update your profile information"
          }
          sx={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #2e1065 100%)",
            color: "white",
            "& .MuiCardHeader-subheader": { color: "rgba(255,255,255,0.7)" },
          }}
        />
        <CardContent sx={{ pt: 3 }}>
          <Stack component="form" onSubmit={handleSubmit} spacing={2.5}>
            {(editMode === "personal" || editMode === "all") && (
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  variant="outlined"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  variant="outlined"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  variant="outlined"
                  size="small"
                />
              </Stack>
            )}

            {(editMode === "password" || editMode === "all") && (
              <>
                {editMode === "all" && <Divider sx={{ my: 1 }} />}
                {editMode === "all" && (
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold", mt: 2 }}>
                    <Lock sx={{ mr: 1, fontSize: 18, verticalAlign: "middle" }} />
                    Change Password
                  </Typography>
                )}
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    error={!!errors.currentPassword}
                    helperText={errors.currentPassword}
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword}
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    variant="outlined"
                    size="small"
                  />
                </Stack>
              </>
            )}

            {errors.submit && <Alert severity="error">{errors.submit}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}

            <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", pt: 2 }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => setEditMode(null)}
                sx={{ textTransform: "none" }}
              >
                Back
              </Button>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/profile")}
                  sx={{ textTransform: "none" }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  sx={{ textTransform: "none" }}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
