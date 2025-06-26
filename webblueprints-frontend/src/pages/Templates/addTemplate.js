import React, { useEffect, useState } from "react";
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
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import api from "../../utils/axiosInterceptor";
import { useAuth } from "../../context/authContext";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
  const { user } = useAuth();
  const isAdmin = user?.user?.role === "admin";

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
  const [mySubmissions, setMySubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [submissionsError, setSubmissionsError] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const fetchMySubmissions = async () => {
    setLoadingSubmissions(true);
    setSubmissionsError("");

    try {
      const response = await api.get("/templates/my-submissions");

      setMySubmissions(response.data.templates || []);
      console.log("Fetched my submissions:", response.data.templates);
    } catch (err) {
      console.error("Error fetching submissions:", err);
      setSubmissionsError(
        err.response?.data?.message || "Failed to fetch your submissions"
      );
    } finally {
      setLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    fetchMySubmissions();
  }, []);

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

    const formDataToSend = new FormData();

    // Add form fields
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("techStack", formData.techStack);
    formDataToSend.append("price", Number(formData.price));
    formDataToSend.append("isPremium", formData.isPremium);
    formDataToSend.append("status", isAdmin ? "published" : "pending");

    // Handle array fields with JSON.stringify
    if (formData.tags && formData.tags.length > 0) {
      formDataToSend.append("tags", JSON.stringify(formData.tags));
    }

    // Append files
    if (files.previewImage)
      formDataToSend.append("previewImage", files.previewImage);
    if (files.templateFiles)
      formDataToSend.append("templateFiles", files.templateFiles);

    try {
      await api.post("/templates", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(
        isAdmin
          ? "Template added successfully!"
          : "Template submitted for review successfully!"
      );
      resetForm();
      fetchMySubmissions();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload template");
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
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 3 }}>
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
        >
          {!isAdmin && (
            <Tab
              icon={<VisibilityIcon />}
              label="All Submissions"
              iconPosition="start"
            />
          )}

          <Tab
            icon={<AddIcon />}
            label="Submit New Template"
            iconPosition="start"
          />
        </Tabs>
      </Paper>
      <Paper sx={{ p: 4 }}>
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
        {/* Tab panels */}
        {activeTab === 0 ? (
          // My Submissions Panel
          <Box>
            {submissionsError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {submissionsError}
              </Alert>
            )}

            {loadingSubmissions ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : Array.isArray(mySubmissions) && mySubmissions.length > 0 ? (
              <TableContainer component={Paper} sx={{ mb: 3 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Template</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Submitted On</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Feedback</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mySubmissions.map((template) => (
                      <TableRow key={template._id}>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            {template.previewImageUrl && (
                              <Box
                                component="img"
                                src={template.previewImageUrl}
                                alt={template.title}
                                sx={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 1,
                                  mr: 2,
                                }}
                              />
                            )}
                            <Typography fontWeight="medium">
                              {template.title}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{template.category}</TableCell>
                        <TableCell>
                          {new Date(template.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={
                              template.status?.charAt(0).toUpperCase() +
                                template.status?.slice(1) || "Unknown"
                            }
                            size="small"
                            color={
                              template.status === "published"
                                ? "success"
                                : template.status === "pending"
                                ? "warning"
                                : "error"
                            }
                          />
                        </TableCell>
                        <TableCell>{template.adminComment || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Paper sx={{ p: 4, textAlign: "center" }}>
                <Typography color="text.secondary" paragraph>
                  You haven't submitted any templates yet.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setActiveTab(1)}
                  startIcon={<AddIcon />}
                >
                  Submit Your First Template
                </Button>
              </Paper>
            )}

            {/* Button to add more templates when they already have submissions */}
            {Array.isArray(mySubmissions) && mySubmissions.length > 0 && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setActiveTab(1)}
                sx={{ mt: 2 }}
              >
                Submit Another Template
              </Button>
            )}
          </Box>
        ) : (
          // Submit Template Form Panel
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              {isAdmin ? "Add New Template" : "Submit Template for Review"}
            </Typography>
            {!isAdmin && (
              <Alert severity="info" sx={{ mb: 3 }}>
                Your template submission will be reviewed by our team before
                being published.
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
                fullWidth
                disabled={loading}
                sx={{ mt: 3, py: 1.5 }}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : isAdmin ? (
                  "Create Template"
                ) : (
                  "Submit for Review"
                )}
              </Button>
            </Box>
          </Box>
        )}

        {/* <Box sx={{ mt: 6, mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            My Submissions
          </Typography>

          {submissionsError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {submissionsError}
            </Alert>
          )}

          {loadingSubmissions ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : mySubmissions.length === 0 ? (
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography color="text.secondary">
                You haven't submitted any templates yet.
              </Typography>
            </Paper>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Submitted On</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Admin Feedback</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(mySubmissions) ? (
                    mySubmissions.map((submission) => (
                      <TableRow key={submission._id}>
                        <TableCell>{submission.title}</TableCell>
                        <TableCell>{submission.category}</TableCell>
                        <TableCell>
                          {new Date(submission.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={
                              submission.status.charAt(0).toUpperCase() +
                              submission.status.slice(1)
                            }
                            color={
                              submission.status === "published"
                                ? "success"
                                : submission.status === "pending"
                                ? "warning"
                                : "error"
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{submission.adminComment || "-"}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No submissions found or data format error
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box> */}
      </Paper>
    </Box>
  );
};

export default AddTemplate;
