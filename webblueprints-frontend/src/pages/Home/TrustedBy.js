import React from "react";
import { Box, Container, Typography, Grid, Fade } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const CompanyLogo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  transition: "all 0.3s ease",
  cursor: "pointer",
  filter: "grayscale(100%)",
  opacity: 0.6,
  "&:hover": {
    filter: "grayscale(0%)",
    opacity: 1,
    transform: "translateY(-5px)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    animation: `${float} 2s ease-in-out infinite`,
  },
}));

const TrustedBy = () => {
  const companies = [
    { name: "Google", color: "#4285F4" },
    { name: "Microsoft", color: "#00BCF2" },
    { name: "Amazon", color: "#FF9900" },
    { name: "Meta", color: "#1877F2" },
    { name: "Airbnb", color: "#FF5A5F" },
  ];

  return (
    <Box sx={{ bgcolor: "grey.50", py: 6 }}>
      <Container maxWidth="lg">
        <Fade in={true} timeout={1000}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="overline"
              color="text.secondary"
              fontWeight={600}
              mb={4}
              sx={{
                letterSpacing: 2,
                fontSize: "0.9rem",
              }}
            >
              Trusted by developers from
            </Typography>

            <Grid
              container
              spacing={3}
              justifyContent="center"
              alignItems="center"
              sx={{ mb: 4 }}
            >
              {companies.map((company, index) => (
                <Grid key={company.name} item xs={6} sm={4} md={2}>
                  <Fade in={true} timeout={1000 + index * 200}>
                    <CompanyLogo>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{
                          color: company.color,
                          fontSize: { xs: "1rem", sm: "1.25rem" },
                        }}
                      >
                        {company.name}
                      </Typography>
                    </CompanyLogo>
                  </Fade>
                </Grid>
              ))}
            </Grid>

            {/* Trust indicators */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto" }}
            >
              Join thousands of developers who trust our templates to build
              professional websites faster and more efficiently.
            </Typography>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default TrustedBy;
