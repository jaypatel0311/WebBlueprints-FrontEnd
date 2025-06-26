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
            <Typography variant="h6" gutterBottom>
              Recent Orders
            </Typography>
            {/* Add orders table or chart here */}
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
