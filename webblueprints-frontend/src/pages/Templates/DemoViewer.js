import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Typography,
  Box,
  Divider,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import demoService from "../../../services/demoService";
import { useParams, useNavigate } from "react-router-dom";
import TemplateService from "../../../services/templateService";

const DemoViewer = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [demoData, setDemoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Track demo view
    const trackDemoView = async () => {
      try {
        await axios.post("/api/analytics/demo-view", {
          templateId,
          source: document.referrer,
        });
      } catch (err) {
        console.error("Failed to track demo view");
      }
    };

    trackDemoView();

    // Track session duration on unmount
    const startTime = Date.now();
    return () => {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      axios
        .post("/api/analytics/demo-exit", {
          templateId,
          duration,
        })
        .catch((err) => console.error("Failed to track demo session"));
    };
  }, [templateId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [templateRes, demoRes] = await Promise.all([
          TemplateService.getTemplate(templateId),
          demoService.getDemoDetails(templateId),
        ]);

        setTemplate(templateRes.data);
        setDemoData(demoRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load the template demo. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [templateId]);

  const handleBack = () => {
    navigate(`/templates/${templateId}`);
  };

  const handleAddToCart = () => {
    // Implementation for adding to cart
    console.log("Adding to cart:", templateId);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Loading template demo...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h5" color="error" gutterBottom>
            {error}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ mt: 2 }}
          >
            Back to Template Details
          </Button>
        </Paper>
      </Container>
    );
  }

  if (!template || !demoData) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Template not found
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate("/templates")}
            sx={{ mt: 2 }}
          >
            Browse Templates
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box
        component="header"
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          py: 1,
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Grid item>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton onClick={handleBack} size="small">
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" fontWeight="bold">
                  {template.title} - Demo
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Tooltip title="View template details">
                  <Button
                    variant="outlined"
                    startIcon={<VisibilityIcon />}
                    size="small"
                    onClick={handleBack}
                    sx={{
                      borderRadius: 8,
                      textTransform: "none",
                    }}
                  >
                    Details
                  </Button>
                </Tooltip>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  size="small"
                  onClick={handleAddToCart}
                  sx={{
                    borderRadius: 8,
                    textTransform: "none",
                    background:
                      "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  }}
                >
                  Add to Cart ${template.price?.toFixed(2) || "0.00"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Demo Content */}
      <Box sx={{ flex: 1, overflow: "hidden" }}>
        {demoData.demoUrl ? (
          <iframe
            title={template.title}
            src={demoData.demoUrl}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
            }}
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Demo not available. Please try again.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DemoViewer;
