// src/pages/TemplateDetails/TemplateDetails.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Chip,
  Avatar,
  Breadcrumbs,
  Link,
  Skeleton,
  Alert,
  Dialog,
  DialogContent,
  IconButton,
  Zoom,
  Divider,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Visibility as PreviewIcon,
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
  Share as ShareIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCart as CartIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import api from "../../utils/axiosInterceptor";
import { useAuth } from "../../context/authContext";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
  border: "1px solid rgba(255,255,255,0.2)",
}));

const PreviewImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
  borderRadius: theme.spacing(2),
  cursor: "pointer",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const PriceBox = styled(Box)(({ theme }) => ({
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  color: "white",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  textAlign: "center",
  marginBottom: theme.spacing(3),
}));

const TemplateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchTemplateDetails();
    if (user) {
      checkIfFavorited();
    }
  }, [id, user]);

  const fetchTemplateDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/templates/${id}`);
      setTemplate(response.data);
    } catch (error) {
      console.error("Error fetching template:", error);
      setError("Failed to load template details");
    } finally {
      setLoading(false);
    }
  };

  const checkIfFavorited = async () => {
    try {
      const response = await api.get("/user/favorites");
      const favoriteIds = response.data.map((fav) => fav._id);
      setIsFavorited(favoriteIds.includes(id));
    } catch (error) {
      console.error("Error checking favorites:", error);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      if (isFavorited) {
        await api.delete(`/user/favorites/${id}`);
        setIsFavorited(false);
      } else {
        await api.post(`/user/favorites/${id}`);
        setIsFavorited(true);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleDownload = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setDownloading(true);
      // Create a temporary link element to trigger download
      const link = document.createElement("a");
      link.href = template.downloadUrl;
      link.download = `${template.title.replace(/\s+/g, "-")}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading template:", error);
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: template.title,
          text: template.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Skeleton
              variant="rectangular"
              height={400}
              sx={{ borderRadius: 2 }}
            />
            <Skeleton variant="text" height={60} sx={{ mt: 2 }} />
            <Skeleton variant="text" height={40} width="60%" />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton
              variant="rectangular"
              height={200}
              sx={{ borderRadius: 2 }}
            />
            <Skeleton
              variant="rectangular"
              height={100}
              sx={{ mt: 2, borderRadius: 2 }}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error || !template) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || "Template not found"}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/templates")}
          variant="outlined"
        >
          Back to Templates
        </Button>
      </Container>
    );
  }

  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link
            color="inherit"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            sx={{ cursor: "pointer" }}
          >
            Home
          </Link>
          <Link
            color="inherit"
            href="/templates"
            onClick={(e) => {
              e.preventDefault();
              navigate("/templates");
            }}
            sx={{ cursor: "pointer" }}
          >
            Templates
          </Link>
          <Typography color="text.primary">{template.title}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          {/* Left Column - Preview Image and Details */}
          <Grid item xs={12} md={8}>
            <StyledPaper>
              {/* Preview Image */}
              <Box sx={{ mb: 3 }}>
                <PreviewImage
                  src={template.previewImageUrl}
                  alt={template.title}
                  onClick={() => setPreviewOpen(true)}
                />
              </Box>

              {/* Template Info */}
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Typography variant="h4" fontWeight="bold">
                    {template.title}
                  </Typography>
                  <Chip
                    label={template.category}
                    color="primary"
                    variant="outlined"
                  />
                </Box>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3, lineHeight: 1.7 }}
                >
                  {template.description}
                </Typography>

                {/* Action Buttons */}
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Button
                    variant="outlined"
                    startIcon={<PreviewIcon />}
                    onClick={() => setPreviewOpen(true)}
                    sx={{ borderRadius: 3 }}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={
                      isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />
                    }
                    onClick={handleFavoriteToggle}
                    color={isFavorited ? "error" : "primary"}
                    sx={{ borderRadius: 3 }}
                  >
                    {isFavorited ? "Favorited" : "Add to Favorites"}
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<ShareIcon />}
                    onClick={handleShare}
                    sx={{ borderRadius: 3 }}
                  >
                    Share
                  </Button>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Additional Template Info */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Category
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {template.category}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Created By
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar sx={{ width: 24, height: 24 }}>
                      {template.createdBy?.name?.charAt(0) || "U"}
                    </Avatar>
                    <Typography variant="body1" fontWeight={500}>
                      {template.createdBy?.name || "WebBlueprints"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>

          {/* Right Column - Pricing and Purchase */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: "sticky", top: 100 }}>
              <StyledPaper>
                {/* Price */}
                <PriceBox>
                  <Typography variant="h3" fontWeight="bold">
                    {template.price === 0 ? "Free" : `$${template.price}`}
                  </Typography>
                  {template.price > 0 && (
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      One-time purchase
                    </Typography>
                  )}
                </PriceBox>

                {/* Download Button */}
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={downloading ? null : <DownloadIcon />}
                  onClick={handleDownload}
                  disabled={downloading}
                  sx={{
                    py: 2,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    borderRadius: 3,
                    background:
                      "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #1976D2 30%, #0288D1 90%)",
                    },
                  }}
                >
                  {downloading ? "Downloading..." : "Download Template"}
                </Button>

                {!user && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      Please{" "}
                      <Link onClick={() => navigate("/login")}>sign in</Link> to
                      download templates
                    </Typography>
                  </Alert>
                )}

                {/* Features List */}
                <Box sx={{ mt: 3 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                  >
                    What's Included:
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    {[
                      "Full source code",
                      "Responsive design",
                      "Modern UI components",
                      "Documentation",
                      "Free updates",
                      "Commercial license",
                    ].map((feature, index) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <StarIcon
                          sx={{ fontSize: 16, color: "primary.main" }}
                        />
                        <Typography variant="body2">{feature}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </StyledPaper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="lg"
        fullWidth
        TransitionComponent={Zoom}
      >
        <DialogContent sx={{ p: 0, position: "relative" }}>
          <IconButton
            onClick={() => setPreviewOpen(false)}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "white",
              zIndex: 1,
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={template.previewImageUrl}
            alt={template.title}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TemplateDetails;
