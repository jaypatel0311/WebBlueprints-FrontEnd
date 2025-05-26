import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
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
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import PreviewIcon from "@mui/icons-material/Preview";
import Image1 from "../../assets/minimalist-portfolio.png";
import Image2 from "../../assets/tech-portfolio.png";
import { useState } from "react";

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

const portfolioTemplates = [
  {
    id: 1,
    title: "Modern Minimalist",
    description: "Clean and modern portfolio template with minimalist design",
    image: Image1,
    tags: ["React", "Material UI", "Responsive", "Minimal"],
    category: "Portfolio",
    price: "free",
    colorScheme: "Light",
    demoLink: "#",
    codeLink: "#",
  },
  {
    id: 2,
    title: "Creative Portfolio",
    description: "Professional portfolio template with dark mode support",
    image: Image2,
    tags: ["Dark theme", "Animation", "Portfolio", "React"],
    category: "Portfolio",
    price: "0-10",
    colorScheme: "Dark",
    demoLink: "#",
    codeLink: "#",
  },
];

function Templates() {
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedTech, setSelectedTech] = useState([]);
  const [responsiveOnly, setResponsiveOnly] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [search, setSearch] = useState("");

  // Filtering logic
  const filteredTemplates = portfolioTemplates.filter((tpl) => {
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
        Portfolio Templates
      </Typography>
      <Grid container spacing={4}>
        {/* Filter Sidebar */}
        <Grid item xs={12} md={3}>
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
              {tags.map((tag) => (
                <FormControlLabel
                  key={tag}
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
                />
              ))}
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
              {techStack.map((tech) => (
                <FormControlLabel
                  key={tech}
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
                />
              ))}
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
            <TextField
              label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Paper>
        </Grid>
        {/* Templates Grid */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={4}>
            {filteredTemplates.map((template) => (
              <Grid
                item
                key={template.id}
                xs={12}
                sm={6}
                md={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "stretch",
                }}
              >
                <Card
                  sx={{
                    width: "100%",
                    minHeight: 480,
                    maxHeight: 480,
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-8px)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={template.image}
                    alt={template.title}
                    sx={{
                      height: 200,
                      objectFit: "cover",
                      objectPosition: "top",
                      borderBottom: "1px solid rgba(0,0,0,0.1)",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {template.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {template.description}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                      {template.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            background:
                              "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                            color: "white",
                          }}
                        />
                      ))}
                    </Stack>
                  </CardContent>
                  <CardActions sx={{ p: 2 }}>
                    <Button
                      size="small"
                      startIcon={<PreviewIcon />}
                      href={template.demoLink}
                      target="_blank"
                      sx={{ mr: 1 }}
                    >
                      Live Demo
                    </Button>
                    <Button
                      size="small"
                      startIcon={<CodeIcon />}
                      href={template.codeLink}
                      target="_blank"
                    >
                      View Code
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Templates;
