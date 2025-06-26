import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  Chip,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";

const OrderStatus = ({ status }) => {
  let color = "default";
  let label = status;

  switch (status.toLowerCase()) {
    case "completed":
      color = "success";
      break;
    case "processing":
      color = "warning";
      break;
    case "failed":
      color = "error";
      break;
    default:
      color = "default";
  }

  return (
    <Chip
      label={label}
      color={color}
      size="small"
      variant="outlined"
      sx={{
        fontWeight: "medium",
        fontSize: "0.75rem",
      }}
    />
  );
};

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  // Mock data for demonstration - replace with API call
  const fetchPurchases = async () => {
    setLoading(true);
    setError("");

    try {
      // In a real app, call your API here
      // const response = await api.get('/purchases', { params: { page, filter, search: searchTerm } });
      // setPurchases(response.data.purchases);
      // setTotalPages(response.data.totalPages);

      // Mock data for demonstration
      setTimeout(() => {
        const mockPurchases = [
          {
            id: "ord-12345",
            date: "2023-06-15T10:30:00",
            items: [
              {
                id: "tem-1",
                title: "React Dashboard Template",
                previewImageUrl:
                  "https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Dashboard",
                description:
                  "Modern admin dashboard with dark/light themes, charts and ready-to-use pages.",
                price: 49.99,
              },
              {
                id: "tem-2",
                title: "E-commerce Store Template",
                previewImageUrl:
                  "https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=E-commerce",
                description:
                  "Complete e-commerce template with product listings, cart, and checkout.",
                price: 39.99,
              },
            ],
            total: 89.98,
            status: "Completed",
          },
          {
            id: "ord-12346",
            date: "2023-07-22T14:15:00",
            items: [
              {
                id: "tem-3",
                title: "Portfolio Template",
                previewImageUrl:
                  "https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Portfolio",
                description:
                  "Showcase your work with this beautiful, responsive portfolio template.",
                price: 29.99,
              },
            ],
            total: 29.99,
            status: "Completed",
          },
          {
            id: "ord-12347",
            date: "2023-08-05T09:45:00",
            items: [
              {
                id: "tem-4",
                title: "Blog Template",
                previewImageUrl:
                  "https://via.placeholder.com/300x200/FF5722/FFFFFF?text=Blog",
                description:
                  "Modern blog template with featured posts, categories, and comments system.",
                price: 0,
              },
            ],
            total: 0,
            status: "Processing",
          },
        ];

        setPurchases(mockPurchases);
        setTotalPages(1);
        setLoading(false);
      }, 800);
    } catch (err) {
      setError("Failed to load your purchases. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, [page, filter]); // Refetch when page or filter changes

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(1); // Reset to first page when changing filters
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDownload = (itemId) => {
    // Implement download functionality
    console.log(`Downloading template with ID: ${itemId}`);
  };

  const handleViewTemplate = (itemId) => {
    // Navigate to template detail page
    navigate(`/templates/${itemId}`);
  };

  const filteredPurchases = searchTerm
    ? purchases.filter(
        (purchase) =>
          purchase.items.some((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
          ) || purchase.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : purchases;

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
          <ShoppingBagIcon fontSize="large" color="primary" />
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              My Purchases
            </Typography>
            <Typography variant="body1" color="text.secondary">
              View and download all your purchased templates
            </Typography>
          </Box>
        </Box>

        {/* Search and Filter */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 4,
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by template name or order ID"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="filter-label">Filter</InputLabel>
                <Select
                  labelId="filter-label"
                  id="filter-select"
                  value={filter}
                  onChange={handleFilterChange}
                  label="Filter"
                  startAdornment={
                    <InputAdornment position="start">
                      <FilterListIcon color="action" />
                    </InputAdornment>
                  }
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="all">All Purchases</MenuItem>
                  <MenuItem value="recent">Recent Purchases</MenuItem>
                  <MenuItem value="oldest">Oldest Purchases</MenuItem>
                  <MenuItem value="free">Free Templates</MenuItem>
                  <MenuItem value="premium">Premium Templates</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Content */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        ) : filteredPurchases.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <CloudDownloadIcon
              sx={{ fontSize: 80, color: "text.disabled", mb: 2 }}
            />
            <Typography variant="h5" fontWeight="medium" gutterBottom>
              No purchases found
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {searchTerm
                ? "No purchases match your search criteria"
                : "You haven't purchased any templates yet"}
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/templates")}
              sx={{
                mt: 2,
                borderRadius: 8,
                px: 4,
                py: 1.2,
                fontWeight: "bold",
                textTransform: "none",
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                boxShadow: "0 4px 10px rgba(33, 150, 243, 0.3)",
                "&:hover": {
                  boxShadow: "0 6px 15px rgba(33, 150, 243, 0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Browse Templates
            </Button>
          </Paper>
        ) : (
          <Box>
            {filteredPurchases.map((purchase, index) => (
              <Paper
                key={purchase.id}
                elevation={0}
                sx={{
                  mb: 3,
                  overflow: "hidden",
                  borderRadius: 2,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  },
                }}
              >
                {/* Order Header */}
                <Box
                  sx={{
                    bgcolor: "background.default",
                    p: 2,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <ReceiptIcon color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Order ID
                      </Typography>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {purchase.id}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Box sx={{ textAlign: isMobile ? "left" : "right" }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <CalendarTodayIcon fontSize="small" />
                        {/* {format(new Date(purchase.date), "MMM d, yyyy")} */}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        color="primary.main"
                        sx={{ mt: 0.5 }}
                      >
                        {purchase.total === 0
                          ? "FREE"
                          : `$${purchase.total.toFixed(2)}`}
                      </Typography>
                    </Box>
                    <OrderStatus status={purchase.status} />
                  </Box>
                </Box>

                {/* Order Items */}
                <Box sx={{ p: 0 }}>
                  {purchase.items.map((item, itemIndex) => (
                    <Box
                      key={item.id}
                      sx={{
                        p: 2,
                        borderBottom:
                          itemIndex < purchase.items.length - 1
                            ? "1px solid"
                            : "none",
                        borderColor: "divider",
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: "100%", sm: 120 },
                          flexShrink: 0,
                          alignSelf: { xs: "center", sm: "flex-start" },
                        }}
                      >
                        <Box
                          component="img"
                          src={item.previewImageUrl}
                          alt={item.title}
                          sx={{
                            width: "100%",
                            height: 80,
                            objectFit: "cover",
                            borderRadius: 2,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          }}
                        />
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          gutterBottom
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          paragraph
                        >
                          {item.description}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignSelf: "center",
                          flexDirection: { xs: "row", sm: "column" },
                          alignItems: { xs: "center", sm: "flex-end" },
                          justifyContent: { xs: "space-between", sm: "center" },
                          gap: 2,
                          width: { xs: "100%", sm: "auto" },
                          mt: { xs: 2, sm: 0 },
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          fontWeight="bold"
                          color="primary.main"
                        >
                          {item.price === 0
                            ? "FREE"
                            : `$${item.price.toFixed(2)}`}
                        </Typography>

                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<DownloadIcon />}
                            onClick={() => handleDownload(item.id)}
                            sx={{
                              borderRadius: 6,
                              textTransform: "none",
                              fontWeight: "medium",
                              background:
                                "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                              minWidth: 100,
                            }}
                          >
                            Download
                          </Button>

                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<VisibilityIcon />}
                            onClick={() => handleViewTemplate(item.id)}
                            sx={{
                              borderRadius: 6,
                              textTransform: "none",
                              fontWeight: "medium",
                            }}
                          >
                            View
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  shape="rounded"
                  size={isMobile ? "small" : "medium"}
                />
              </Box>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Purchases;
