import React from "react";
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
import PreviewIcon from "@mui/icons-material/Preview";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CodeIcon from "@mui/icons-material/Code";

const TemplateCard = ({ template, onAddToCart }) => {
  console.log("TemplateCard rendered with template:", template);

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
        <Typography
          gutterBottom
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
          }}
        >
          {template.title}
        </Typography>
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
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
          <Button
            size="small"
            startIcon={<PreviewIcon />}
            variant="outlined"
            sx={{
              flex: 1,
              borderColor: "primary.main",
              color: "primary.main",
              "&:hover": {
                borderColor: "primary.dark",
                backgroundColor: "rgba(33, 150, 243, 0.04)",
              },
            }}
            onClick={() => window.open(template.demoUrl, "_blank")}
          >
            Live Demo
          </Button>
          <Button
            size="small"
            startIcon={<CodeIcon />}
            variant="outlined"
            sx={{
              flex: 1,
              borderColor: "primary.main",
              color: "primary.main",
              "&:hover": {
                borderColor: "primary.dark",
                backgroundColor: "rgba(33, 150, 243, 0.04)",
              },
            }}
            href={template.codeLink}
            target="_blank"
          >
            View Code
          </Button>
        </Box>
        <Button
          size="small"
          startIcon={<ShoppingCartIcon />}
          variant="contained"
          fullWidth
          sx={{
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            color: "white",
            py: 1,
          }}
          onClick={() => onAddToCart(template)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default TemplateCard;
