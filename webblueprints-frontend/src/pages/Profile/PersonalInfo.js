import React from "react";
import { Box, Typography, Button, TextField, Alert } from "@mui/material";

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
}) => (
  <Box>
    <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
      Personal Information
    </Typography>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
      <Box>
        <Typography variant="body1">
          <Typography component="span" fontWeight="bold">
            Username:
          </Typography>{" "}
          {user?.username}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1">
          <Typography component="span" fontWeight="bold">
            Email:
          </Typography>{" "}
          {user?.email}
        </Typography>
      </Box>
    </Box>

    {/* Change Email Section */}
    {!showChangeEmail ? (
      <Button
        variant="outlined"
        sx={{ mt: 2, mr: 2 }}
        onClick={() => setShowChangeEmail(true)}
      >
        Change Email
      </Button>
    ) : (
      <Box component="form" onSubmit={handleRequestEmailChange} sx={{ mt: 2 }}>
        <TextField
          label="New Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">
          Send OTP
        </Button>
        <Button sx={{ ml: 2 }} onClick={() => setShowChangeEmail(false)}>
          Cancel
        </Button>
      </Box>
    )}
    {showOtpInput && (
      <Box component="form" onSubmit={handleVerifyOtp} sx={{ mt: 2 }}>
        <TextField
          label="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">
          Verify OTP
        </Button>
      </Box>
    )}
    {emailChangeMessage && (
      <Alert severity="info" sx={{ mt: 2 }}>
        {emailChangeMessage}
      </Alert>
    )}

    {/* Change Password Section */}
    {!showChangePassword ? (
      <Button
        variant="outlined"
        sx={{ mt: 2, ml: 2 }}
        onClick={() => setShowChangePassword(true)}
      >
        Change Password
      </Button>
    ) : (
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 400,
          mt: 2,
        }}
        onSubmit={handleChangePassword}
      >
        {changePasswordError && (
          <Alert severity="error">{changePasswordError}</Alert>
        )}
        {changePasswordSuccess && (
          <Alert severity="success">{changePasswordSuccess}</Alert>
        )}
        <TextField
          label="Current Password"
          type="password"
          required
          fullWidth
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <TextField
          label="New Password"
          type="password"
          required
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          required
          fullWidth
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setShowChangePassword(false);
              setChangePasswordError("");
              setChangePasswordSuccess("");
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    )}
  </Box>
);

export default PersonalInfo;
