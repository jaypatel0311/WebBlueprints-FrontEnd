import React from "react";
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
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";

const Downloads = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

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
        <Grid item size={12}>
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
                Your purchased templates will appear here for easy access and
                downloads. You can re-download your templates anytime you need
                them.
              </Typography>
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
