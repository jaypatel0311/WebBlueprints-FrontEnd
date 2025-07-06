import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Container,
  Paper,
  Typography,
  Avatar,
  Fade,
  useTheme,
  useMediaQuery,
  Chip,
  Grid,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DownloadIcon from "@mui/icons-material/Download";
import CreateIcon from "@mui/icons-material/Create";
import { useAuth } from "../../context/authContext";
import { authService } from "../../services/authService";
import { api } from "../../utils/api";
import PersonalInfo from "./PersonalInfo";
import BillingInfo from "./BillingInfo";
import Downloads from "./Downloads";
import { useNavigate } from "react-router-dom";
import AuthorApplication from "./AuthorApplication";

const Profile = () => {
  const { user } = useAuth();
  console.log("user in Profile:", user);
  const userData = user.user;
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    cardHolder: "Jay Patel",
    cardNumber: "4242 4242 4242 4242",
    expiry: "12/26",
    cvv: "123",
    address: "123 Main St, City, CA 12345",
    zip: "12345",
    country: "USA",
  });

  const handleBecomeAuthor = () => {
    navigate("/add-template");
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
        userId: userData?._id,
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
        userId: userData._id,
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
        userId: userData._id,
        newEmail,
        otp,
      });
      setEmailChangeMessage("Email changed successfully!");
      setShowChangeEmail(false);
      setShowOtpInput(false);
      setNewEmail("");
      setOtp("");
    } catch (err) {
      setEmailChangeMessage(
        err.response?.data?.message || "OTP verification failed."
      );
    }
  };

  // Billing Info Handlers
  const handleBillingInfoChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const handleBillingInfoSave = (e) => {
    e.preventDefault();
    // Add your save logic here
  };

  // Tab configuration with icons
  const tabs = [
    { label: "Personal Info", icon: <PersonIcon /> },
    { label: "Billing", icon: <CreditCardIcon /> },
    { label: "Downloads", icon: <DownloadIcon /> },
    { label: "Become an Author", icon: <CreateIcon /> },
  ];

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pb: 8 }}>
      {/* Profile Header */}
      <Box
        sx={{
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          color: "white",
          py: 5,
          mb: -5,
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          <Grid container alignItems="center" spacing={3}>
            <Grid item>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "white",
                  color: "primary.main",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              >
                {userData?.username?.charAt(0)?.toUpperCase() || "U"}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {userData?.username || "User"}
              </Typography>
              <Typography variant="subtitle1">{userData?.email}</Typography>
            </Grid>
            <Grid item>
              <Chip
                label="Member"
                color="primary"
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  fontWeight: "medium",
                }}
              />
            </Grid>
          </Grid>
        </Container>

        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -40,
            right: "10%",
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
          }}
        />
      </Box>

      {/* Tabs Navigation */}
      <Container
        maxWidth="lg"
        sx={{
          mt: 5,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            mb: 4,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            variant={isMobile ? "scrollable" : "fullWidth"}
            scrollButtons="auto"
            sx={{
              bgcolor: "background.paper",
              "& .MuiTab-root": {
                minHeight: 64,
                fontWeight: 600,
                fontSize: "0.875rem",
                textTransform: isMobile ? "none" : "uppercase",
                transition: "all 0.2s ease",
                borderBottom: "3px solid transparent",
                "&.Mui-selected": {
                  color: "primary.main",
                  fontWeight: 700,
                },
              },
              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: "3px 3px 0 0",
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                icon={tab.icon}
                iconPosition="start"
              />
            ))}
          </Tabs>
        </Paper>

        {/* Content Container */}
        <Fade in={true} key={activeTab} timeout={300}>
          <Box>
            {/* Personal Info Tab */}
            {activeTab === 0 && (
              <Paper
                elevation={0}
                sx={{
                  overflow: "hidden",
                  borderRadius: 4,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <PersonalInfo
                  user={userData}
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

            {/* Become an Author Tab */}
            {activeTab === 3 && (
              <AuthorApplication handleBecomeAuthor={handleBecomeAuthor} />
            )}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Profile;
