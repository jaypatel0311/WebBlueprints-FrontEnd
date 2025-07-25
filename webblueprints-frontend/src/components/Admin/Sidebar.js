import React, { useState } from "react";
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
  OpenInBrowser,
  ContactSupport,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import ConfirmDialog from "../common/ConfirmDialog";

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/admin" },
  { text: "Support Queries", icon: <ContactSupport />, path: "/admin/support" },
  { text: "Templates", icon: <OpenInBrowser />, path: "/admin/templates" },
  { text: "Users", icon: <PeopleOutline />, path: "/admin/users" },
  { text: "Orders", icon: <ShoppingBagOutlined />, path: "/admin/orders" },
];

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);

  const handleLogoutClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmLogout = async () => {
    setOpenDialog(false);
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
        background: "linear-gradient(180deg, #1976d2 0%, #1565c0 100%)",
        color: "white",
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
        <Avatar sx={{ bgcolor: "white", color: "#1976d2" }}>
          {user.user?.username?.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" color="white">
            {user.user?.username}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            {user.user?.email}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2, borderColor: "rgba(255, 255, 255, 0.12)" }} />

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
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              },
              "&.Mui-selected": {
                backgroundColor: "#2196F3",
                "&::before": {
                  opacity: 1,
                },
                "&:hover": {
                  backgroundColor: "#1976D2",
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      {/* Logout Button */}
      <Button
        startIcon={<Logout />}
        onClick={handleLogoutClick}
        sx={{
          mt: "auto",
          mb: 2,
          color: "white",
          borderColor: "rgba(255, 255, 255, 0.5)",
          "&:hover": {
            borderColor: "white",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          },
        }}
        variant="outlined"
        fullWidth
      >
        Logout
      </Button>

      <ConfirmDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Confirm Logout"
        content="Are you sure you want to logout?"
        onConfirm={handleConfirmLogout}
      />
    </Box>
  );
};

export default AdminSidebar;
