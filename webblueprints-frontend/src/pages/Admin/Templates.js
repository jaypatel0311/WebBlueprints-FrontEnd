import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import api from "../../utils/axiosInterceptor";

const AdminTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const response = await api.get("/templates");
      setTemplates(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch templates");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      try {
        await api.delete(`/templates/${id}`);
        await fetchTemplates();
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete template");
      }
    }
  };

  const filteredTemplates = templates.filter((template) =>
    template.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Templates
        </Typography>
        <Button
          component={Link}
          to="/admin/templates/add"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            color: "white",
          }}
        >
          Add Template
        </Button>
      </Box>

      <TextField
        fullWidth
        label="Search Templates"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Tech Stack</TableCell>
              <TableCell>Premium</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filteredTemplates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No templates found
                </TableCell>
              </TableRow>
            ) : (
              filteredTemplates.map((template) => (
                <TableRow key={template._id}>
                  <TableCell>{template.title}</TableCell>
                  <TableCell>{template.category}</TableCell>
                  <TableCell>
                    {template.price === 0 ? "FREE" : `$${template.price}`}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={template.techStack}
                      size="small"
                      sx={{
                        background:
                          "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                        color: "white",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {template.isPremium ? (
                      <Chip label="Premium" color="primary" size="small" />
                    ) : (
                      <Chip label="Free" size="small" />
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      component={Link}
                      to={`/admin/templates/edit/${template._id}`}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(template._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminTemplates;
