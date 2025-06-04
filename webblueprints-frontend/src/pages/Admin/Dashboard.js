import React from "react";
import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import {
  PeopleOutline,
  ShoppingBagOutlined,
  AttachMoney,
} from "@mui/icons-material";

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
    // {
    //   title: "Templates",
    //   value: "156",
    //   icon: (
    //     <TemplatePresent
    //       sx={{ fontSize: 40, color: theme.palette.warning.main }}
    //     />
    //   ),
    //   color: theme.palette.warning.main,
    // },
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
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Orders
            </Typography>
            {/* Add orders table or chart here */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Top Templates
            </Typography>
            {/* Add top templates list here */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
