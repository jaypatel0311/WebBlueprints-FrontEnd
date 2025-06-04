import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Avatar,
  Button,
} from "@mui/material";
import {
  Dashboard,
  PeopleOutline,
  ShoppingBagOutlined,
  Logout,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/admin" },
  { text: "Users", icon: <PeopleOutline />, path: "/admin/users" },
  { text: "Orders", icon: <ShoppingBagOutlined />, path: "/admin/orders" },
];

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Admin Profile Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 40,
            height: 40,
          }}
        >
          {user?.username?.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {user?.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" sx={{ p: 2, fontWeight: "bold" }}>
        Admin Panel
      </Typography>

      {/* Menu Items */}
      <List sx={{ flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 1,
              mb: 1,
              "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
                "& .MuiListItemIcon-root": {
                  color: "white",
                },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      {/* Logout Button */}
      <Button
        startIcon={<Logout />}
        onClick={handleLogout}
        variant="outlined"
        color="primary"
        fullWidth
        sx={{ mt: "auto", mb: 2 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default AdminSidebar;
