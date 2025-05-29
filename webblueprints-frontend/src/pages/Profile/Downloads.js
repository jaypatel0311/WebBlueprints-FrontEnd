import React from "react";
import { Paper, Typography, Button } from "@mui/material";

const Downloads = () => (
  <Paper sx={{ p: 6, textAlign: "center" }}>
    <Typography
      variant="h6"
      fontWeight="bold"
      sx={{ mb: 2, color: "text.primary" }}
    >
      YOUR DOWNLOADS WILL LIVE HERE
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      You'll be able to view and download them from here
    </Typography>
    <Button
      variant="contained"
      size="large"
      sx={{
        px: 4,
        py: 1.5,
        textTransform: "none",
        fontWeight: "medium",
      }}
      onClick={() => {
        window.location.href = "/templates";
      }}
    >
      Go & Find Your Dream Template
    </Button>
  </Paper>
);

export default Downloads;
