import React, { useState } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import { useAuth } from "../../context/authContext";
import { authService, changePassword } from "../../services/authService";
import { api } from "../../utils/api";
import PersonalInfo from "./PersonalInfo";
import BillingInfo from "./BillingInfo";
import Downloads from "./Downloads";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  // Change Password State
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [changePasswordError, setChangePasswordError] = useState("");
  const [changePasswordSuccess, setChangePasswordSuccess] = useState("");

  // Change Email State
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailChangeMessage, setEmailChangeMessage] = useState("");

  // Billing Info State (mock)
  const [billingInfo, setBillingInfo] = useState({
    cardHolder: "John Doe",
    cardNumber: "**** **** **** 1234",
    expiry: "12/26",
    address: "123 Main St, City, Country",
  });

  const handleBecomeAuthor = () => {
    navigate("/add-template"); // Navigate to add template page
  };

  // Change Password Handler
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setChangePasswordError("");
    setChangePasswordSuccess("");

    if (newPassword !== confirmNewPassword) {
      setChangePasswordError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setChangePasswordError("New password must be at least 6 characters.");
      return;
    }

    try {
      await authService.changePassword({
        userId: user?._id,
        currentPassword,
        newPassword,
      });
      setChangePasswordSuccess("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setTimeout(() => {
        setShowChangePassword(false);
        setChangePasswordSuccess("");
      }, 1500);
    } catch (err) {
      setChangePasswordError(
        err.response?.data?.message || "Failed to change password."
      );
    }
  };

  // Change Email Handlers
  const handleRequestEmailChange = async (e) => {
    e.preventDefault();
    setEmailChangeMessage("");
    try {
      await api.post("/auth/request-email-change", {
        userId: user._id,
        newEmail,
      });
      setShowOtpInput(true);
      setEmailChangeMessage("OTP sent to your new email.");
    } catch (err) {
      setEmailChangeMessage(
        err.response?.data?.message || "Failed to send OTP."
      );
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setEmailChangeMessage("");
    try {
      await api.post("/auth/verify-email-otp", {
        userId: user._id,
        newEmail,
        otp,
      });
      setEmailChangeMessage("Email changed successfully!");
      setShowChangeEmail(false);
      setShowOtpInput(false);
      setNewEmail("");
      setOtp("");
      // Optionally refresh user info here
    } catch (err) {
      setEmailChangeMessage(
        err.response?.data?.message || "OTP verification failed."
      );
    }
  };

  // Billing Info Handlers (mock, add your logic)
  const handleBillingInfoChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const handleBillingInfoSave = (e) => {
    e.preventDefault();
    // Add your save logic here
  };

  return (
    <Box>
      <AppBar position="static" color="default" elevation={0}>
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                fontWeight: 500,
                fontSize: "0.875rem",
                minWidth: "auto",
                px: 3,
              },
            }}
          >
            <Tab label="PERSONAL INFO" />
            <Tab label="BILLING" />
            <Tab label="DOWNLOADS" />
            <Tab label="BECOME AN AUTHOR" />
          </Tabs>
        </Container>
      </AppBar>

      {/* Content */}
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Personal Info Tab */}
        {activeTab === 0 && (
          <Paper sx={{ p: 4 }}>
            <PersonalInfo
              user={user}
              showChangeEmail={showChangeEmail}
              setShowChangeEmail={setShowChangeEmail}
              showOtpInput={showOtpInput}
              setShowOtpInput={setShowOtpInput}
              newEmail={newEmail}
              setNewEmail={setNewEmail}
              otp={otp}
              setOtp={setOtp}
              emailChangeMessage={emailChangeMessage}
              handleRequestEmailChange={handleRequestEmailChange}
              handleVerifyOtp={handleVerifyOtp}
              showChangePassword={showChangePassword}
              setShowChangePassword={setShowChangePassword}
              currentPassword={currentPassword}
              setCurrentPassword={setCurrentPassword}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmNewPassword={confirmNewPassword}
              setConfirmNewPassword={setConfirmNewPassword}
              changePasswordError={changePasswordError}
              changePasswordSuccess={changePasswordSuccess}
              setChangePasswordError={setChangePasswordError}
              setChangePasswordSuccess={setChangePasswordSuccess}
              handleChangePassword={handleChangePassword}
            />
          </Paper>
        )}

        {/* Billing Tab */}
        {activeTab === 1 && (
          <BillingInfo
            billingInfo={billingInfo}
            handleBillingInfoChange={handleBillingInfoChange}
            handleBillingInfoSave={handleBillingInfoSave}
          />
        )}

        {/* Downloads Tab */}
        {activeTab === 2 && <Downloads />}

        {activeTab === 3 && (
          <Paper sx={{ p: 6, textAlign: "center" }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Share your creativity with the world! Apply to become an author
              and start selling your own templates on our platform.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontWeight: "medium",
              }}
              onClick={handleBecomeAuthor}
            >
              Apply Now
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default Profile;
