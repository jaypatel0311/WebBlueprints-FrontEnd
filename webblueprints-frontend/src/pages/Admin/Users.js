import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Tooltip,
  CircularProgress,
  Alert,
  InputAdornment,
  Divider,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  PersonAdd as PersonAddIcon,
  AdminPanelSettings as AdminIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";
import moment from "moment";
import axios from "axios";
import authHeader from "../../services/auth-header";
import api from "../../utils/axiosInterceptor";

const Users = () => {
  // State variables
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "",
    isActive: true,
  });

  const { enqueueSnackbar } = useSnackbar();

  // Fetch users on component mount and when dependencies change
  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage, searchTerm, sortBy, sortOrder]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simple GET request without pagination parameters
      const response = await api.get("/users");

      console.log("API Response:", response);

      // Assuming the API now returns a simple array of users
      const usersList = response?.data.users || [];

      setUsers(usersList);
      setTotalUsers(usersList.length);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (column) => {
    // If clicking on the current sort column, toggle order
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If clicking on a new column, set as the sort column with default desc order
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);

    // Convert filter to search term
    let searchValue = "";
    switch (event.target.value) {
      case "admin":
        searchValue = "role:admin";
        break;
      case "user":
        searchValue = "role:user";
        break;
      case "active":
        searchValue = "isActive:true";
        break;
      case "inactive":
        searchValue = "isActive:false";
        break;
      default:
        searchValue = "";
    }

    setSearchTerm(searchValue);
    setPage(0);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  // Close delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedUser(null);
  };

  // Delete user
  //   const handleDeleteUser = async () => {
  //     try {
  //       await axios.delete(`${API_URL}/admin/users/${selectedUser._id}`, {
  //         headers: authHeader(),
  //       });

  //       fetchUsers();
  //       enqueueSnackbar("User deleted successfully", { variant: "success" });
  //     } catch (err) {
  //       console.error("Error deleting user:", err);
  //       enqueueSnackbar(err.response?.data?.message || "Failed to delete user", {
  //         variant: "error",
  //       });
  //     } finally {
  //       setOpenDeleteDialog(false);
  //       setSelectedUser(null);
  //     }
  //   };

  // Open edit dialog
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    });
    setOpenEditDialog(true);
  };

  // Close edit dialog
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedUser(null);
  };

  // Handle form input change
  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  // Toggle active status
  const handleToggleActive = (event) => {
    setEditForm({
      ...editForm,
      isActive: event.target.checked,
    });
  };

  // Submit edit form
  //   const handleEditSubmit = async () => {
  //     try {
  //       await axios.put(`${API_URL}/admin/users/${selectedUser._id}`, editForm, {
  //         headers: authHeader(),
  //       });

  //       fetchUsers();
  //       enqueueSnackbar("User updated successfully", { variant: "success" });
  //     } catch (err) {
  //       console.error("Error updating user:", err);
  //       enqueueSnackbar(err.response?.data?.message || "Failed to update user", {
  //         variant: "error",
  //       });
  //     } finally {
  //       setOpenEditDialog(false);
  //       setSelectedUser(null);
  //     }
  //   };

  // Toggle user status directly from table
  //   const handleToggleStatus = async (user) => {
  //     try {
  //       await axios.patch(
  //         `${API_URL}/admin/users/${user._id}/status`,
  //         { isActive: !user.isActive },
  //         { headers: authHeader() }
  //       );

  //       fetchUsers();
  //       enqueueSnackbar(
  //         `User ${user.isActive ? "deactivated" : "activated"} successfully`,
  //         { variant: "success" }
  //       );
  //     } catch (err) {
  //       console.error("Error toggling user status:", err);
  //       enqueueSnackbar(
  //         err.response?.data?.message || "Failed to update user status",
  //         { variant: "error" }
  //       );
  //     }
  //   };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setFilter("all");
    setSortBy("createdAt");
    setSortOrder("desc");
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        User Management
      </Typography>

      {/* Filters and Search */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
          }}
        >
          <TextField
            label="Search Users"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ flexGrow: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="user-filter-label">Filter</InputLabel>
            <Select
              labelId="user-filter-label"
              id="user-filter"
              value={filter}
              label="Filter"
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All Users</MenuItem>
              <MenuItem value="active">Active Users</MenuItem>
              <MenuItem value="inactive">Inactive Users</MenuItem>
              <MenuItem value="admin">Admins</MenuItem>
              <MenuItem value="user">Regular Users</MenuItem>
            </Select>
          </FormControl>

          <Tooltip title="Reset filters">
            <IconButton onClick={handleResetFilters}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "block", md: "none" },
              height: 0,
            }}
          />

          <Button
            variant="contained"
            color="primary"
            startIcon={<PersonAddIcon />}
            sx={{
              borderRadius: 8,
              px: 3,
              textTransform: "none",
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            }}
          >
            Add User
          </Button>
        </Box>
      </Paper>

      {/* Main Content */}
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {error ? (
          <Alert severity="error" sx={{ m: 2 }}>
            {error}
            <Button color="inherit" size="small" onClick={fetchUsers}>
              Retry
            </Button>
          </Alert>
        ) : (
          <>
            <TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ fontWeight: "bold", cursor: "pointer" }}
                      onClick={() => handleSort("name")}
                    >
                      Name
                      {sortBy === "name" && (
                        <Box component="span" sx={{ ml: 1 }}>
                          {sortOrder === "asc" ? "▲" : "▼"}
                        </Box>
                      )}
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", cursor: "pointer" }}
                      onClick={() => handleSort("email")}
                    >
                      Email
                      {sortBy === "email" && (
                        <Box component="span" sx={{ ml: 1 }}>
                          {sortOrder === "asc" ? "▲" : "▼"}
                        </Box>
                      )}
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", cursor: "pointer" }}
                      onClick={() => handleSort("role")}
                    >
                      Role
                      {sortBy === "role" && (
                        <Box component="span" sx={{ ml: 1 }}>
                          {sortOrder === "asc" ? "▲" : "▼"}
                        </Box>
                      )}
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", cursor: "pointer" }}
                      onClick={() => handleSort("isActive")}
                    >
                      Status
                      {sortBy === "isActive" && (
                        <Box component="span" sx={{ ml: 1 }}>
                          {sortOrder === "asc" ? "▲" : "▼"}
                        </Box>
                      )}
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", cursor: "pointer" }}
                      onClick={() => handleSort("createdAt")}
                    >
                      Registered On
                      {sortBy === "createdAt" && (
                        <Box component="span" sx={{ ml: 1 }}>
                          {sortOrder === "asc" ? "▲" : "▼"}
                        </Box>
                      )}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                        <CircularProgress />
                        <Typography
                          variant="body2"
                          sx={{ mt: 2, color: "text.secondary" }}
                        >
                          Loading users...
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                        <Typography
                          variant="body1"
                          sx={{ color: "text.secondary" }}
                        >
                          No users found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow
                        key={user._id}
                        hover
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          bgcolor:
                            user.role === "admin"
                              ? "action.hover"
                              : "transparent",
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            {user.role === "admin" ? (
                              <AdminIcon
                                sx={{ mr: 1, color: "primary.main" }}
                              />
                            ) : (
                              <PersonIcon
                                sx={{ mr: 1, color: "text.secondary" }}
                              />
                            )}
                            {user.username}
                          </Box>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Chip
                            label={
                              user.role.charAt(0).toUpperCase() +
                              user.role.slice(1)
                            }
                            color={
                              user.role === "admin" ? "primary" : "default"
                            }
                            variant={
                              user.role === "admin" ? "filled" : "outlined"
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={
                              user.isActive !== false ? "Active" : "Inactive"
                            }
                            color={
                              user.isActive !== false ? "success" : "error"
                            }
                            variant={
                              user.isActive !== false ? "filled" : "outlined"
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {moment(user.createdAt).format("MMM D, YYYY")}
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip
                            title={user.isActive ? "Deactivate" : "Activate"}
                          >
                            <IconButton
                              size="small"
                              //   onClick={() => handleToggleStatus(user)}
                              color={user.isActive ? "error" : "success"}
                            >
                              {user.isActive ? (
                                <BlockIcon />
                              ) : (
                                <CheckCircleIcon />
                              )}
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              onClick={() => handleEditClick(user)}
                              color="primary"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteClick(user)}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                {loading ? "Loading..." : `${totalUsers} users total`}
              </Typography>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={totalUsers}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </>
        )}
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">{"Delete User?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete the user {selectedUser?.name}? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          {/* <Button onClick={handleDeleteUser} color="error" autoFocus>
            Delete
          </Button> */}
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit User</DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 2 }}>
          {selectedUser && (
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                value={editForm.name}
                onChange={handleEditFormChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={editForm.email}
                onChange={handleEditFormChange}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  value={editForm.role}
                  label="Role"
                  onChange={handleEditFormChange}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  name="isActive"
                  value={editForm.isActive}
                  label="Status"
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      isActive: e.target.value === "true",
                    })
                  }
                >
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button
            // onClick={handleEditSubmit}
            variant="contained"
            sx={{ borderRadius: 8, textTransform: "none" }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
