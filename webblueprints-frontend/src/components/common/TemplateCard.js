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
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DemoButton from "../../pages/Templates/DemoButton";

const TemplateCard = ({ template, onAddToCart }) => {
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
            }}
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
        {/* <Box sx={{ display: "flex", gap: 1 }}>
          <DemoButton templateId={template._id} isAdmin={true} isOwner={true} />
        </Box> */}

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
