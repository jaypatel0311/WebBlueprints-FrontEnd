import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Alert,
  Paper,
  Grid,
  Divider,
  Avatar,
  IconButton,
  InputAdornment,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PersonalInfo = ({
  user,
  showChangeEmail,
  setShowChangeEmail,
  showOtpInput,
  setShowOtpInput,
  newEmail,
  setNewEmail,
  otp,
  setOtp,
  emailChangeMessage,
  handleRequestEmailChange,
  handleVerifyOtp,
  showChangePassword,
  setShowChangePassword,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmNewPassword,
  setConfirmNewPassword,
  setChangePasswordError,
  setChangePasswordSuccess,
  changePasswordError,
  changePasswordSuccess,
  handleChangePassword,
}) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPasswordField, setShowNewPasswordField] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 2 }}>
      {/* Header */}
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          mb: 4,
          position: "relative",
          "&:after": {
            content: '""',
            position: "absolute",
            left: 0,
            bottom: -8,
            width: 60,
            height: 4,
            borderRadius: 2,
            bgcolor: "primary.main",
          },
        }}
      >
        Personal Information
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Overview Card */}
        <Grid item size={12}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
              mb: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "primary.main",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                }}
              >
                {user?.username?.charAt(0)?.toUpperCase() || "U"}
              </Avatar>

              <Box>
                <Typography variant="h5" fontWeight="bold" mb={0.5}>
                  {user?.username || "User"}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EmailIcon fontSize="small" color="action" />
                  <Typography color="text.secondary">{user?.email}</Typography>
                  <Chip
                    size="small"
                    icon={<CheckCircleIcon fontSize="small" />}
                    label="Verified"
                    color="success"
                    variant="outlined"
                    sx={{ ml: 1 }}
                  />
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

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
                        {user?.email}
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
                <Box component="form" onSubmit={handleRequestEmailChange}>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Enter your new email address below. We'll send a
                    verification code to confirm.
                  </Typography>

                  <TextField
                    label="New Email"
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
                      sx={{ flex: 1, borderRadius: 6 }}
                    >
                      Send OTP
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setShowChangeEmail(false)}
                      sx={{ flex: 1, borderRadius: 6 }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              )}

              {showOtpInput && (
                <Box
                  component="form"
                  onSubmit={handleVerifyOtp}
                  sx={{
                    mt: 3,
                    p: 2,
                    bgcolor: "rgba(33, 150, 243, 0.05)",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Verify your email
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Enter the verification code sent to {newEmail}
                  </Typography>

                  <TextField
                    label="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ borderRadius: 6 }}
                  >
                    Verify OTP
                  </Button>
                </Box>
              )}

              {emailChangeMessage && (
                <Alert severity="info" sx={{ mt: 2, borderRadius: 2 }}>
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
                    To protect your account, make sure to use a strong, unique
                    password.
                  </Typography>

                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => setShowChangePassword(true)}
                    sx={{
                      mt: 1,
                      borderRadius: 6,
                    }}
                  >
                    Change Password
                  </Button>
                </Box>
              ) : (
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                  onSubmit={handleChangePassword}
                >
                  <TextField
                    label="Current Password"
                    type={showCurrentPassword ? "text" : "password"}
                    required
                    fullWidth
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
                          >
                            {showCurrentPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />

                  <TextField
                    label="New Password"
                    type={showNewPasswordField ? "text" : "password"}
                    required
                    fullWidth
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowNewPasswordField(!showNewPasswordField)
                            }
                          >
                            {showNewPasswordField ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />

                  <TextField
                    label="Confirm New Password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    fullWidth
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    error={
                      newPassword !== confirmNewPassword &&
                      confirmNewPassword !== ""
                    }
                    helperText={
                      newPassword !== confirmNewPassword &&
                      confirmNewPassword !== ""
                        ? "Passwords don't match"
                        : ""
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />

                  {changePasswordError && (
                    <Alert severity="error" sx={{ borderRadius: 2 }}>
                      {changePasswordError}
                    </Alert>
                  )}

                  {changePasswordSuccess && (
                    <Alert severity="success" sx={{ borderRadius: 2 }}>
                      {changePasswordSuccess}
                    </Alert>
                  )}

                  <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ flex: 1, borderRadius: 6 }}
                    >
                      Update Password
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setShowChangePassword(false);
                        setChangePasswordError("");
                        setChangePasswordSuccess("");
                      }}
                      sx={{ flex: 1, borderRadius: 6 }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfo;
