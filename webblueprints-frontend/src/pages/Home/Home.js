import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CodeIcon from "@mui/icons-material/Code";
import SpeedIcon from "@mui/icons-material/Speed";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import DevicesIcon from "@mui/icons-material/Devices";
import LaptopIcon from "@mui/icons-material/Laptop";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { useTheme } from "@mui/material/styles";
import api from "../../utils/axiosInterceptor";
import HeroSection from "./HeroSection";
import TrustedBy from "./TrustedBy";
import FeaturedTemplates from "./FeaturedTemplates";
import FeaturesSection from "./FeaturesSection";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import FAQSection from "./FAQSection";

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

function Home() {
  const navigate = useNavigate();
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
      <HeroSection featuredTemplates={featuredTemplates} />

      {/* Trusted By Section */}
      <TrustedBy />

      {/* Featured Templates Section */}
      <FeaturedTemplates
        featuredTemplates={featuredTemplates}
        loading={loading}
      />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQSection />
    </Box>
  );
}

export default Home;
