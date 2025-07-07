// src/components/Home/FeaturesSection.js
import React from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import {
  Code as CodeIcon,
  Speed as SpeedIcon,
  DesignServices as DesignServicesIcon,
  Devices as DevicesIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const AnimatedBox = styled(Box)(({ theme }) => ({
  animation: "fadeUp 0.8s ease-out",
  "@keyframes fadeUp": {
    "0%": {
      opacity: 0,
      transform: "translateY(20px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

const FeaturesSection = () => {
  const features = [
    {
      icon: <CodeIcon fontSize="large" sx={{ color: "#2196F3" }} />,
      title: "Clean Code",
      description:
        "Well-structured code following best practices for readability and maintainability",
    },
    {
      icon: <SpeedIcon fontSize="large" sx={{ color: "#2196F3" }} />,
      title: "Lightning Fast",
      description:
        "Optimized for performance to ensure your websites load quickly",
    },
    {
      icon: <DesignServicesIcon fontSize="large" sx={{ color: "#2196F3" }} />,
      title: "Modern Design",
      description:
        "Contemporary UI/UX following the latest design trends and patterns",
    },
    {
      icon: <DevicesIcon fontSize="large" sx={{ color: "#2196F3" }} />,
      title: "Fully Responsive",
      description:
        "Perfect display on all devices from mobile phones to large desktops",
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 10 }}>
        <AnimatedBox>
          <Box sx={{ mb: 8, textAlign: "center" }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Why Choose Our Templates
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ maxWidth: "700px", mx: "auto" }}
            >
              We build templates with best practices and modern technologies to
              help you build better websites faster
            </Typography>
          </Box>
        </AnimatedBox>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <AnimatedBox sx={{ animationDelay: `${index * 0.15}s` }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: "100%",
                    textAlign: "center",
                    borderRadius: 4,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </AnimatedBox>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default FeaturesSection;
