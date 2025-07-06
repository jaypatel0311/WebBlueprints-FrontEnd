import React, { useState, useEffect } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import demoService from "../../services/demoService";
import { useNavigate } from "react-router-dom";

const DemoButton = ({ templateId, isAdmin, isOwner }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [demoData, setDemoData] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDemoDetails = async () => {
      try {
        const response = await demoService.getDemoDetails(templateId);
        setDemoData(response.data);
      } catch (error) {
        console.error("Error fetching demo details:", error);
      }
    };

    fetchDemoDetails();
  }, [templateId]);

  const handleGenerateDemo = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await demoService.generateDemo(templateId);
      setDemoData({ hasDemo: true, demoUrl: response.data.demoUrl });

      // Navigate to the demo viewer page or open dialog
      if (isAdmin || isOwner) {
        navigate(response.data.demoUrl);
      } else {
        setOpen(true);
      }
    } catch (error) {
      console.error("Error generating demo:", error);
      setError("Failed to generate demo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDemo = () => {
    if (isAdmin || isOwner) {
      navigate(`/templates/${templateId}/demo`);
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {demoData?.hasDemo ? (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<VisibilityIcon />}
          onClick={handleViewDemo}
          disabled={isLoading}
          sx={{
            borderRadius: 8,
            textTransform: "none",
            fontWeight: "medium",
            py: 1,
            px: 2,
          }}
        >
          View Demo
        </Button>
      ) : (
        <Button
          variant="contained"
          color="success"
          startIcon={
            isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <PlayArrowIcon />
            )
          }
          onClick={handleGenerateDemo}
          disabled={isLoading}
          sx={{
            borderRadius: 8,
            textTransform: "none",
            fontWeight: "medium",
            py: 1,
            px: 2,
            background: "linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)",
            boxShadow: "0 3px 8px rgba(76, 175, 80, 0.3)",
            "&:hover": {
              boxShadow: "0 5px 12px rgba(76, 175, 80, 0.4)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.2s ease",
          }}
        >
          {isLoading ? "Loading..." : "Live Demo"}
        </Button>
      )}

      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          sx: {
            height: "90vh",
            borderRadius: 2,
            overflow: "hidden",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 1,
            position: "absolute",
            right: 8,
            top: 8,
            zIndex: 1,
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              bgcolor: "rgba(255,255,255,0.8)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.95)" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent sx={{ p: 0, height: "100%" }}>
          {demoData?.demoUrl ? (
            <iframe
              src={demoData.demoUrl}
              title="Template Demo"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
              allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone"
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
                Demo not available
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DemoButton;
