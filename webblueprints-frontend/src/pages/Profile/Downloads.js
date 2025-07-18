import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Divider,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  Skeleton,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import api from "../../utils/axiosInterceptor";

const Downloads = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  // State management
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      setError("");

      // Updated API call to match backend endpoint
      const response = await api.get("/payments/orders"); // Changed from /purchases to /orders

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
      setDownloadingId(templateId);

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
      setDownloadingId(null);
    }
  };

  const formatPurchaseDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "success":
        return "success";
      case "pending":
        return "warning";
      case "failed":
      case "cancelled":
        return "error";
      default:
        return "primary";
    }
  };

  // Extract templates from orders
  const purchasedTemplates = orders.flatMap(
    (order) =>
      order.templates?.map((template) => ({
        ...template, // template object with _id, title, description, etc.
        purchaseDate: order.createdAt, // when the order was created
        orderId: order._id, // order ID for reference
        amount: template.price || 0, // template price
      })) || []
  );

  console.log(purchasedTemplates);

  const downloadSteps = [
    {
      icon: (
        <ShoppingCartIcon
          fontSize="large"
          sx={{ color: theme.palette.primary.main }}
        />
      ),
      title: "Purchase Templates",
      description: "Buy templates that match your project needs",
    },
    {
      icon: (
        <FileDownloadDoneIcon
          fontSize="large"
          sx={{ color: theme.palette.primary.main }}
        />
      ),
      title: "Access Downloads",
      description: "Visit this page to find all your purchased templates",
    },
    {
      icon: (
        <FolderSpecialIcon
          fontSize="large"
          sx={{ color: theme.palette.primary.main }}
        />
      ),
      title: "Use Templates",
      description: "Customize and implement templates in your projects",
    },
  ];

  return (
    <Box sx={{ pb: 3 }}>
      <Grid container spacing={3}>
        {/* Main content */}
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid",
              borderColor: "divider",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Background decorations */}
            <Box
              sx={{
                position: "absolute",
                right: -30,
                top: -30,
                width: 150,
                height: 150,
                borderRadius: "50%",
                background: "rgba(33, 150, 243, 0.05)",
                zIndex: 0,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                left: -20,
                bottom: -20,
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "rgba(33, 150, 243, 0.05)",
                zIndex: 0,
              }}
            />

            {/* Download icon and title */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Box
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(33, 150, 243, 0.1)",
                  mb: 3,
                }}
              >
                <CloudDownloadIcon
                  sx={{
                    fontSize: 48,
                    color: theme.palette.primary.main,
                  }}
                />
              </Box>

              <Typography
                variant="h4"
                fontWeight="bold"
                textAlign="center"
                sx={{
                  mb: 1,
                  background: "linear-gradient(90deg, #2196F3, #21CBF3)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Your Downloads
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
                sx={{ mb: 4, maxWidth: 500, mx: "auto" }}
              >
                {purchasedTemplates.length > 0
                  ? `You have ${purchasedTemplates.length} template${
                      purchasedTemplates.length !== 1 ? "s" : ""
                    } available for download`
                  : "Your purchased templates will appear here for easy access and downloads. You can re-download your templates anytime you need them."}
              </Typography>

              {/* Error handling */}
              {error && (
                <Alert severity="error" sx={{ mb: 3, width: "100%" }}>
                  {error}
                  <Button onClick={fetchUserOrders} size="small" sx={{ ml: 2 }}>
                    Try Again
                  </Button>
                </Alert>
              )}

              {/* Loading state */}
              {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                  <CircularProgress />
                </Box>
              )}

              {/* Browse Templates Button */}
              <Box
                sx={{
                  mb: 3,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<SearchIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: "medium",
                    borderRadius: 6,
                    background:
                      "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    boxShadow: "0 4px 10px rgba(33, 150, 243, 0.3)",
                    "&:hover": {
                      boxShadow: "0 6px 15px rgba(33, 150, 243, 0.4)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                  onClick={() => navigate("/templates")}
                >
                  Browse Templates
                </Button>
              </Box>

              {/* Purchased Templates Grid */}
              {!loading && purchasedTemplates.length > 0 && (
                <>
                  <Divider sx={{ width: "100%", mb: 4 }} />

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    textAlign="center"
                    gutterBottom
                    sx={{ mb: 3 }}
                  >
                    Your Purchased Templates
                  </Typography>

                  <Grid container spacing={3} sx={{ width: "100%", mb: 4 }}>
                    {purchasedTemplates.map((template) => (
                      <Grid
                        size={{
                          xs: 12,
                          sm: 6,
                          md: 4,
                        }}
                        key={`${template?.templateId._id}-${template?.templateId.orderId}`}
                      >
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-4px)",
                              boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                            },
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="200"
                            image={
                              template?.templateId.previewImageUrl ||
                              "/placeholder.jpg"
                            }
                            alt={template?.templateId.title}
                            sx={{ objectFit: "cover" }}
                          />
                          <CardContent
                            sx={{
                              flexGrow: 1,
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Typography variant="h6" gutterBottom noWrap>
                              {template?.templateId.title ||
                                "Untitled Template"}
                            </Typography>

                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                mb: 2,
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                overflow: "hidden",
                                flexGrow: 1,
                              }}
                            >
                              {template?.templateId.description ||
                                "No description available"}
                            </Typography>

                            <Box sx={{ mb: 2 }}>
                              <Chip
                                label={
                                  template?.templateId.category ||
                                  "Uncategorized"
                                }
                                size="small"
                                color="primary"
                                variant="outlined"
                                sx={{ mb: 1 }}
                              />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                display="block"
                              >
                                Purchased{" "}
                                {template?.purchaseDate
                                  ? formatPurchaseDate(template?.purchaseDate)
                                  : "Unknown date"}
                              </Typography>
                            </Box>

                            <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
                              <Button
                                variant="contained"
                                startIcon={
                                  downloadingId === template?.templateId._id ? (
                                    <CircularProgress
                                      size={16}
                                      color="inherit"
                                    />
                                  ) : (
                                    <DownloadIcon />
                                  )
                                }
                                onClick={() =>
                                  downloadTemplate(template?.templateId._id)
                                }
                                disabled={
                                  downloadingId === template?.templateId._id
                                }
                                sx={{ flex: 1, borderRadius: 2 }}
                              >
                                {downloadingId === template?.templateId._id
                                  ? "Downloading..."
                                  : "Download"}
                              </Button>

                              <Tooltip title="View Template Details">
                                <IconButton
                                  onClick={() =>
                                    navigate(
                                      `/templates/${template?.templateId._id}`
                                    )
                                  }
                                  color="primary"
                                  sx={{
                                    border: "1px solid",
                                    borderColor: "primary.main",
                                  }}
                                >
                                  <VisibilityIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}

              {/* Orders Section (if you want to show detailed order information) */}
              {!loading && orders.length > 0 && (
                <>
                  <Divider sx={{ width: "100%", mb: 4 }} />

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    textAlign="center"
                    gutterBottom
                    sx={{ mb: 3 }}
                  >
                    Order History
                  </Typography>

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
                                    order._id?.slice(-8) ||
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
                                    <CalendarTodayIcon
                                      fontSize="small"
                                      color="action"
                                    />
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {formatPurchaseDate(
                                        order.createdAt || order.purchaseDate
                                      )}
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 0.5,
                                    }}
                                  >
                                    <AttachMoneyIcon
                                      fontSize="small"
                                      color="action"
                                    />
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      ${order.totalAmount || 0}
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

                            {/* Order Items */}
                            <Grid container spacing={2}>
                              {order.items?.map((item, index) => (
                                <Grid
                                  size={{ xs: 12, sm: 6, md: 4 }}
                                  key={index}
                                >
                                  <Card
                                    variant="outlined"
                                    sx={{ borderRadius: 2 }}
                                  >
                                    {item.template?.previewImageUrl && (
                                      <CardMedia
                                        component="img"
                                        height="140"
                                        image={
                                          item.template?.templateId
                                            .previewImageUrl
                                        }
                                        alt={item.template?.templateId.title}
                                        sx={{ objectFit: "cover" }}
                                      />
                                    )}
                                    <CardContent sx={{ p: 2 }}>
                                      <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                        noWrap
                                      >
                                        {item.template?.title ||
                                          "Unknown Template"}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 1 }}
                                      >
                                        ${item.price || 0}
                                      </Typography>
                                      <Box sx={{ display: "flex", gap: 1 }}>
                                        <Tooltip title="Download Template">
                                          <IconButton
                                            size="small"
                                            onClick={() =>
                                              downloadTemplate(
                                                item.template?.templateId._id
                                              )
                                            }
                                            disabled={
                                              downloadingId ===
                                              item.template?.templateId._id
                                            }
                                            color="primary"
                                          >
                                            {downloadingId ===
                                            item.template?.templateId._id ? (
                                              <CircularProgress size={16} />
                                            ) : (
                                              <DownloadIcon />
                                            )}
                                          </IconButton>
                                        </Tooltip>
                                        <Tooltip title="View Details">
                                          <IconButton
                                            size="small"
                                            onClick={() =>
                                              navigate(
                                                `/templates/${item.template?.templateId._id}`
                                              )
                                            }
                                            color="primary"
                                          >
                                            <OpenInNewIcon />
                                          </IconButton>
                                        </Tooltip>
                                      </Box>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              ))}
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}

              <Divider sx={{ width: "100%", mb: 5 }} />

              {/* How downloads work section */}
              <Typography
                variant="h6"
                fontWeight="bold"
                textAlign="center"
                gutterBottom
              >
                How Templates Downloads Work
              </Typography>

              <Grid
                container
                spacing={3}
                sx={{ mt: 1, maxWidth: 900, mx: "auto" }}
              >
                {downloadSteps.map((step, index) => (
                  <Grid size={{ xs: 12, md: 4 }} key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        height: "100%",
                        p: 2,
                        borderRadius: 2,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          bgcolor: "rgba(33, 150, 243, 0.05)",
                        },
                      }}
                    >
                      {step.icon}
                      <Typography
                        variant="h6"
                        fontWeight="medium"
                        mt={2}
                        mb={1}
                      >
                        {step.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {step.description}
                      </Typography>

                      {index < downloadSteps.length - 1 && isMobile && (
                        <Box
                          sx={{
                            my: 2,
                            color: "primary.main",
                            fontWeight: "bold",
                          }}
                        >
                          ↓
                        </Box>
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Downloads;
