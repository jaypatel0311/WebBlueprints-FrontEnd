// src/components/Home/FeaturedTemplates.js
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Skeleton,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { styled, keyframes } from "@mui/material/styles";

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedBox = styled(Box)(({ theme }) => ({
  animation: `${slideInUp} 0.6s ease-out forwards`,
  opacity: 0,
}));

const TemplateCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  borderRadius: theme.spacing(3),
  cursor: "pointer",
  position: "relative",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
    "& .template-overlay": {
      opacity: 1,
    },
    "& .template-image": {
      transform: "scale(1.1)",
    },
  },
}));

const ImageOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    "linear-gradient(45deg, rgba(33, 150, 243, 0.8), rgba(33, 203, 243, 0.8))",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
  opacity: 0,
  transition: "opacity 0.3s ease",
  zIndex: 2,
}));

const FeaturedTemplates = ({
  featuredTemplates = [],
  loading = false,
  onFavoriteToggle,
  favorites = [],
}) => {
  const navigate = useNavigate();

  const handleCardClick = (templateId) => {
    navigate(`/templates/${templateId}`);
  };

  const handlePreview = (e, templateId) => {
    e.stopPropagation();
    // Open preview in new tab or modal
    window.open(`/templates/${templateId}/preview`, "_blank");
  };

  const handleDownload = (e, templateId) => {
    e.stopPropagation();
    // Handle download logic
    console.log("Download template:", templateId);
  };

  if (loading) {
    return (
      <Box sx={{ py: 10, bgcolor: "#f8fafc" }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: "center" }}>
            <Skeleton
              variant="text"
              width={300}
              height={60}
              sx={{ mx: "auto" }}
            />
            <Skeleton
              variant="text"
              width={500}
              height={30}
              sx={{ mx: "auto", mt: 2 }}
            />
          </Box>
          <Grid container spacing={3}>
            {Array.from(new Array(6)).map((_, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card sx={{ height: 350 }}>
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton variant="text" height={30} />
                    <Skeleton variant="text" height={20} width="60%" />
                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                      <Skeleton variant="rounded" width={60} height={24} />
                      <Skeleton variant="rounded" width={70} height={24} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 10, bgcolor: "#f8fafc" }}>
      <Container maxWidth="lg">
        <AnimatedBox>
          <Box sx={{ mb: 6, textAlign: "center" }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                mb: 1,
                background: "linear-gradient(90deg, #2196F3, #21CBF3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Featured Templates
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ maxWidth: "600px", mx: "auto" }}
            >
              Professionally designed, fully responsive, and ready to customize
            </Typography>
          </Box>
        </AnimatedBox>

        <Grid container spacing={3}>
          {featuredTemplates.slice(0, 6).map((template, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={template?._id || index}>
              <AnimatedBox sx={{ animationDelay: `${index * 0.1}s` }}>
                <TemplateCard onClick={() => handleCardClick(template?._id)}>
                  <Box
                    sx={{
                      position: "relative",
                      height: 200,
                      overflow: "hidden",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={
                        template?.previewImageUrl ||
                        `/placeholder-template-${(index % 3) + 1}.jpg`
                      }
                      alt={template?.title || `Template ${index + 1}`}
                      className="template-image"
                      sx={{
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                    />
                    <ImageOverlay className="template-overlay">
                      <Tooltip title="Preview">
                        <IconButton
                          color="inherit"
                          sx={{ color: "white" }}
                          onClick={(e) => handlePreview(e, template?._id)}
                        >
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Download">
                        <IconButton
                          color="inherit"
                          sx={{ color: "white" }}
                          onClick={(e) => handleDownload(e, template?._id)}
                        >
                          <DownloadIcon />
                        </IconButton>
                      </Tooltip>
                    </ImageOverlay>
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      gutterBottom
                      noWrap
                    >
                      {template?.title || `Premium Template ${index + 1}`}
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
                        lineHeight: 1.4,
                      }}
                    >
                      {template?.description ||
                        "A professional template designed for modern websites."}
                    </Typography>

                    <Box
                      sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}
                    >
                      {(template?.tags || ["Responsive", "Modern"])
                        .slice(0, 3)
                        .map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                              bgcolor: "rgba(33, 150, 243, 0.1)",
                              color: "#1976D2",
                              fontWeight: 500,
                              fontSize: "0.75rem",
                            }}
                          />
                        ))}
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: "auto",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="primary"
                      >
                        {template?.price === 0
                          ? "Free"
                          : template?.price
                          ? `$${template.price}`
                          : "$19.99"}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        sx={{
                          borderRadius: 4,
                          fontWeight: 600,
                          textTransform: "none",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/templates/${template?._id}`);
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </TemplateCard>
              </AnimatedBox>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/templates")}
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 6,
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              fontSize: "1.1rem",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0 4px 20px rgba(33, 150, 243, 0.4)",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 8px 25px rgba(33, 150, 243, 0.5)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Browse All Templates
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedTemplates;
