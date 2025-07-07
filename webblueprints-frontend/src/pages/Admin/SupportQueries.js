import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TablePagination,
  Tooltip,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  Reply as ReplyIcon,
  CheckCircle as ResolveIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";

const SupportQueries = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openReplyDialog, setOpenReplyDialog] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchSupportQueries();
  }, []);

  const fetchSupportQueries = async () => {
    try {
      setLoading(true);
      //   const response = await api.get("/admin/support-queries");
      //   setQueries(response.data);
    } catch (err) {
      setError("Failed to fetch support queries");
      console.error("Error fetching support queries:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (queryId, newStatus) => {
    try {
      //   await api.patch(`/admin/support-queries/${queryId}`, {
      //     status: newStatus,
      //   });
      setQueries(
        queries.map((query) =>
          query._id === queryId ? { ...query, status: newStatus } : query
        )
      );
      enqueueSnackbar("Status updated successfully", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Failed to update status", { variant: "error" });
    }
  };

  const handleReply = async () => {
    try {
      //   await api.post(`/admin/support-queries/${selectedQuery._id}/reply`, {
      //     message: replyMessage,
      //   });

      // Update status to replied
      setQueries(
        queries.map((query) =>
          query._id === selectedQuery._id
            ? { ...query, status: "replied", lastReply: new Date() }
            : query
        )
      );

      setOpenReplyDialog(false);
      setReplyMessage("");
      setSelectedQuery(null);
      enqueueSnackbar("Reply sent successfully", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Failed to send reply", { variant: "error" });
    }
  };

  const handleDelete = async (queryId) => {
    if (window.confirm("Are you sure you want to delete this query?")) {
      try {
        // await api.delete(`/admin/support-queries/${queryId}`);
        setQueries(queries.filter((query) => query._id !== queryId));
        enqueueSnackbar("Query deleted successfully", { variant: "success" });
      } catch (err) {
        enqueueSnackbar("Failed to delete query", { variant: "error" });
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "primary";
      case "in-progress":
        return "warning";
      case "replied":
        return "info";
      case "resolved":
        return "success";
      case "closed":
        return "default";
      default:
        return "default";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "technical":
        return "error";
      case "billing":
        return "warning";
      case "general":
        return "info";
      case "bug":
        return "error";
      case "feature":
        return "success";
      default:
        return "default";
    }
  };

  const filteredQueries = queries.filter(
    (query) => statusFilter === "all" || query.status === statusFilter
  );

  const paginatedQueries = filteredQueries.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading support queries...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 4 }}>
        Support Queries Management
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Filters */}
      <Box sx={{ mb: 3, display: "flex", gap: 2, alignItems: "center" }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={statusFilter}
            label="Filter by Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">All Statuses</MenuItem>
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="replied">Replied</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="body2" color="text.secondary">
          Total: {filteredQueries.length} queries
        </Typography>
      </Box>

      {/* Queries Table */}
      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "grey.50" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Subject</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedQueries.map((query) => (
                <TableRow key={query._id} hover>
                  <TableCell>
                    {new Date(query.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{query.name}</TableCell>
                  <TableCell>{query.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={query.category}
                      color={getCategoryColor(query.category)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                      {query.subject}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select
                        value={query.status}
                        onChange={(e) =>
                          handleStatusChange(query._id, e.target.value)
                        }
                        size="small"
                      >
                        <MenuItem value="new">New</MenuItem>
                        <MenuItem value="in-progress">In Progress</MenuItem>
                        <MenuItem value="replied">Replied</MenuItem>
                        <MenuItem value="resolved">Resolved</MenuItem>
                        <MenuItem value="closed">Closed</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={() => {
                            setSelectedQuery(query);
                            setOpenViewDialog(true);
                          }}
                        >
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Reply">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => {
                            setSelectedQuery(query);
                            setOpenReplyDialog(true);
                          }}
                        >
                          <ReplyIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Mark as Resolved">
                        <IconButton
                          size="small"
                          color="success"
                          onClick={() =>
                            handleStatusChange(query._id, "resolved")
                          }
                        >
                          <ResolveIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(query._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredQueries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>

      {/* View Query Dialog */}
      <Dialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Query Details</DialogTitle>
        <DialogContent>
          {selectedQuery && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedQuery.subject}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                From: {selectedQuery.name} ({selectedQuery.email})
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Category: {selectedQuery.category}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Date: {new Date(selectedQuery.createdAt).toLocaleString()}
              </Typography>
              <Box sx={{ mt: 2, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
                <Typography variant="body1">{selectedQuery.message}</Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog
        open={openReplyDialog}
        onClose={() => setOpenReplyDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Reply to Query</DialogTitle>
        <DialogContent>
          {selectedQuery && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                To: {selectedQuery.email}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Re: {selectedQuery.subject}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Your Reply"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                sx={{ mt: 2 }}
                placeholder="Type your reply here..."
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReplyDialog(false)}>Cancel</Button>
          <Button
            onClick={handleReply}
            variant="contained"
            disabled={!replyMessage.trim()}
            startIcon={<EmailIcon />}
          >
            Send Reply
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SupportQueries;
