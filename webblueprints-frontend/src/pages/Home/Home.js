import {
  Box,
  Typography,
  Container,
  Button,
  TextField,
  Grid,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

const HeroSection = styled(Box)(({ theme }) => ({
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  color: "white",
  padding: theme.spacing(15, 0),
  borderRadius: theme.spacing(0),
  position: "relative",
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100px",
    background: "linear-gradient(to bottom right, transparent 49%, white 50%)",
  },
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  height: "100%",
  transition: "all 0.3s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: theme.shadows[10],
  },
}));

const SearchBox = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: theme.spacing(2),
    "&:hover": {
      backgroundColor: "white",
    },
  },
}));

function Home() {
  return (
    <Box>
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  marginBottom: 3,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                }}
              >
                Build Your Next Website Faster
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  marginBottom: 4,
                  opacity: 0.9,
                }}
              >
                Professional templates for developers and designers
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <SearchBox
                  fullWidth
                  placeholder="Search templates..."
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    backgroundColor: "#fff",
                    color: "#2196F3",
                    "&:hover": {
                      backgroundColor: "#e3f2fd",
                    },
                  }}
                >
                  Search
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Grid container spacing={2}>
          <Grid item size={4}>
            <FeatureCard elevation={2}>
              {/* <DevicesIcon sx={{ fontSize: 50, color: "#2196F3", mb: 2 }} /> */}
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Responsive Design
              </Typography>
              <Typography color="text.secondary">
                Our templates work seamlessly across all devices and screen
                sizes
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item size={4}>
            <FeatureCard elevation={2}>
              {/* <BrushIcon sx={{ fontSize: 50, color: "#2196F3", mb: 2 }} /> */}
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Easy Customization
              </Typography>
              <Typography color="text.secondary">
                Customize every aspect of your website with intuitive controls
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item size={4}>
            <FeatureCard elevation={2}>
              {/* <CodeIcon sx={{ fontSize: 50, color: "#2196F3", mb: 2 }} /> */}
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Developer Friendly
              </Typography>
              <Typography color="text.secondary">
                Clean, well-structured code following best practices
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 2,
              fontSize: "1.2rem",
              borderRadius: 2,
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
            }}
          >
            Explore Templates
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
