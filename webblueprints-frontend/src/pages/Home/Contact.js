// src/pages/Contact/Contact.js
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
  Support as SupportIcon,
  Chat as ChatIcon,
  Help as HelpIcon,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";

const Contact = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const supportCategories = [
    { value: "general", label: "General Inquiry" },
    { value: "technical", label: "Technical Support" },
    { value: "billing", label: "Billing & Payments" },
    { value: "templates", label: "Template Issues" },
    { value: "account", label: "Account Support" },
    { value: "feature", label: "Feature Request" },
    { value: "bug", label: "Bug Report" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace with your actual API endpoint
      //   await api.post("/contact", formData);

      setSubmitted(true);
      enqueueSnackbar(
        "Message sent successfully! We'll get back to you soon.",
        {
          variant: "success",
        }
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "general",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      enqueueSnackbar("Failed to send message. Please try again.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Contact Support
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          We're here to help! Get in touch with our support team.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Contact Form */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ mb: 3, fontWeight: "bold" }}
            >
              Send us a Message
            </Typography>

            {submitted && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Thank you for contacting us! We've received your message and
                will respond within 24 hours.
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    select
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    SelectProps={{
                      native: true,
                    }}
                    variant="outlined"
                  >
                    {supportCategories.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    multiline
                    rows={6}
                    variant="outlined"
                    placeholder="Please describe your issue or question in detail..."
                  />
                </Grid>
                <Grid size={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    startIcon={
                      loading ? <CircularProgress size={20} /> : <SendIcon />
                    }
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      background:
                        "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
                      },
                    }}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Contact Information Sidebar */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Contact Info Card */}
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold", mb: 3 }}
                >
                  Get in Touch
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <IconButton color="primary" sx={{ mr: 2 }}>
                    <EmailIcon />
                  </IconButton>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1">
                      support@webblueprints.com
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <IconButton color="primary" sx={{ mr: 2 }}>
                    <PhoneIcon />
                  </IconButton>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography variant="body1">+1 (555) 123-4567</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton color="primary" sx={{ mr: 2 }}>
                    <LocationIcon />
                  </IconButton>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Office
                    </Typography>
                    <Typography variant="body1">
                      123 Template Street
                      <br />
                      Design City, DC 12345
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Support Options Card */}
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold", mb: 2 }}
                >
                  Other Support Options
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<ChatIcon />}
                    sx={{ justifyContent: "flex-start", mb: 1 }}
                  >
                    Live Chat Support
                  </Button>
                  <Typography variant="caption" color="text.secondary">
                    Available 9 AM - 6 PM EST
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<HelpIcon />}
                    sx={{ justifyContent: "flex-start", mb: 1 }}
                    // onClick={() => window.open("/help", "_blank")}
                  >
                    Help Center
                  </Button>
                  <Typography variant="caption" color="text.secondary">
                    Browse our FAQ and guides
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" gutterBottom>
                  Response Time
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We typically respond within 24 hours during business days.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
