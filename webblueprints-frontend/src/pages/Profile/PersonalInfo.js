import React, { useState, useContext } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Edit as EditIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useAuth } from "../../context/authContext";
import api from "../../utils/axiosInterceptor";

const PersonalInfo = () => {
  const { user, setUser } = useAuth();
  const UserData = user.user;

  // Email change states
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailChangeMessage, setEmailChangeMessage] = useState("");

  // Password change states
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordChangeMessage, setPasswordChangeMessage] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Email change handler
  const handleEmailChange = async (e) => {
    e.preventDefault();

    if (!newEmail || newEmail === UserData?.email) {
      setEmailChangeMessage("Please enter a different email address.");
      return;
    }

    try {
      setEmailLoading(true);
      setEmailChangeMessage("");

      const response = await api.put("/user/update-email", {
        email: newEmail,
      });

      if (response.data.success) {
        setEmailChangeMessage("Email updated successfully!");
        setShowChangeEmail(false);
        setNewEmail("");

        // Update user context with new email
        setUser((prev) => ({
          ...prev,
          email: newEmail,
        }));

        // Clear success message after 3 seconds
        setTimeout(() => {
          setEmailChangeMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Email change error:", error);
      setEmailChangeMessage(
        error.response?.data?.message ||
          "Failed to update email. Please try again."
      );
    } finally {
      setEmailLoading(false);
    }
  };

  // Password change handler
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordChangeMessage("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordChangeMessage("Password must be at least 6 characters long.");
      return;
    }

    try {
      setPasswordLoading(true);
      setPasswordChangeMessage("");

      const response = await api.put("/user/change-password", {
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        setPasswordChangeMessage("Password updated successfully!");
        setShowChangePassword(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        // Clear success message after 3 seconds
        setTimeout(() => {
          setPasswordChangeMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Password change error:", error);
      setPasswordChangeMessage(
        error.response?.data?.message ||
          "Failed to update password. Please try again."
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  console.log("user in PersonalInfo:", user);

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 4 }}>
      <Grid container spacing={4}>
        {/* Email Change Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <EmailIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Email Address
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {!showChangeEmail ? (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Your current email
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {UserData?.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => setShowChangeEmail(true)}
                    sx={{
                      mt: 2,
                      borderRadius: 6,
                    }}
                  >
                    Change Email
                  </Button>
                </Box>
              ) : (
                <Box component="form" onSubmit={handleEmailChange}>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Enter your new email address to update your account.
                  </Typography>

                  <TextField
                    label="New Email"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={emailLoading}
                      sx={{ flex: 1, borderRadius: 6 }}
                    >
                      {emailLoading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        "Update Email"
                      )}
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setShowChangeEmail(false);
                        setNewEmail("");
                      }}
                      sx={{ flex: 1, borderRadius: 6 }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              )}

              {/* Success/Error Messages */}
              {emailChangeMessage && (
                <Alert
                  severity={
                    emailChangeMessage.includes("successful")
                      ? "success"
                      : "error"
                  }
                  sx={{ mt: 2, borderRadius: 2 }}
                >
                  {emailChangeMessage}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Password Change Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LockIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Password
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {!showChangePassword ? (
                <Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Keep your account secure with a strong password.
                  </Typography>

                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => setShowChangePassword(true)}
                    sx={{
                      mt: 2,
                      borderRadius: 6,
                    }}
                  >
                    Change Password
                  </Button>
                </Box>
              ) : (
                <Box component="form" onSubmit={handlePasswordChange}>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Enter your current password and choose a new one.
                  </Typography>

                  <TextField
                    label="Current Password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            onClick={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
                            sx={{ minWidth: "auto", p: 1 }}
                          >
                            {showCurrentPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <TextField
                    label="New Password"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            sx={{ minWidth: "auto", p: 1 }}
                          >
                            {showNewPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <TextField
                    label="Confirm New Password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            sx={{ minWidth: "auto", p: 1 }}
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={passwordLoading}
                      sx={{ flex: 1, borderRadius: 6 }}
                    >
                      {passwordLoading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setShowChangePassword(false);
                        setCurrentPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                      }}
                      sx={{ flex: 1, borderRadius: 6 }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              )}

              {/* Success/Error Messages */}
              {passwordChangeMessage && (
                <Alert
                  severity={
                    passwordChangeMessage.includes("successful")
                      ? "success"
                      : "error"
                  }
                  sx={{ mt: 2, borderRadius: 2 }}
                >
                  {passwordChangeMessage}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfo;
