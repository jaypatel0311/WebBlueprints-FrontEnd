import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  CircularProgress,
  Alert,
  FormControlLabel,
  Switch,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import api from "../../utils/axiosInterceptor";

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

const techStacks = [
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

const AddTemplate = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [],
    category: "",
    techStack: "",
    price: 0,
    isPremium: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleTagChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      tags: Array.isArray(event.target.value) ? event.target.value : [],
    }));
  };

  const [files, setFiles] = useState({
    previewImage: null,
    templateFiles: null,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      tags: [],
      category: "",
      techStack: "",
      price: 0,
      isPremium: false,
    });
    setFiles({
      previewImage: null,
      templateFiles: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Use FormData for file uploads and form fields
    const formDataToSend = new FormData();

    // Add each field to FormData individually
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("techStack", formData.techStack);
    formDataToSend.append("price", Number(formData.price));
    formDataToSend.append("isPremium", formData.isPremium);

    // Handle array fields with JSON.stringify
    if (formData.tags && formData.tags.length > 0) {
      formDataToSend.append("tags", JSON.stringify(formData.tags));
    }

    // Add files
    if (files.previewImage) {
      formDataToSend.append("previewImage", files.previewImage);
    }
    if (files.templateFiles) {
      formDataToSend.append("templateFiles", files.templateFiles);
    }

    try {
      await api.post("/templates", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Template created successfully!");
      resetForm();
    } catch (err) {
      const errorMessage = err.response?.data?.message;
      setError(
        Array.isArray(errorMessage)
          ? errorMessage.join(", ")
          : errorMessage || "Failed to create template"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (type) => (event) => {
    setFiles((prev) => ({
      ...prev,
      [type]: event.target.files[0],
    }));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Add New Template
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Template Name"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            select
            fullWidth
            label="Tags"
            name="tags"
            value={formData.tags}
            onChange={handleTagChange}
            SelectProps={{
              multiple: true,
            }}
            sx={{ mb: 2 }}
          >
            {tags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            inputProps={{
              step: "0.01",
              min: "0",
            }}
            value={formData.price}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              const price = isNaN(value) ? 0 : Math.max(0, value);

              // Automatically set isPremium if price > 0
              setFormData((prev) => ({
                ...prev,
                price,
                isPremium: price > 0 ? true : prev.isPremium,
              }));
            }}
            required
            helperText="Templates with price greater than 0 are automatically marked as premium"
            sx={{ mb: 2 }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={formData.isPremium || formData.price > 0}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isPremium: formData.price > 0 ? true : e.target.checked,
                  })
                }
                disabled={formData.price > 0}
              />
            }
            label={
              <>
                Premium Template
                {formData.price > 0 && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    (Auto-enabled for paid templates)
                  </Typography>
                )}
              </>
            }
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            label="Tech Stack"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            sx={{ mb: 2 }}
          >
            {techStacks.map((tech) => (
              <MenuItem key={tech} value={tech}>
                {tech}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Preview Image</Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ mr: 2 }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange("previewImage")}
              />
            </Button>
            {files.previewImage && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {files.previewImage.name}
              </Typography>
            )}
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Template Files (ZIP)</Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              Upload Files
              <input
                type="file"
                hidden
                accept=".zip"
                onChange={handleFileChange("templateFiles")}
              />
            </Button>
            {files.templateFiles && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {files.templateFiles.name}
              </Typography>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              color: "white",
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Add Template"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddTemplate;
