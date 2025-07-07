// src/components/Home/Testimonials.js
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Rating,
} from "@mui/material";
import { FormatQuote as QuoteIcon } from "@mui/icons-material";
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
  animation: `${slideInUp} 0.8s ease-out forwards`,
  opacity: 0,
}));

const TestimonialCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  transition: "all 0.3s ease",
  border: "1px solid transparent",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    borderColor: "rgba(33, 150, 243, 0.2)",
  },
}));

const QuoteIconStyled = styled(QuoteIcon)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  fontSize: "3rem",
  color: "rgba(33, 150, 243, 0.1)",
  transform: "rotate(180deg)",
}));

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Frontend Developer",
      company: "Tech Innovations Inc.",
      comment:
        "These templates have saved me countless hours. The code is clean and well-organized, making customization a breeze.",
      avatar: "/avatar-1.jpg",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "UI/UX Designer",
      company: "Creative Studio",
      comment:
        "As a designer, I appreciate the attention to detail in these templates. They're not only beautiful but also functional.",
      avatar: "/avatar-2.jpg",
      rating: 5,
    },
    {
      name: "Alex Rodriguez",
      role: "Freelance Web Developer",
      company: "Independent",
      comment:
        "My clients are always impressed with how quickly I can deliver professional websites using these templates.",
      avatar: "/avatar-3.jpg",
      rating: 5,
    },
  ];

  return (
    <Box sx={{ py: 12, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <AnimatedBox>
          <Box sx={{ textAlign: "center", mb: 8 }}>
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
              What Our Customers Say
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: "600px",
                mx: "auto",
                fontWeight: 400,
              }}
            >
              Don't just take our word for it - hear from developers who've
              transformed their workflow
            </Typography>
          </Box>
        </AnimatedBox>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <AnimatedBox sx={{ animationDelay: `${index * 0.15}s` }}>
                <TestimonialCard elevation={2}>
                  <QuoteIconStyled />

                  {/* Rating */}
                  <Box sx={{ mb: 2 }}>
                    <Rating
                      value={testimonial.rating}
                      readOnly
                      size="small"
                      sx={{ color: "#FF9800" }}
                    />
                  </Box>

                  {/* Comment */}
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      flex: 1,
                      lineHeight: 1.6,
                      fontStyle: "italic",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    "{testimonial.comment}"
                  </Typography>

                  {/* Profile */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={testimonial.avatar}
                      sx={{
                        width: 60,
                        height: 60,
                        mr: 2,
                        border: "3px solid",
                        borderColor: "primary.main",
                      }}
                    >
                      {testimonial.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {testimonial.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="primary.main"
                        fontWeight={500}
                      >
                        {testimonial.role}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {testimonial.company}
                      </Typography>
                    </Box>
                  </Box>
                </TestimonialCard>
              </AnimatedBox>
            </Grid>
          ))}
        </Grid>

        {/* Stats Section */}
        <AnimatedBox sx={{ animationDelay: "0.6s" }}>
          <Box sx={{ mt: 8, textAlign: "center" }}>
            <Grid container spacing={4} justifyContent="center">
              <Grid size={{ xs: 6, sm: 3 }}>
                <Typography variant="h3" fontWeight="bold" color="primary">
                  1000+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Happy Customers
                </Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Typography variant="h3" fontWeight="bold" color="primary">
                  4.9★
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average Rating
                </Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Typography variant="h3" fontWeight="bold" color="primary">
                  50+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Premium Templates
                </Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Typography variant="h3" fontWeight="bold" color="primary">
                  24/7
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Support Available
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </AnimatedBox>
      </Container>
    </Box>
  );
};

export default Testimonials;
