import React from "react";
import { Box, Typography, Button, Paper, Grid } from "@mui/material";

const AuthorApplication = ({ handleBecomeAuthor }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 0,
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: "100%",
        }}
      >
        {/* Left column with image/graphic */}
        <Box
          sx={{
            flex: "0 0 40%",
            bgcolor: "primary.main",
            background: "linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)",
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            color: "white",
            overflow: "hidden",
          }}
        >
          {/* Decorative elements */}
          <Box
            sx={{
              position: "absolute",
              top: -20,
              left: -20,
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -30,
              right: -30,
              width: 150,
              height: 150,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
            }}
          />

          <Typography
            variant="h4"
            fontWeight="bold"
            mb={2}
            sx={{ position: "relative", zIndex: 2 }}
          >
            Become a Template Author
          </Typography>

          <Typography
            variant="subtitle1"
            mb={3}
            sx={{ opacity: 0.9, position: "relative", zIndex: 2 }}
          >
            Join our creative community and earn by sharing your expertise
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              position: "relative",
              zIndex: 2,
            }}
          >
            {[
              "Earn passive income from your designs",
              "Reach thousands of developers worldwide",
              "Build your professional portfolio",
              "Get featured on our homepage",
            ].map((benefit, i) => (
              <Box
                key={i}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    bgcolor: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body2">✓</Typography>
                </Box>
                <Typography variant="body1">{benefit}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right column with info and button */}
        <Box
          sx={{
            flex: "1 1 auto",
            p: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Ready to Share Your Creativity?
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            paragraph
            sx={{ maxWidth: 500, mx: "auto" }}
          >
            Our platform helps talented designers and developers showcase their
            work and earn from their creations. We handle sales, marketing, and
            customer support so you can focus on what you do best — creating
            amazing templates.
          </Typography>

          <Box sx={{ width: "100%", maxWidth: 400, my: 4 }}>
            <Grid container spacing={2}>
              {[
                { title: "70%", desc: "Author Revenue Share" },
                { title: "10k+", desc: "Active Customers" },
                { title: "24h", desc: "Review Process" },
                { title: "$$$", desc: "Monthly Payouts" },
              ].map((stat, i) => (
                <Grid size={{ xs: 6 }} key={i}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "background.default",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="primary.main"
                    >
                      {stat.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Button
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1.1rem",
              borderRadius: 8,
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              boxShadow: "0 4px 10px rgba(33, 150, 243, 0.3)",
              "&:hover": {
                boxShadow: "0 6px 15px rgba(33, 150, 243, 0.4)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.2s ease",
            }}
            onClick={handleBecomeAuthor}
          >
            Apply to Become an Author
          </Button>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
            Applications are reviewed within 48 hours
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default AuthorApplication;
