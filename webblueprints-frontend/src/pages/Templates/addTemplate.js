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
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const categories = [
  "Website Templates",
  "Email Templates",
  "Landing Pages",
  "Admin Dashboards",
];

const AddTemplate = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [templateFiles, setTemplateFiles] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      if (thumbnail) formDataToSend.append("thumbnail", thumbnail);
      if (templateFiles) formDataToSend.append("templateFiles", templateFiles);
      previewImages.forEach((image) => {
        formDataToSend.append("previewImages", image);
      });

      // Add your API call here
      setSuccess("Template added successfully!");
    } catch (err) {
      setError(err.message || "Failed to add template");
    } finally {
      setLoading(false);
    }
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
            name="name"
            value={formData.name}
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
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
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

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Thumbnail Image</Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              Upload Thumbnail
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files[0])}
              />
            </Button>
            {thumbnail && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {thumbnail.name}
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
              Upload Template Files
              <input
                type="file"
                hidden
                accept=".zip"
                onChange={(e) => setTemplateFiles(e.target.files[0])}
              />
            </Button>
            {templateFiles && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {templateFiles.name}
              </Typography>
            )}
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Preview Images</Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              Upload Preview Images
              <input
                type="file"
                hidden
                accept="image/*"
                multiple
                onChange={(e) => setPreviewImages([...e.target.files])}
              />
            </Button>
            {previewImages.length > 0 && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {previewImages.length} images selected
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
