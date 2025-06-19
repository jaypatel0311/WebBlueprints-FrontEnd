import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Chip,
  Divider,
  IconButton,
  Slide,
  Fade,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CodeIcon from "@mui/icons-material/Code";
import SpeedIcon from "@mui/icons-material/Speed";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import DevicesIcon from "@mui/icons-material/Devices";
import LaptopIcon from "@mui/icons-material/Laptop";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import api from "../../utils/axiosInterceptor";

// Animation wrapper component
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

// Enhanced Hero Section
const HeroSection = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)",
  color: "white",
  padding: theme.spacing(15, 0, 20),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.2) 0%, transparent 40%)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "150px",
    background: "linear-gradient(to bottom right, transparent 49%, white 50%)",
  },
}));

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredTemplates, setFeaturedTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured templates
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await api.get("/templates?featured=true&limit=6");
        setFeaturedTemplates(response.data.templates || []);
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/templates?search=${searchQuery}`);
  };

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
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
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate("/pricing")}
                      sx={{
                        borderRadius: "50px",
                        px: 4,
                        py: 1.5,
                        fontSize: "1rem",
                        fontWeight: 600,
                        borderColor: "white",
                        color: "white",
                        "&:hover": {
                          borderColor: "white",
                          backgroundColor: "rgba(255,255,255,0.1)",
                          transform: "translateY(-3px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      View Pricing
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
                      src={
                        featuredTemplates[0]?.previewImageUrl ||
                        "/template-preview1.jpg"
                      }
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
                      src={
                        featuredTemplates[1]?.previewImageUrl ||
                        "/template-preview2.jpg"
                      }
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
                      bottom: 10,
                      left: 110,
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
                      src={
                        featuredTemplates[2]?.previewImageUrl ||
                        "/template-preview3.jpg"
                      }
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
      </HeroSection>

      {/* Trusted By Section */}
      <Container maxWidth="lg">
        <Box
          sx={{
            py: 5,
            textAlign: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            color="text.secondary"
            fontWeight={500}
            mb={3}
          >
            TRUSTED BY DEVELOPERS FROM
          </Typography>
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="center"
          >
            {["Google", "Microsoft", "Amazon", "Facebook", "Airbnb"].map(
              (company) => (
                <Grid item key={company}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="text.secondary"
                    sx={{ opacity: 0.7 }}
                  >
                    {company}
                  </Typography>
                </Grid>
              )
            )}
          </Grid>
        </Box>
      </Container>

      {/* Featured Templates Section */}
      <Box sx={{ py: 10, bgcolor: "#f8fafc" }}>
        <Container maxWidth="lg">
          <AnimatedBox>
            <Box sx={{ mb: 6, textAlign: "center" }}>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                  mb: 1,
                  background: "linear-gradient(90deg, #2196F3, #21CBF3)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Featured Templates
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ maxWidth: "600px", mx: "auto" }}
              >
                Professionally designed, fully responsive, and ready to
                customize
              </Typography>
            </Box>
          </AnimatedBox>

          <Grid container spacing={3}>
            {featuredTemplates.slice(0, 6).map((template, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                key={template?._id || index}
              >
                <AnimatedBox sx={{ animationDelay: `${index * 0.1}s` }}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                      borderRadius: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
                      },
                    }}
                    onClick={() => navigate(`/templates/${template?._id}`)}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={
                        template?.previewImageUrl ||
                        `/placeholder-template-${(index % 3) + 1}.jpg`
                      }
                      alt={template?.title || `Template ${index + 1}`}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                        noWrap
                      >
                        {template?.title || `Premium Template ${index + 1}`}
                      </Typography>
                      <Box
                        sx={{
                          mb: 2,
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        {(template?.tags || ["Responsive", "Modern"])
                          .slice(0, 3)
                          .map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              sx={{
                                bgcolor: "rgba(33, 150, 243, 0.1)",
                                color: "#1976D2",
                              }}
                            />
                          ))}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          color="primary"
                        >
                          {template?.price === 0
                            ? "Free"
                            : template?.price
                            ? `$${template.price}`
                            : "$19.99"}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          color="primary"
                          sx={{ borderRadius: 4 }}
                        >
                          View Details
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </AnimatedBox>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/templates")}
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 6,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                fontSize: "1.1rem",
                fontWeight: 600,
                boxShadow: "0 4px 20px rgba(33, 150, 243, 0.4)",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 8px 25px rgba(33, 150, 243, 0.5)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Browse All Templates
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
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
                We build templates with best practices and modern technologies
                to help you build better websites faster
              </Typography>
            </Box>
          </AnimatedBox>

          <Grid container spacing={4}>
            {[
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
                icon: (
                  <DesignServicesIcon
                    fontSize="large"
                    sx={{ color: "#2196F3" }}
                  />
                ),
                title: "Modern Design",
                description:
                  "Contemporary UI/UX following the latest design trends and patterns",
              },
              {
                icon: (
                  <DevicesIcon fontSize="large" sx={{ color: "#2196F3" }} />
                ),
                title: "Fully Responsive",
                description:
                  "Perfect display on all devices from mobile phones to large desktops",
              },
            ].map((feature, index) => (
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

      {/* How It Works Section */}
      <Box sx={{ py: 10, bgcolor: "#f8fafc" }}>
        <Container maxWidth="lg">
          <AnimatedBox>
            <Box sx={{ mb: 6, textAlign: "center" }}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                How It Works
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ maxWidth: "600px", mx: "auto" }}
              >
                Get started with our templates in just a few simple steps
              </Typography>
            </Box>
          </AnimatedBox>

          <Grid container spacing={6}>
            {[
              {
                number: "1",
                title: "Browse Templates",
                description:
                  "Explore our collection and find the perfect template for your project",
                icon: <LaptopIcon fontSize="large" />,
              },
              {
                number: "2",
                title: "Customize Design",
                description:
                  "Modify colors, fonts, and content to match your brand identity",
                icon: <DesignServicesIcon fontSize="large" />,
              },
              {
                number: "3",
                title: "Deploy Your Site",
                description:
                  "Launch your website and start impressing your visitors right away",
                icon: <PhoneIphoneIcon fontSize="large" />,
              },
            ].map((step, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <AnimatedBox sx={{ animationDelay: `${index * 0.2}s` }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "row", md: "column" },
                      alignItems: { xs: "flex-start", md: "center" },
                      textAlign: { xs: "left", md: "center" },
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                          "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        mb: { xs: 0, md: 3 },
                        mr: { xs: 3, md: 0 },
                        flexShrink: 0,
                      }}
                    >
                      {step.number}
                    </Box>
                    <Box>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        gutterBottom
                        mt={{ xs: 0, md: 2 }}
                      >
                        {step.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {step.description}
                      </Typography>
                    </Box>
                  </Box>
                </AnimatedBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              What Our Customers Say
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                name: "Sarah Johnson",
                role: "Frontend Developer",
                comment:
                  "These templates have saved me countless hours. The code is clean and well-organized, making customization a breeze.",
                avatar: "/avatar-1.jpg",
              },
              {
                name: "Michael Chen",
                role: "UI/UX Designer",
                comment:
                  "As a designer, I appreciate the attention to detail in these templates. They're not only beautiful but also functional.",
                avatar: "/avatar-2.jpg",
              },
              {
                name: "Alex Rodriguez",
                role: "Freelance Web Developer",
                comment:
                  "My clients are always impressed with how quickly I can deliver professional websites using these templates.",
                avatar: "/avatar-3.jpg",
              },
            ].map((testimonial, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <AnimatedBox sx={{ animationDelay: `${index * 0.15}s` }}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="body1" sx={{ mb: 3, flex: 1 }}>
                      "{testimonial.comment}"
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={testimonial.avatar}
                        sx={{ width: 50, height: 50, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </AnimatedBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: 10, bgcolor: "#f8fafc" }}>
        <Container maxWidth="md">
          <AnimatedBox>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                Frequently Asked Questions
              </Typography>
            </Box>
          </AnimatedBox>

          {[
            {
              question: "Can I use these templates for commercial projects?",
              answer:
                "Yes, all our templates come with a commercial license allowing you to use them in projects for your clients or your own business.",
            },
            {
              question: "Do I need coding experience to use these templates?",
              answer:
                "Basic HTML/CSS knowledge is helpful, but many of our templates are designed to be easily customizable even for beginners.",
            },
            {
              question: "Are updates included with my purchase?",
              answer:
                "Yes, you'll receive free updates for the templates you've purchased. We regularly improve our templates based on user feedback.",
            },
            {
              question: "Can I request a custom template?",
              answer:
                "Absolutely! We offer custom template development services. Contact our support team with your requirements for a quote.",
            },
            {
              question: "What's your refund policy?",
              answer:
                "We offer a 14-day money-back guarantee if you're not satisfied with your purchase. Please contact our support team to process your refund.",
            },
          ].map((faq, index) => (
            <AnimatedBox key={index} sx={{ animationDelay: `${index * 0.1}s` }}>
              <Accordion
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  overflow: "hidden",
                  "&:before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    background:
                      index % 2 === 0 ? "rgba(33, 150, 243, 0.05)" : "white",
                    "&:hover": {
                      background: "rgba(33, 150, 243, 0.1)",
                    },
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            </AnimatedBox>
          ))}

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Still have questions?
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/contact")}
              sx={{
                borderRadius: 4,
                px: 3,
                py: 1,
                fontWeight: 500,
              }}
            >
              Contact Support
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: "#0d47a1",
          py: 10,
          color: "white",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 80% 80%, rgba(33, 203, 243, 0.3) 0%, transparent 50%)",
          },
        }}
      >
        <Container maxWidth="md">
          <AnimatedBox>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Ready to Build Something Amazing?
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 4, fontWeight: 400, opacity: 0.9 }}
            >
              Get started with our templates today and bring your ideas to life
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/templates")}
              sx={{
                bgcolor: "white",
                color: "#0d47a1",
                px: 5,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                borderRadius: 6,
                "&:hover": {
                  bgcolor: "#f5f5f5",
                  transform: "translateY(-3px)",
                  boxShadow: "0 8px 25px rgba(255, 255, 255, 0.3)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Explore Templates
            </Button>
          </AnimatedBox>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
