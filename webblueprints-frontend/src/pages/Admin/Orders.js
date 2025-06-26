import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Button,
  IconButton,
  TextField,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Card,
  CardContent,
  Divider,
  Avatar,
  Stack,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  InputAdornment,
  Tab,
  Tabs,
  Tooltip,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  useTheme,
  alpha,
  Alert,
  ListItemAvatar,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Visibility as VisibilityIcon,
  Receipt as ReceiptIcon,
  LocalShipping as ShippingIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Refresh as RefreshIcon,
  InsertDriveFile as FileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import api from "../../utils/axiosInterceptor";
import { useSnackbar } from "notistack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import moment from "moment";

const Orders = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  // State variables
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalOrders, setTotalOrders] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [dateRange, setDateRange] = useState([null, null]);
  const [tabValue, setTabValue] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewOrderDialog, setViewOrderDialog] = useState(false);
  const [updateStatusDialog, setUpdateStatusDialog] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [statusNote, setStatusNote] = useState("");
  const [error, setError] = useState(null);

  // Order statuses
  const orderStatuses = [
    { value: "all", label: "All Orders" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
    { value: "refunded", label: "Refunded" },
  ];

  // Tab options
  const tabs = [
    { value: 0, label: "All Orders", count: totalOrders },
    {
      value: 1,
      label: "Pending",
      count: orders.filter((o) => o.status === "pending").length,
    },
    {
      value: 2,
      label: "Completed",
      count: orders.filter((o) => o.status === "completed").length,
    },
    {
      value: 3,
      label: "Cancelled",
      count: orders.filter((o) => o.status === "cancelled").length,
    },
  ];

  // Fetch orders
  //   useEffect(() => {
  //     fetchOrders();
  //   }, [page, rowsPerPage, searchTerm, filterStatus, sortField, sortDirection]);

  //   const fetchOrders = async () => {
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       const response = await api.get("/orders", {
  //         params: {
  //           page: page + 1,
  //           limit: rowsPerPage,
  //           search: searchTerm,
  //           status: filterStatus !== "all" ? filterStatus : undefined,
  //           sortBy: sortField,
  //           sortOrder: sortDirection,
  //           startDate: dateRange[0]
  //             ? moment().format(dateRange[0], "yyyy-MM-dd")
  //             : undefined,
  //           endDate: dateRange[1]
  //             ? moment().format(dateRange[1], "yyyy-MM-dd")
  //             : undefined,
  //         },
  //       });

  //       setOrders(response.data.orders);
  //       setTotalOrders(response.data.total);
  //     } catch (err) {
  //       console.error("Error fetching orders:", err);
  //       setError(err.response?.data?.message || "Failed to load orders");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Search and filter handlers
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleStatusFilterChange = (event) => {
    setFilterStatus(event.target.value);
    setPage(0);
  };

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);

    // Map tab value to status filter
    switch (newValue) {
      case 1:
        setFilterStatus("pending");
        break;
      case 2:
        setFilterStatus("completed");
        break;
      case 3:
        setFilterStatus("cancelled");
        break;
      default:
        setFilterStatus("all");
    }

    setPage(0);
  };

  // Sort handlers
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // View order details
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setViewOrderDialog(true);
  };

  const handleCloseViewDialog = () => {
    setViewOrderDialog(false);
    setSelectedOrder(null);
  };

  // Update order status
  const handleOpenUpdateStatus = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setUpdateStatusDialog(true);
  };

  const handleCloseUpdateStatus = () => {
    setUpdateStatusDialog(false);
    setSelectedOrder(null);
    setNewStatus("");
    setStatusNote("");
  };

  const handleUpdateStatus = async () => {
    try {
      await api.patch(`/orders/${selectedOrder._id}/status`, {
        status: newStatus,
        note: statusNote,
      });

      //   fetchOrders();
      handleCloseUpdateStatus();
      enqueueSnackbar("Order status updated successfully", {
        variant: "success",
      });
    } catch (err) {
      console.error("Error updating order status:", err);
      enqueueSnackbar(
        err.response?.data?.message || "Failed to update order status",
        {
          variant: "error",
        }
      );
    }
  };

  // Get color for order status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "warning";
      case "processing":
        return "info";
      case "completed":
        return "success";
      case "cancelled":
        return "error";
      case "refunded":
        return "secondary";
      default:
        return "default";
    }
  };

  // Get icon for order status
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <AccessTimeIcon fontSize="small" />;
      case "processing":
        return <ShippingIcon fontSize="small" />;
      case "completed":
        return <CheckCircleIcon fontSize="small" />;
      case "cancelled":
        return <CancelIcon fontSize="small" />;
      case "refunded":
      // return <RefundIcon fontSize="small" />;
      default:
        return <ReceiptIcon fontSize="small" />;
    }
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setSortField("createdAt");
    setSortDirection("desc");
    setDateRange([null, null]);
    setTabValue(0);
    setPage(0);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Orders Management
      </Typography>

      {/* Tabs */}
      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <span>{tab.label}</span>
                  <Chip
                    label={tab.count}
                    size="small"
                    sx={{ ml: 1, height: 20, fontSize: "0.75rem" }}
                    color={tab.value === tabValue ? "primary" : "default"}
                  />
                </Box>
              }
            />
          ))}
        </Tabs>
      </Paper>

      {/* Filters bar */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search by order ID, customer name or email"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={handleStatusFilterChange}
                label="Status"
              >
                {orderStatuses.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* Replace with appropriate date range picker based on your MUI version */}
            <TextField
              fullWidth
              placeholder="Date range"
              variant="outlined"
              size="small"
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={handleResetFilters}
                startIcon={<RefreshIcon />}
              >
                Reset
              </Button>
              <Button
                fullWidth
                variant="contained"
                //   onClick={fetchOrders}
              >
                Filter
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Orders table */}
      <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 2 }}>
        {error ? (
          <Alert severity="error" sx={{ m: 2 }}>
            {error}
          </Alert>
        ) : (
          <>
            <TableContainer sx={{ maxHeight: "calc(100vh - 330px)" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sortDirection={sortField === "id" ? sortDirection : false}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSort("_id")}
                      >
                        <Typography variant="subtitle2">Order ID</Typography>
                        {sortField === "_id" ? (
                          sortDirection === "asc" ? (
                            <ArrowUpwardIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          ) : (
                            <ArrowDownwardIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          )
                        ) : null}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSort("customer.name")}
                      >
                        <Typography variant="subtitle2">Customer</Typography>
                        {sortField === "customer.name" ? (
                          sortDirection === "asc" ? (
                            <ArrowUpwardIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          ) : (
                            <ArrowDownwardIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          )
                        ) : null}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSort("createdAt")}
                      >
                        <Typography variant="subtitle2">Date</Typography>
                        {sortField === "createdAt" ? (
                          sortDirection === "asc" ? (
                            <ArrowUpwardIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          ) : (
                            <ArrowDownwardIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          )
                        ) : null}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSort("totalAmount")}
                      >
                        <Typography variant="subtitle2">Amount</Typography>
                        {sortField === "totalAmount" ? (
                          sortDirection === "asc" ? (
                            <ArrowUpwardIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          ) : (
                            <ArrowDownwardIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          )
                        ) : null}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSort("status")}
                      >
                        <Typography variant="subtitle2">Status</Typography>
                        {sortField === "status" ? (
                          sortDirection === "asc" ? (
                            <ArrowUpwardIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          ) : (
                            <ArrowDownwardIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          )
                        ) : null}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">Payment</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle2">Actions</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                        <CircularProgress />
                        <Typography
                          variant="body2"
                          sx={{ mt: 2, color: "text.secondary" }}
                        >
                          Loading orders...
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : orders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                        <Box sx={{ textAlign: "center" }}>
                          <ReceiptIcon
                            sx={{
                              fontSize: 48,
                              color: "action.disabled",
                              mb: 1,
                            }}
                          />
                          <Typography variant="h6" color="text.secondary">
                            No orders found
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {searchTerm || filterStatus !== "all"
                              ? "Try adjusting your filters"
                              : "Orders will appear here once created"}
                          </Typography>
                          {(searchTerm || filterStatus !== "all") && (
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={handleResetFilters}
                              sx={{ mt: 2 }}
                              startIcon={<RefreshIcon />}
                            >
                              Reset filters
                            </Button>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    orders.map((order) => (
                      <TableRow key={order._id} hover>
                        <TableCell>
                          <Typography
                            variant="body2"
                            fontWeight="medium"
                            color="primary.main"
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleViewOrder(order)}
                          >
                            #{order._id.substring(0, 8)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar
                              src={order.customer?.avatar}
                              sx={{ width: 30, height: 30, mr: 1 }}
                            >
                              {order.customer?.name?.charAt(0) || "U"}
                            </Avatar>
                            <Box>
                              <Typography variant="body2">
                                {order.customer?.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {order.customer?.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(order.createdAt).toLocaleTimeString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            ${order.totalAmount.toFixed(2)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {order.items?.length || 0} items
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={order.status}
                            size="small"
                            color={getStatusColor(order.status)}
                            icon={getStatusIcon(order.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={order.paymentStatus || "pending"}
                            size="small"
                            variant="outlined"
                            color={
                              order.paymentStatus === "paid"
                                ? "success"
                                : "default"
                            }
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Box
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                          >
                            <Tooltip title="View details">
                              <IconButton
                                size="small"
                                onClick={() => handleViewOrder(order)}
                                sx={{ color: theme.palette.primary.main }}
                              >
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Update status">
                              <IconButton
                                size="small"
                                onClick={() => handleOpenUpdateStatus(order)}
                                sx={{ color: theme.palette.success.main }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Invoice">
                              <IconButton
                                size="small"
                                onClick={() => {
                                  /* Download or view invoice */
                                }}
                                sx={{ color: theme.palette.text.secondary }}
                              >
                                <ReceiptIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={totalOrders}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>

      {/* Order details dialog */}
      <Dialog
        open={viewOrderDialog}
        onClose={handleCloseViewDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedOrder && (
          <>
            <DialogTitle>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">
                  Order #{selectedOrder._id.substring(0, 8)}
                </Typography>
                <Chip
                  label={selectedOrder.status}
                  color={getStatusColor(selectedOrder.status)}
                  size="small"
                />
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                {/* Order summary */}
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Order Summary
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <Stack spacing={1.5}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Date
                          </Typography>
                          <Typography variant="body2">
                            {new Date(selectedOrder.createdAt).toLocaleString()}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Status
                          </Typography>
                          <Chip
                            label={selectedOrder.status}
                            color={getStatusColor(selectedOrder.status)}
                            size="small"
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Payment
                          </Typography>
                          <Chip
                            label={selectedOrder.paymentStatus || "pending"}
                            size="small"
                            variant="outlined"
                            color={
                              selectedOrder.paymentStatus === "paid"
                                ? "success"
                                : "default"
                            }
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Total
                          </Typography>
                          <Typography variant="body2" fontWeight="bold">
                            ${selectedOrder.totalAmount.toFixed(2)}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>

                  {/* Customer information */}
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Customer
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Avatar
                          src={selectedOrder.customer?.avatar}
                          sx={{ width: 40, height: 40, mr: 2 }}
                        >
                          {selectedOrder.customer?.name?.charAt(0) || "U"}
                        </Avatar>
                        <Box>
                          <Typography variant="body1">
                            {selectedOrder.customer?.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {selectedOrder.customer?.email}
                          </Typography>
                        </Box>
                      </Box>

                      {selectedOrder.shippingAddress && (
                        <>
                          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                            Shipping Address
                          </Typography>
                          <Typography variant="body2">
                            {selectedOrder.shippingAddress.street},<br />
                            {selectedOrder.shippingAddress.city},{" "}
                            {selectedOrder.shippingAddress.state}{" "}
                            {selectedOrder.shippingAddress.zip},<br />
                            {selectedOrder.shippingAddress.country}
                          </Typography>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Grid>

                {/* Order items */}
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Order Items
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <List sx={{ mb: 2 }}>
                        {selectedOrder.items?.map((item, index) => (
                          <React.Fragment key={index}>
                            {index > 0 && <Divider component="li" />}
                            <ListItem sx={{ py: 1.5, px: 0 }}>
                              <ListItemAvatar>
                                <Avatar
                                  variant="rounded"
                                  src={item.thumbnail}
                                  alt={item.name}
                                  sx={{ width: 60, height: 60 }}
                                >
                                  <FileIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={item.name}
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      ${item.price.toFixed(2)}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      {item.type || "Template"} • Qty:{" "}
                                      {item.quantity || 1}
                                    </Typography>
                                  </React.Fragment>
                                }
                                sx={{ ml: 1 }}
                              />
                            </ListItem>
                          </React.Fragment>
                        ))}
                      </List>

                      <Box
                        sx={{
                          mt: 2,
                          pt: 2,
                          borderTop: 1,
                          borderColor: "divider",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                          }}
                        >
                          <Typography variant="body2">Subtotal</Typography>
                          <Typography variant="body2">
                            $
                            {(
                              selectedOrder.totalAmount -
                              (selectedOrder.shippingCost || 0)
                            ).toFixed(2)}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                          }}
                        >
                          <Typography variant="body2">Shipping</Typography>
                          <Typography variant="body2">
                            ${(selectedOrder.shippingCost || 0).toFixed(2)}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mt: 2,
                          }}
                        >
                          <Typography variant="subtitle1">Total</Typography>
                          <Typography variant="subtitle1" fontWeight="bold">
                            ${selectedOrder.totalAmount.toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseViewDialog}>Close</Button>
              <Button variant="outlined" startIcon={<ReceiptIcon />}>
                Download Invoice
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleCloseViewDialog();
                  handleOpenUpdateStatus(selectedOrder);
                }}
              >
                Update Status
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Update status dialog */}
      <Dialog
        open={updateStatusDialog}
        onClose={handleCloseUpdateStatus}
        maxWidth="sm"
        fullWidth
      >
        {selectedOrder && (
          <>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogContent>
              <Typography variant="body1" gutterBottom>
                Order #{selectedOrder._id.substring(0, 8)}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Current status:{" "}
                <Chip
                  label={selectedOrder.status}
                  size="small"
                  color={getStatusColor(selectedOrder.status)}
                />
              </Typography>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>New Status</InputLabel>
                <Select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  label="New Status"
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="processing">Processing</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                  <MenuItem value="refunded">Refunded</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                multiline
                rows={3}
                margin="normal"
                label="Status Note (Optional)"
                placeholder="Add a note about this status change"
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseUpdateStatus}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleUpdateStatus}
                disabled={newStatus === selectedOrder.status}
              >
                Update Status
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Orders;
