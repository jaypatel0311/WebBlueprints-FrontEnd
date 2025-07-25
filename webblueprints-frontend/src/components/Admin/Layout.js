import React from "react";
import { Box, Drawer, useTheme, useMediaQuery } from "@mui/material";
import AdminSidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const DRAWER_WIDTH = isXs ? 240 : isSm ? 260 : isMd ? 280 : 300;

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        <AdminSidebar />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
