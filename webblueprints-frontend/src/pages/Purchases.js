// src/pages/Purchases/Purchases.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Divider,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Receipt as ReceiptIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";
import { useAuth } from "../context/authContext";
import api from "../utils/axiosInterceptor";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const Purchases = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadingTemplate, setDownloadingTemplate] = useState(null);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      setError("");

      // Updated API call to match backend endpoint
      const response = await api.get("/payments/orders"); // Changed from /purchases to /orders

      console.log("Orders response:", response.data);
      console.log("Orders", response.data || []);

      setOrders(response.data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.response?.data?.message || "Failed to load your purchases");
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = async (templateId) => {
    try {
      // Get template details
      const response = await api.get(`/templates/${templateId}`);
      const template = response.data;

      if (!template.downloadUrl) {
        throw new Error("Download URL not available for this template");
      }

      // For S3 URLs, we can download directly
      const fileName = `${template.title.replace(
        /[^a-zA-Z0-9]/g,
        "-"
      )}-template.zip`;

      // Method 1: Direct download
      const link = document.createElement("a");
      link.href = template.downloadUrl;
      link.download = fileName;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success message (optional)
      // You could add a toast notification here
      console.log(`Downloading ${template.title}...`);
    } catch (error) {
      console.error("Download failed:", error);

      // Better error handling
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to download template. Please try again.";

      alert(errorMessage);
    } finally {
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "succeeded":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress size={60} />
          <Typography sx={{ ml: 2 }}>Loading your purchases...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", mb: 4 }}>
        My Purchases
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {orders.length === 0 ? (
        <Paper sx={{ p: 6, textAlign: "center" }}>
          <ReceiptIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            No purchases yet
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            You haven't made any purchases yet. Browse our templates to get
            started.
          </Typography>
          <Button
            variant="contained"
            href="/templates"
            sx={{
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              px: 4,
              py: 1.5,
            }}
          >
            Browse Templates
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid size={12} key={order._id || order.id}>
              <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  {/* Order Header */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 3,
                    }}
                  >
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        Order #
                        {order.paymentIntentId?.slice(-8) ||
                          order.paymentIntentId?.slice(-8) ||
                          "N/A"}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mt: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <CalendarIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {formatDate(order.createdAt || order.purchaseDate)}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <MoneyIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {order.totalAmount || 0}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Chip
                      label={order.status || "completed"}
                      color={getStatusColor(order.status)}
                      variant="contained"
                    />
                  </Box>

                  <Divider sx={{ mb: 3 }} />

                  <Grid container spacing={2}>
                    {order?.templates && order.templates.length > 0 ? (
                      order.templates.map((templateItem, index) => (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          key={templateItem?.templateId?._id || index}
                        >
                          <Card variant="outlined" sx={{ borderRadius: 2 }}>
                            {templateItem?.templateId?.previewImageUrl && (
                              <CardMedia
                                component="img"
                                height="140"
                                image={
                                  templateItem?.templateId?.previewImageUrl
                                }
                                alt={templateItem?.templateId?.title}
                                sx={{ objectFit: "cover" }}
                              />
                            )}
                            <CardContent sx={{ p: 2 }}>
                              <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                noWrap
                              >
                                {templateItem?.templateId?.title ||
                                  "Unknown Template"}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                              >
                                {templateItem?.templateId?.category ||
                                  "General"}
                              </Typography>

                              {/* Tags */}
                              {templateItem?.templateId?.tags &&
                                templateItem?.templateId?.tags.length > 0 && (
                                  <Box sx={{ mb: 1 }}>
                                    {templateItem?.templateId?.tags
                                      .slice(0, 2)
                                      .map((tag) => (
                                        <Chip
                                          key={tag}
                                          label={tag}
                                          size="small"
                                          sx={{
                                            mr: 0.5,
                                            mb: 0.5,
                                            fontSize: "0.7rem",
                                          }}
                                        />
                                      ))}
                                  </Box>
                                )}

                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  mt: 2,
                                }}
                              >
                                <Typography variant="h6" color="primary">
                                  $
                                  {(
                                    templateItem?.templateId?.price || 0
                                  ).toFixed(2)}
                                </Typography>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                  {/* Live Demo Button */}
                                  {templateItem?.templateId?.demoUrl && (
                                    <Tooltip title="View Live Demo">
                                      <IconButton
                                        color="secondary"
                                        onClick={() =>
                                          window.open(
                                            templateItem?.templateId?.demoUrl,
                                            "_blank"
                                          )
                                        }
                                        sx={{
                                          bgcolor: "rgba(156, 39, 176, 0.1)",
                                          "&:hover": {
                                            bgcolor: "rgba(156, 39, 176, 0.2)",
                                          },
                                        }}
                                      >
                                        <OpenInNewIcon />
                                      </IconButton>
                                    </Tooltip>
                                  )}

                                  {/* Download Button */}
                                  <Tooltip title="Download Template">
                                    <IconButton
                                      color="primary"
                                      onClick={() =>
                                        downloadTemplate(
                                          templateItem?.templateId?._id
                                        )
                                      }
                                      disabled={
                                        downloadingTemplate ===
                                        templateItem?.templateId?._id
                                      }
                                      sx={{
                                        bgcolor: "rgba(33, 150, 243, 0.1)",
                                        "&:hover": {
                                          bgcolor: "rgba(33, 150, 243, 0.2)",
                                        },
                                      }}
                                    >
                                      {downloadingTemplate ===
                                      templateItem?.templateId?._id ? (
                                        <CircularProgress size={20} />
                                      ) : (
                                        <DownloadIcon />
                                      )}
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))
                    ) : (
                      <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">
                          No templates found for this order
                        </Typography>
                      </Grid>
                    )}
                  </Grid>

                  {/* Order Summary */}
                  <Box
                    sx={{
                      mt: 3,
                      pt: 2,
                      borderTop: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Payment ID: {order.paymentIntentId || "N/A"}
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        Total: ${order.totalAmount || 0}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Purchases;
