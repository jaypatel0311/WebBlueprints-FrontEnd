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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import api from "../../utils/axiosInterceptor";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const AdminTemplates = () => {
  // Add tabValue state to switch between all and pending templates
  const [tabValue, setTabValue] = useState(0);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // Add states for status dialog
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [statusAction, setStatusAction] = useState("");
  const [adminComment, setAdminComment] = useState("");

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const response = await api.get("/templates");
      console.log("Fetched templates:", response);

      setTemplates(response.data.templates || []);
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

  // Handle status change dialog
  const handleStatusClick = (template, action) => {
    setSelectedTemplate(template);
    setStatusAction(action);
    setAdminComment("");
    setStatusDialogOpen(true);
  };

  // Update template status
  const handleStatusChange = async () => {
    if (!selectedTemplate) return;

    try {
      const newStatus = statusAction === "approve" ? "published" : "rejected";

      await api.patch(`/templates/${selectedTemplate._id}/status`, {
        status: newStatus,
        adminComment,
      });

      setStatusDialogOpen(false);
      await fetchTemplates();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update template status"
      );
    }
  };

  // Filter templates based on search and tab value
  const filteredTemplates = templates.filter((template) => {
    // Filter by tab
    if (tabValue === 1 && template.status !== "pending") return false;

    // Filter by search
    if (
      search &&
      !template.title.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  // Count pending templates
  const pendingCount = templates.filter((t) => t.status === "pending").length;

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

      {/* Add tabs for filtering by pending status */}
      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label="All Templates" />
        <Tab
          label={`Pending Review (${pendingCount})`}
          sx={pendingCount > 0 ? { color: "warning.main" } : {}}
        />
      </Tabs>

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
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filteredTemplates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
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
                    {template.status ? (
                      <Chip
                        label={
                          template.status.charAt(0).toUpperCase() +
                          template.status.slice(1)
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
                    ) : (
                      <Chip label="Unknown" size="small" color="default" />
                    )}
                  </TableCell>
                  <TableCell>
                    {template.status === "pending" ? (
                      <>
                        <IconButton
                          color="success"
                          onClick={() => handleStatusClick(template, "approve")}
                          title="Approve Template"
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleStatusClick(template, "reject")}
                          title="Reject Template"
                        >
                          <CloseIcon />
                        </IconButton>
                      </>
                    ) : null}

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

      {/* Status change dialog */}
      <ConfirmDialog
        open={statusDialogOpen}
        onClose={() => setStatusDialogOpen(false)}
        title={
          statusAction === "approve" ? "Approve Template" : "Reject Template"
        }
        content={
          <Box>
            <Typography mb={2}>
              {statusAction === "approve"
                ? "Are you sure you want to approve this template?"
                : "Are you sure you want to reject this template?"}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Comments (optional)"
              value={adminComment}
              onChange={(e) => setAdminComment(e.target.value)}
              variant="outlined"
            />
          </Box>
        }
        onConfirm={handleStatusChange}
        confirmText={statusAction === "approve" ? "Approve" : "Reject"}
      />
    </Box>
  );
};

export default AdminTemplates;
