// src/components/Home/FAQSection.js
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Chip,
  Grid,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  HelpOutline as HelpIcon,
  ContactSupport as ContactIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
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

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  border: "1px solid transparent",
  transition: "all 0.3s ease",
  "&:before": {
    display: "none",
  },
  "&:hover": {
    borderColor: "rgba(33, 150, 243, 0.2)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },
  "&.Mui-expanded": {
    margin: `0 0 ${theme.spacing(2)}px 0`,
    borderColor: "rgba(33, 150, 243, 0.3)",
    boxShadow: "0 8px 25px rgba(33, 150, 243, 0.1)",
  },
}));

const FAQSection = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqCategories = [
    { label: "Licensing", color: "primary" },
    { label: "Technical", color: "secondary" },
    { label: "Support", color: "success" },
    { label: "Customization", color: "warning" },
  ];

  const faqs = [
    {
      id: "panel1",
      category: "Licensing",
      question: "Can I use these templates for commercial projects?",
      answer:
        "Yes, all our templates come with a commercial license allowing you to use them in projects for your clients or your own business. You can create unlimited projects without any additional fees.",
    },
    {
      id: "panel2",
      category: "Technical",
      question: "Do I need coding experience to use these templates?",
      answer:
        "Basic HTML/CSS knowledge is helpful, but many of our templates are designed to be easily customizable even for beginners. We provide detailed documentation and video tutorials to help you get started.",
    },
    {
      id: "panel3",
      category: "Support",
      question: "Are updates included with my purchase?",
      answer:
        "Yes, you'll receive free updates for the templates you've purchased. We regularly improve our templates based on user feedback and keep them compatible with the latest technologies.",
    },
    {
      id: "panel4",
      category: "Customization",
      question: "Can I request a custom template?",
      answer:
        "Absolutely! We offer custom template development services. Contact our support team with your requirements for a quote. We can create templates tailored to your specific needs and brand guidelines.",
    },
    {
      id: "panel5",
      category: "Support",
      question: "What's your refund policy?",
      answer:
        "We offer a 14-day money-back guarantee if you're not satisfied with your purchase. Please contact our support team to process your refund. We're confident you'll love our templates!",
    },
    {
      id: "panel6",
      category: "Technical",
      question: "What technologies are used in these templates?",
      answer:
        "Our templates are built with modern technologies including HTML5, CSS3, JavaScript, React, and various UI frameworks. Each template specifies its tech stack in the description.",
    },
  ];

  return (
    <Box sx={{ py: 12, bgcolor: "#f8fafc" }}>
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
              Frequently Asked Questions
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: "600px",
                mx: "auto",
                fontWeight: 400,
                mb: 4,
              }}
            >
              Find answers to common questions about our templates
            </Typography>

            {/* Category Filters */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              {faqCategories.map((category) => (
                <Chip
                  key={category.label}
                  label={category.label}
                  color={category.color}
                  variant="outlined"
                  size="small"
                  sx={{ fontWeight: 500 }}
                />
              ))}
            </Box>
          </Box>
        </AnimatedBox>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8} sx={{ mx: "auto" }}>
            {faqs.map((faq, index) => (
              <AnimatedBox
                key={faq.id}
                sx={{ animationDelay: `${index * 0.1}s` }}
              >
                <StyledAccordion
                  expanded={expanded === faq.id}
                  onChange={handleChange(faq.id)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      background:
                        expanded === faq.id
                          ? "rgba(33, 150, 243, 0.08)"
                          : index % 2 === 0
                          ? "rgba(33, 150, 243, 0.03)"
                          : "white",
                      "&:hover": {
                        background: "rgba(33, 150, 243, 0.08)",
                      },
                      py: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        width: "100%",
                      }}
                    >
                      <HelpIcon color="primary" />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {faq.question}
                        </Typography>
                        <Chip
                          label={faq.category}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ mt: 0.5, fontSize: "0.7rem" }}
                        />
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ py: 3 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.7,
                        color: "text.secondary",
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </StyledAccordion>
              </AnimatedBox>
            ))}
          </Grid>
        </Grid>

        {/* Contact Support Section */}
        <AnimatedBox sx={{ animationDelay: "0.8s" }}>
          <Box
            sx={{
              textAlign: "center",
              mt: 8,
              p: 4,
              bgcolor: "white",
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <ContactIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Still have questions?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              gutterBottom
              sx={{ mb: 3 }}
            >
              Our support team is here to help you with any questions about our
              templates
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/contact")}
                sx={{
                  borderRadius: 4,
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                Contact Support
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate("/help")}
                sx={{
                  borderRadius: 4,
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                Browse Help Center
              </Button>
            </Box>
          </Box>
        </AnimatedBox>
      </Container>
    </Box>
  );
};

export default FAQSection;
