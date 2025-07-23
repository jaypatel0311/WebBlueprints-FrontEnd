import React, { use, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
  Chip,
  CardActions,
  Box,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import demoService from "../../services/demoService";
import { CircularProgress } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";

const TemplateCard = ({ template, onAddToCart }) => {
  const [isGeneratingDemo, setIsGeneratingDemo] = useState(false);

  const navigate = useNavigate();
  const handleGenerateDemo = async () => {
    try {
      // If template already has a demoUrl, just navigate to it
      if (template.demoUrl) {
        console.log("Using existing demo URL:", template.demoUrl);
        window.open(template.demoUrl, "_blank", "noopener,noreferrer");
        return;
      }

      // If no demoUrl exists, generate a new demo
      setIsGeneratingDemo(true);
      console.log("Generating new demo for template:", template._id);

      const response = await demoService.generateDemo(template._id);
      console.log("Demo generated successfully:", response.data);

      // Navigate to the newly generated demo
      window.open(response.data.demoUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Error generating demo:", error);
      // Show error message to user
      alert("Failed to generate demo. Please try again.");
    } finally {
      setIsGeneratingDemo(false);
    }
  };
  return (
    <Card
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        borderRadius: 2,
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={template.previewImageUrl}
        alt={template.title}
        sx={{
          objectFit: "cover",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      />
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              flexGrow: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
                color: "primary.main",
              },
            }}
            onClick={() => navigate(`/templates/${template._id}`)}
          >
            {template.title}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            height: "4.5em", // Approx height for 3 lines
          }}
        >
          {template.description}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
          {template.tags && Array.isArray(template.tags)
            ? template.tags.slice(0, 3).map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    background:
                      "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    color: "white",
                    fontSize: "0.7rem",
                    height: "22px",
                    fontWeight: 500,
                    "& .MuiChip-label": { px: 1 },
                  }}
                />
              ))
            : null}

          {template.tags &&
            Array.isArray(template.tags) &&
            template.tags.length > 3 && (
              <Chip
                label={`+${template.tags.length - 3}`}
                size="small"
                sx={{
                  background: "rgba(33, 150, 243, 0.1)",
                  color: "primary.main",
                  fontSize: "0.7rem",
                  height: "22px",
                  fontWeight: 500,
                  "& .MuiChip-label": { px: 1 },
                }}
              />
            )}
        </Stack>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Typography
            variant="h6"
            color="primary"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {template.price === 0 ? "FREE" : `$${template.price}`}
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          p: 2,
          pt: 0,
          display: "flex",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={
              isGeneratingDemo ? (
                <CircularProgress size={16} />
              ) : (
                <OpenInNewIcon />
              )
            }
            onClick={handleGenerateDemo}
            disabled={isGeneratingDemo}
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              borderColor: "primary.main",
              color: "primary.main",
              fontSize: "0.75rem",
              px: 2,
              "&:hover": {
                borderColor: "primary.dark",
                backgroundColor: "rgba(33, 150, 243, 0.04)",
              },
            }}
          >
            {isGeneratingDemo
              ? "Generating..."
              : template.demoUrl
              ? "View Demo"
              : "Generate Demo"}
          </Button>
        </Box>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddShoppingCartIcon />}
          onClick={() => onAddToCart(template)}
          sx={{
            borderRadius: "20px",
            textTransform: "none",
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            color: "white",
            px: 2,
            "&:hover": {
              background: "linear-gradient(45deg, #1976D2 30%, #2196F3 90%)",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 8px rgba(33, 150, 243, 0.3)",
              transition: "all 0.2s ease",
            },
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default TemplateCard;
