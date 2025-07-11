import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  TextField,
  Divider,
  Paper,
  CircularProgress,
  Alert,
  Snackbar,
  Button,
  Chip,
} from "@mui/material";
import TemplateCard from "../../components/common/TemplateCard";
import { useEffect, useState } from "react";
import api from "../../utils/axiosInterceptor";
import { useCart } from "../../context/cartContext";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const categories = [
  "Website Templates",
  "Email Templates",
  "Landing Pages",
  "Admin Dashboards",
  "Portfolio Templates",
  "E-commerce Templates",
  "Blog Templates",
  "Resume/CV Templates",
  "Event Templates",
  "Mobile App Templates",
  "Newsletter Templates",
  "SaaS Product Templates",
  "One Page Templates",
  "Coming Soon Templates",
  "Documentation Templates",
  "CRM Templates",
  "Marketing Templates",
  "Business Templates",
  "Real Estate Templates",
  "Restaurant/Food Templates",
];
const tags = [
  "Responsive",
  "Dark Theme",
  "Light Theme",
  "Modern",
  "Minimal",
  "Creative",
  "Professional",
  "Animated",
  "Mobile-First",
  "SEO Friendly",
];
const priceRanges = [
  { label: "Free", value: "free" },
  { label: "$0 – $10", value: "under10" },
  { label: "$10 – $50", value: "10to50" },
  { label: "$50+", value: "50plus" },
];
const sortOptions = [
  { label: "Most Downloaded", value: "downloads" },
  { label: "Highest Rated", value: "rating" },
  { label: "Latest Templates", value: "latest" },
  { label: "Oldest First", value: "oldest" },
];
const techStack = [
  "HTML/CSS",
  "React",
  "Vue",
  "Angular",
  "Bootstrap",
  "Tailwind CSS",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "PHP",
  "WordPress",
  "Django",
  "Flask",
  "Ruby on Rails",
  "ASP.NET",
];

function Templates() {
  // Filter state
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedTech, setSelectedTech] = useState([]);
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const response = await api.get("/templates");

        const publishedTemplates = response.data.templates.filter(
          (template) => template.status === "published"
        );

        setTemplates(publishedTemplates);
      } catch (err) {
        setError("Failed to fetch templates");
        console.error("Error fetching templates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const filterContent = (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 2,
        position: { md: "sticky" },
        top: { md: 100 },
        height: "100%",
        overflowY: "auto",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <TextField
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        variant="outlined"
        placeholder="Search by name, category or tags..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            },
            "&.Mui-focused": {
              boxShadow: "0 4px 12px rgba(33, 150, 243, 0.15)",
            },
          },
        }}
      />
      <FormControl
        fullWidth
        variant="outlined"
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            },
            "&.Mui-focused": {
              boxShadow: "0 4px 12px rgba(33, 150, 243, 0.15)",
            },
          },
          "& .MuiInputLabel-root": {
            fontWeight: 500,
          },
        }}
      >
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          label="Category"
          onChange={(e) => setSelectedCategory(e.target.value)}
          MenuProps={{
            PaperProps: {
              elevation: 3,
              sx: {
                maxHeight: 300,
                borderRadius: 2,
                mt: 0.5,
              },
            },
          }}
        >
          <MenuItem value="">
            <em>All Categories</em>
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem
              key={cat}
              value={cat}
              sx={{
                borderRadius: 1,
                m: 0.5,
                "&:hover": {
                  backgroundColor: "rgba(33, 150, 243, 0.08)",
                },
                "&.Mui-selected": {
                  backgroundColor: "rgba(33, 150, 243, 0.12)",
                  "&:hover": {
                    backgroundColor: "rgba(33, 150, 243, 0.18)",
                  },
                },
              }}
            >
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormGroup sx={{ mb: 3 }}>
        <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1.5 }}>
          Tags
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {tags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <Chip
                key={tag}
                label={tag}
                clickable
                size="small"
                onClick={() => {
                  setSelectedTags(
                    isSelected
                      ? selectedTags.filter((t) => t !== tag)
                      : [...selectedTags, tag]
                  );
                }}
                sx={{
                  borderRadius: "16px",
                  transition: "all 0.2s ease",
                  backgroundColor: isSelected
                    ? "primary.main"
                    : "background.paper",
                  color: isSelected ? "white" : "text.primary",
                  border: isSelected ? "none" : "1px solid #e0e0e0",
                  "&:hover": {
                    backgroundColor: isSelected
                      ? "primary.dark"
                      : "rgba(33, 150, 243, 0.08)",
                    transform: "translateY(-2px)",
                    boxShadow: isSelected
                      ? "0 2px 5px rgba(33, 150, 243, 0.3)"
                      : "none",
                  },
                }}
              />
            );
          })}
        </Box>
      </FormGroup>
      <FormControl
        fullWidth
        variant="outlined"
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            },
            "&.Mui-focused": {
              boxShadow: "0 4px 12px rgba(33, 150, 243, 0.15)",
            },
          },
          "& .MuiInputLabel-root": {
            fontWeight: 500,
          },
        }}
      >
        <InputLabel>Price</InputLabel>
        <Select
          value={selectedPrice}
          label="Price"
          onChange={(e) => setSelectedPrice(e.target.value)}
          MenuProps={{
            PaperProps: {
              elevation: 3,
              sx: {
                maxHeight: 300,
                borderRadius: 2,
                mt: 0.5,
              },
            },
          }}
        >
          <MenuItem value="" sx={{ fontStyle: "italic" }}>
            All Price Ranges
          </MenuItem>
          {priceRanges.map((pr) => (
            <MenuItem
              key={pr.value}
              value={pr.value}
              sx={{
                borderRadius: 1,
                m: 0.5,
                "&:hover": {
                  backgroundColor: "rgba(33, 150, 243, 0.08)",
                },
                "&.Mui-selected": {
                  backgroundColor: "rgba(33, 150, 243, 0.12)",
                  "&:hover": {
                    backgroundColor: "rgba(33, 150, 243, 0.18)",
                  },
                },
              }}
            >
              {pr.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        fullWidth
        variant="outlined"
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            },
            "&.Mui-focused": {
              boxShadow: "0 4px 12px rgba(33, 150, 243, 0.15)",
            },
          },
          "& .MuiInputLabel-root": {
            fontWeight: 500,
          },
        }}
      >
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          label="Sort By"
          onChange={(e) => setSortBy(e.target.value)}
          MenuProps={{
            PaperProps: {
              elevation: 3,
              sx: {
                maxHeight: 300,
                borderRadius: 2,
                mt: 0.5,
              },
            },
          }}
        >
          <MenuItem value="" sx={{ fontStyle: "italic" }}>
            Default Order
          </MenuItem>
          {sortOptions.map((opt) => (
            <MenuItem
              key={opt.value}
              value={opt.value}
              sx={{
                borderRadius: 1,
                m: 0.5,
                "&:hover": {
                  backgroundColor: "rgba(33, 150, 243, 0.08)",
                },
                "&.Mui-selected": {
                  backgroundColor: "rgba(33, 150, 243, 0.12)",
                  "&:hover": {
                    backgroundColor: "rgba(33, 150, 243, 0.18)",
                  },
                },
              }}
            >
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormGroup sx={{ mb: 3 }}>
        <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1.5 }}>
          Tech Stack
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {techStack.map((tech) => {
            const isSelected = selectedTech.includes(tech);
            return (
              <Chip
                key={tech}
                label={tech}
                clickable
                size="small"
                onClick={() => {
                  setSelectedTech(
                    isSelected
                      ? selectedTech.filter((t) => t !== tech)
                      : [...selectedTech, tech]
                  );
                }}
                sx={{
                  borderRadius: "16px",
                  transition: "all 0.2s ease",
                  backgroundColor: isSelected
                    ? "primary.main"
                    : "background.paper",
                  color: isSelected ? "white" : "text.primary",
                  border: isSelected ? "none" : "1px solid #e0e0e0",
                  "&:hover": {
                    backgroundColor: isSelected
                      ? "primary.dark"
                      : "rgba(33, 150, 243, 0.08)",
                    transform: "translateY(-2px)",
                    boxShadow: isSelected
                      ? "0 2px 5px rgba(33, 150, 243, 0.3)"
                      : "none",
                  },
                }}
              />
            );
          })}
        </Box>
      </FormGroup>
    </Paper>
  );

  // Add to cart handler
  const handleAddToCart = (template) => {
    addToCart(template);
    setSnackbar({
      open: true,
      message: `${template.title} added to cart!`,
      severity: "success",
    });
  };

  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Filtering logic
  const filteredTemplates = templates.filter((tpl) => {
    // Safely handle potentially missing properties
    const templateTags = tpl.tags || [];
    const templateTitle = tpl.title || "";
    const templateDescription = tpl.description || "";

    // Category filter
    if (selectedCategory && tpl.category !== selectedCategory) return false;

    // Tags filter - show templates that have ANY of the selected tags
    if (
      selectedTags.length > 0 &&
      !selectedTags.some((tag) => templateTags.includes(tag))
    ) {
      return false;
    }

    // Tech stack filter
    if (
      selectedTech.length > 0 &&
      !selectedTech.some((tech) => templateTags.includes(tech))
    ) {
      return false;
    }

    // Price filter
    if (selectedPrice) {
      console.log("Selected Price:", selectedPrice);

      // Convert price to cents to avoid floating point issues
      const priceInCents = Math.round((Number(tpl.price) || 0) * 100);

      switch (selectedPrice) {
        case "free":
          if (priceInCents > 0) return false;
          break;
        case "under10":
          if (priceInCents === 0 || priceInCents >= 1000) return false;
          break;
        case "10to50":
          if (priceInCents < 1000 || priceInCents > 5000) return false;
          break;
        case "50plus":
          if (priceInCents <= 5000) return false;
          break;
        default:
          // If using exact price matching
          const selectedPriceInCents = Math.round(Number(selectedPrice) * 100);
          if (priceInCents !== selectedPriceInCents) return false;
      }
    }

    // Enhanced search - check title, description, and tags
    if (search) {
      const searchTerm = search.toLowerCase();
      const titleMatch = templateTitle.toLowerCase().includes(searchTerm);
      const descriptionMatch = templateDescription
        .toLowerCase()
        .includes(searchTerm);
      const tagMatch = templateTags.some((tag) =>
        tag.toLowerCase().includes(searchTerm)
      );

      if (!titleMatch && !descriptionMatch && !tagMatch) return false;
    }

    return true;
  });

  return (
    <Box p={3} sx={{ backgroundColor: "#f5f5f5" }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  my: 3,
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  position: "relative",
                  display: "inline-block",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "60%",
                    height: "4px",
                    bottom: "-10px",
                    left: "0",
                    background:
                      "linear-gradient(90deg, #2196F3 0%, rgba(33, 203, 243, 0) 100%)",
                    borderRadius: "2px",
                  },
                }}
              >
                Templates Collection
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mt: 1, mb: 3 }}
            >
              Discover professionally designed templates for your next project
            </Typography>
          </Box>
          {isMobile && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <Button
                startIcon={<FilterListIcon />}
                variant="outlined"
                onClick={() => setFilterDrawerOpen(true)}
              >
                Filters
              </Button>
            </Box>
          )}
          <Grid container spacing={3}>
            {!isMobile && <Grid size={{ xs: 12, md: 3 }}>{filterContent}</Grid>}
            {/* Templates Grid */}
            <Grid size={{ xs: 12, md: isMobile ? 12 : 9 }}>
              <Grid container spacing={2}>
                {/* Template cards */}
                {filteredTemplates.map((template) => (
                  <Grid
                    key={template._id}
                    size={{ xs: 12, sm: 6, md: 4 }}
                    onClick={() => navigate(`/templates/${template._id}`)}
                  >
                    <TemplateCard
                      template={template}
                      onAddToCart={handleAddToCart}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
      <Drawer
        anchor="right"
        open={filterDrawerOpen && isMobile}
        onClose={() => setFilterDrawerOpen(false)}
      >
        <Box sx={{ width: 300, p: 1 }}>{filterContent}</Box>
      </Drawer>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          elevation={6}
          variant="filled"
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Templates;
