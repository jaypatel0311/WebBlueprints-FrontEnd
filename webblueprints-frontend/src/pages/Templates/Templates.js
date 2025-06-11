import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
  Divider,
  Paper,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import TemplateCard from "../../components/common/TemplateCard";
import { useEffect, useState } from "react";
import api from "../../utils/axiosInterceptor";
import { useCart } from "../../context/cartContext";

const categories = [
  "Portfolio",
  "Business",
  "E-commerce",
  "Blog",
  "Landing Page",
  "Agency",
  "Resume/CV",
];
const tags = [
  "Minimal",
  "Dark theme",
  "Responsive",
  "Animation",
  "Bootstrap",
  "Tailwind",
  "React",
];
const priceRanges = [
  { label: "Free", value: "free" },
  { label: "$0 – $10", value: "0-10" },
  { label: "$10 – $50", value: "10-50" },
  { label: "$50+", value: "50+" },
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
  "Tailwind",
];
const colorSchemes = ["Dark", "Light", "Colorful"];

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
  const [responsiveOnly, setResponsiveOnly] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const response = await api.get("/templates");
        setTemplates(response.data);
      } catch (err) {
        setError("Failed to fetch templates");
        console.error("Error fetching templates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

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
    if (selectedCategory && tpl.category !== selectedCategory) return false;
    if (
      selectedTags.length &&
      !selectedTags.every((tag) => tpl.tags.includes(tag))
    )
      return false;
    if (responsiveOnly && !tpl.tags.includes("Responsive")) return false;
    if (
      selectedTech.length &&
      !selectedTech.some((tech) => tpl.tags.includes(tech))
    )
      return false;
    if (selectedColor && tpl.colorScheme !== selectedColor) return false;
    if (selectedPrice && tpl.price !== selectedPrice) return false;
    if (search && !tpl.title.toLowerCase().includes(search.toLowerCase()))
      return false;
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
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              my: 3,
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Templates
          </Typography>
          <Grid container spacing={2}>
            {/* Filter Sidebar */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  mb: 4,
                  position: { md: "sticky" },
                  top: { md: 100 },
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Filters
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <TextField
                  label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={selectedCategory}
                    label="Category"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <MenuItem value="">All</MenuItem>
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormGroup sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">Tags</Typography>
                  <Grid container spacing={0.5}>
                    {tags.map((tag) => (
                      <Grid size={6} key={tag} sx={{ display: "flex" }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedTags.includes(tag)}
                              onChange={(e) => {
                                setSelectedTags(
                                  e.target.checked
                                    ? [...selectedTags, tag]
                                    : selectedTags.filter((t) => t !== tag)
                                );
                              }}
                            />
                          }
                          label={tag}
                          sx={{ flex: 1, m: 0 }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </FormGroup>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Price</InputLabel>
                  <Select
                    value={selectedPrice}
                    label="Price"
                    onChange={(e) => setSelectedPrice(e.target.value)}
                  >
                    <MenuItem value="">All</MenuItem>
                    {priceRanges.map((pr) => (
                      <MenuItem key={pr.value} value={pr.value}>
                        {pr.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    label="Sort By"
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <MenuItem value="">Default</MenuItem>
                    {sortOptions.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormGroup sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">Tech Stack</Typography>
                  <Grid container spacing={0.5}>
                    {techStack.map((tech) => (
                      <Grid size={6} key={tech} sx={{ display: "flex" }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedTech.includes(tech)}
                              onChange={(e) => {
                                setSelectedTech(
                                  e.target.checked
                                    ? [...selectedTech, tech]
                                    : selectedTech.filter((t) => t !== tech)
                                );
                              }}
                            />
                          }
                          label={tech}
                          sx={{ flex: 1, m: 0 }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={responsiveOnly}
                      onChange={(e) => setResponsiveOnly(e.target.checked)}
                    />
                  }
                  label="Responsive Only"
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Color Scheme</InputLabel>
                  <Select
                    value={selectedColor}
                    label="Color Scheme"
                    onChange={(e) => setSelectedColor(e.target.value)}
                  >
                    <MenuItem value="">All</MenuItem>
                    {colorSchemes.map((color) => (
                      <MenuItem key={color} value={color}>
                        {color}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Paper>
            </Grid>
            {/* Templates Grid */}
            <Grid size={{ xs: 12, md: 9 }}>
              <Grid container spacing={2}>
                {filteredTemplates.map((template) => (
                  <Grid key={template._id} size={{ xs: 12, sm: 6, md: 4 }}>
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
