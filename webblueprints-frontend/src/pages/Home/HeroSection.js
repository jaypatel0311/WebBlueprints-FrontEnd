// src/components/Home/HeroSection.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Fade,
  Slide,
  styled,
} from "@mui/material";
import {
  Search as SearchIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";

// Styled Components
const HeroSectionContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  color: "white",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
    zIndex: 1,
  },
}));

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/templates?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/templates");
    }
  };

  return (
    <HeroSectionContainer>
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Fade in={true} timeout={1000}>
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
                    lineHeight: 1.1,
                    mb: 2,
                    textShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  Build Websites <br />
                  <span style={{ color: "#E0F7FA" }}>Faster & Better</span>
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    maxWidth: "600px",
                    fontSize: { xs: "1.1rem", md: "1.25rem" },
                    fontWeight: 400,
                  }}
                >
                  Professional, responsive templates to accelerate your
                  development workflow and impress your clients.
                </Typography>

                <Box
                  component="form"
                  onSubmit={handleSearch}
                  sx={{ mb: 4, maxWidth: "550px" }}
                >
                  <Box sx={{ position: "relative", display: "flex" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Search templates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      sx={{
                        bgcolor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "50px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "50px",
                          pr: 0,
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        position: "absolute",
                        right: 0,
                        height: "100%",
                        borderRadius: "0 50px 50px 0",
                        px: 3,
                        background: "#0D47A1",
                        "&:hover": {
                          background: "#1565C0",
                        },
                      }}
                    >
                      <SearchIcon />
                    </Button>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/templates")}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      borderRadius: "50px",
                      px: 4,
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 600,
                      backgroundColor: "white",
                      color: "#1976D2",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                        transform: "translateY(-3px)",
                        boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Explore Templates
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Grid>
          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Slide direction="left" in={true} timeout={1000}>
              <Box
                sx={{
                  position: "relative",
                  height: "450px",
                }}
              >
                {/* Main device - Desktop mockup */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "400px",
                    height: "280px",
                    borderRadius: 2,
                    overflow: "hidden",
                    zIndex: 2,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 25px 65px rgba(0,0,0,0.3)",
                    },
                    // Frame styling
                    border: "10px solid #333",
                    borderRadius: "10px",
                    bgcolor: "#333",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: "-20px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "70px",
                      height: "10px",
                      borderRadius: "10px 10px 0 0",
                      bgcolor: "#333",
                    },
                  }}
                >
                  {/* Screen content */}
                  <Box
                    component="img"
                    src="/demo-assets/laptop.png"
                    alt="Desktop Template Preview"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "3px",
                    }}
                  />
                </Box>

                {/* Mobile device mockup */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 40,
                    left: 30,
                    width: "140px",
                    height: "240px",
                    zIndex: 3,
                    boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
                    borderRadius: "20px",
                    transition: "all 0.3s ease",
                    transform: "rotate(-5deg)",
                    "&:hover": {
                      transform: "rotate(-3deg) translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.28)",
                    },
                    // Phone frame
                    border: "8px solid #111",
                    bgcolor: "#111",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: "15px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "40px",
                      height: "5px",
                      borderRadius: "3px",
                      bgcolor: "#333",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="/demo-assets/mobile.png"
                    alt="Mobile Template Preview"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                  />
                </Box>

                {/* Tablet device mockup */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 200,
                    right: -20,
                    width: "180px",
                    height: "150px",
                    zIndex: 2,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                    transition: "all 0.3s ease",
                    transform: "rotate(3deg)",
                    "&:hover": {
                      transform: "rotate(5deg) translateY(-5px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    },
                    // Tablet frame
                    border: "8px solid #555",
                    borderRadius: "8px",
                    bgcolor: "#555",
                  }}
                >
                  <Box
                    component="img"
                    src="/demo-assets/laptop.png"
                    alt="Tablet Template Preview"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "2px",
                    }}
                  />
                </Box>

                {/* Decorative elements */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: -10,
                    left: -15,
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "rgba(33, 203, 243, 0.1)",
                    zIndex: 0,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 30,
                    left: 50,
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(33, 150, 243, 0.15)",
                    zIndex: 0,
                  }}
                />
              </Box>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </HeroSectionContainer>
  );
};

export default HeroSection;
