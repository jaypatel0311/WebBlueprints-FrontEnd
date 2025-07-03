import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import {
  PeopleOutline,
  ShoppingBagOutlined,
  AttachMoney,
  OpenInBrowser,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axiosInterceptor";
import TemplateCard from "../../components/common/TemplateCard";
// Import recharts components
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FormControl, Select, MenuItem } from "@mui/material";

const StatCard = ({ title, value, icon, color }) => (
  <Paper sx={{ p: 3 }}>
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography color="textSecondary" variant="h6">
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: `${color}20`,
          p: 2,
          borderRadius: 2,
        }}
      >
        {icon}
      </Box>
    </Box>
  </Paper>
);

const AdminDashboard = () => {
  const theme = useTheme();
  const [topTemplates, setTopTemplates] = useState([]);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const navigate = useNavigate();
  // Add state for time range filter
  const [timeRange, setTimeRange] = useState("30days");

  // Sample data for the charts
  const [salesData, setSalesData] = useState([
    { date: "Mon", revenue: 1200 },
    { date: "Tue", revenue: 940 },
    { date: "Wed", revenue: 1340 },
    { date: "Thu", revenue: 1800 },
    { date: "Fri", revenue: 2450 },
    { date: "Sat", revenue: 1700 },
    { date: "Sun", revenue: 1200 },
  ]);

  const [categoryData, setCategoryData] = useState([
    { name: "Business", downloads: 340 },
    { name: "E-commerce", downloads: 520 },
    { name: "Portfolio", downloads: 280 },
    { name: "Blog", downloads: 220 },
    { name: "Landing Page", downloads: 390 },
  ]);

  const [orderStatusData, setOrderStatusData] = useState([
    { name: "Completed", value: 65 },
    { name: "Pending", value: 15 },
    { name: "Processing", value: 12 },
    { name: "Cancelled", value: 8 },
  ]);

  const [summaryStats, setSummaryStats] = useState({
    totalRevenue: 12450.75,
    totalOrders: 142,
    avgOrderValue: 87.68,
  });

  // Function to fetch analytics data
  const fetchAnalyticsData = async () => {
    try {
      const response = await api.get(`/analytics/sales?period=${timeRange}`);
      const data = response.data;

      setSalesData(data.salesOverTime);
      setCategoryData(data.popularCategories);
      setOrderStatusData(data.orderStatusDistribution);
      setSummaryStats(data.summary);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      // Keep using the sample data
    }
  };

  // Update data when time range changes
  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchTopTemplates = async () => {
    setTemplatesLoading(true);
    try {
      const response = await api.get("/templates");
      console.log("Fetched top templates:", response.data);

      setTopTemplates(response.data.templates.slice(0, 5)); // Get top 5 templates
    } catch (error) {
      console.error("Error fetching top templates:", error);
    } finally {
      setTemplatesLoading(false);
    }
  };

  useEffect(() => {
    fetchTopTemplates();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: (
        <PeopleOutline
          sx={{ fontSize: 40, color: theme.palette.primary.main }}
        />
      ),
      color: theme.palette.primary.main,
    },
    {
      title: "Total Orders",
      value: "856",
      icon: (
        <ShoppingBagOutlined
          sx={{ fontSize: 40, color: theme.palette.success.main }}
        />
      ),
      color: theme.palette.success.main,
    },
    {
      title: "Templates",
      value: "156",
      icon: (
        <OpenInBrowser
          sx={{ fontSize: 40, color: theme.palette.warning.main }}
        />
      ),
      color: theme.palette.warning.main,
    },
    {
      title: "Revenue",
      value: "$12,345",
      icon: (
        <AttachMoney sx={{ fontSize: 40, color: theme.palette.error.main }} />
      ),
      color: theme.palette.error.main,
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6">Sales Analytics</Typography>
              <FormControl
                variant="outlined"
                size="small"
                sx={{ minWidth: 120 }}
              >
                <Select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="7days">Last 7 Days</MenuItem>
                  <MenuItem value="30days">Last 30 Days</MenuItem>
                  <MenuItem value="90days">Last Quarter</MenuItem>
                  <MenuItem value="year">This Year</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Revenue Chart */}
            <Box sx={{ height: 240, mb: 4 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Revenue Over Time
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={salesData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={theme.palette.primary.main}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={theme.palette.primary.main}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke={theme.palette.primary.main}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>

            {/* Categories and Orders Chart */}
            <Grid container spacing={2}>
              {/* Category Popularity */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Popular Categories
                </Typography>
                <Box sx={{ height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={categoryData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={true}
                        vertical={false}
                      />
                      <XAxis type="number" />
                      <YAxis
                        dataKey="name"
                        type="category"
                        width={100}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip />
                      <Bar
                        dataKey="downloads"
                        fill={theme.palette.success.main}
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>

              {/* Order Status Distribution */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Order Status
                </Typography>
                <Box
                  sx={{
                    height: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={orderStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {orderStatusData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              entry.name === "Completed"
                                ? theme.palette.success.main
                                : entry.name === "Pending"
                                ? theme.palette.warning.main
                                : entry.name === "Processing"
                                ? theme.palette.info.main
                                : theme.palette.error.main
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} orders`} />
                      <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
            </Grid>

            {/* Summary stats */}
            <Box
              sx={{
                mt: 2,
                pt: 2,
                borderTop: 1,
                borderColor: "divider",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Total Revenue
                </Typography>
                <Typography variant="h6">
                  ${summaryStats.totalRevenue.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Orders
                </Typography>
                <Typography variant="h6">{summaryStats.totalOrders}</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Avg. Order Value
                </Typography>
                <Typography variant="h6">
                  ${summaryStats.avgOrderValue.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Top Templates
            </Typography>

            {templatesLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Grid container spacing={3} sx={{ mt: 1 }}>
                {topTemplates.length === 0 ? (
                  <Grid item xs={12}>
                    <Box sx={{ p: 4, textAlign: "center" }}>
                      <Typography color="text.secondary">
                        No templates available
                      </Typography>
                    </Box>
                  </Grid>
                ) : (
                  topTemplates.map((template, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      key={template._id || index}
                    >
                      <Box sx={{ position: "relative" }}>
                        {/* Add rank badge */}
                        {index < 3 && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: -5,
                              right: -5,
                              zIndex: 1,
                              backgroundColor:
                                index === 0
                                  ? "gold"
                                  : index === 1
                                  ? "silver"
                                  : "#cd7f32", // bronze
                              color: index === 0 ? "black" : "white",
                              borderRadius: "50%",
                              width: 30,
                              height: 30,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontWeight: "bold",
                              boxShadow: 2,
                            }}
                          >
                            {index + 1}
                          </Box>
                        )}

                        {/* Use the common TemplateCard component */}
                        <TemplateCard
                          template={template}
                          showActions={false} // Hide action buttons for cleaner dashboard view
                        />
                      </Box>
                    </Grid>
                  ))
                )}
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
