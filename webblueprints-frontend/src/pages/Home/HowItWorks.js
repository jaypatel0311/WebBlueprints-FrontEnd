// src/components/Home/HowItWorks.js
import React from "react";
import { Box, Container, Typography, Grid, Paper, Avatar } from "@mui/material";
import {
  Laptop as LaptopIcon,
  DesignServices as DesignServicesIcon,
  PhoneIphone as PhoneIphoneIcon,
  ArrowForward as ArrowIcon,
} from "@mui/icons-material";
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

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const AnimatedBox = styled(Box)(({ theme }) => ({
  animation: `${slideInUp} 0.8s ease-out forwards`,
  opacity: 0,
}));

const StepCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  textAlign: "center",
  position: "relative",
  transition: "all 0.3s ease",
  border: "2px solid transparent",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 20px 40px rgba(33, 150, 243, 0.15)",
    borderColor: "rgba(33, 150, 243, 0.3)",
    "& .step-number": {
      animation: `${pulse} 1s ease-in-out infinite`,
    },
  },
}));

const StepNumber = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  margin: "0 auto 24px auto",
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  fontSize: "2rem",
  fontWeight: "bold",
  boxShadow: "0 8px 25px rgba(33, 150, 243, 0.3)",
}));

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Browse Templates",
      description:
        "Explore our curated collection of premium templates and find the perfect match for your project needs",
      icon: <LaptopIcon fontSize="large" />,
      color: "#2196F3",
    },
    {
      number: "2",
      title: "Customize Design",
      description:
        "Easily modify colors, fonts, layouts, and content to perfectly match your brand identity and vision",
      icon: <DesignServicesIcon fontSize="large" />,
      color: "#4CAF50",
    },
    {
      number: "3",
      title: "Deploy Your Site",
      description:
        "Launch your professional website quickly and start impressing visitors with your stunning design",
      icon: <PhoneIphoneIcon fontSize="large" />,
      color: "#FF9800",
    },
  ];

  return (
    <Box sx={{ py: 12, bgcolor: "#f8fafc", position: "relative" }}>
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(33, 150, 243, 0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <AnimatedBox>
          <Box sx={{ mb: 8, textAlign: "center" }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
              }}
            >
              How It Works
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: "600px",
                mx: "auto",
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              Get started with our templates in just a few simple steps
            </Typography>
          </Box>
        </AnimatedBox>

        <Grid container spacing={2} alignItems="stretch">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <Grid size={{ xs: 12, md: 4 }}>
                <AnimatedBox sx={{ animationDelay: `${index * 0.2}s` }}>
                  <StepCard elevation={2}>
                    <StepNumber className="step-number">
                      {step.number}
                    </StepNumber>

                    <Box sx={{ mb: 3, color: step.color }}>{step.icon}</Box>

                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      gutterBottom
                      sx={{ color: "text.primary" }}
                    >
                      {step.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {step.description}
                    </Typography>
                  </StepCard>
                </AnimatedBox>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>

        {/* Call to Action */}
        <AnimatedBox sx={{ animationDelay: "0.8s" }}>
          <Box sx={{ textAlign: "center", mt: 8 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Ready to Start Building?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Join thousands of developers who have streamlined their workflow
            </Typography>
          </Box>
        </AnimatedBox>
      </Container>
    </Box>
  );
};

export default HowItWorks;
