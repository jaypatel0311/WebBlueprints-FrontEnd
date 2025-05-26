import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  CircularProgress,
  styled,
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../../context/authContext";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  padding: "0.5rem 1rem",
});

const LogoText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 700,
  fontSize: "1.8rem",
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  cursor: "pointer",
  textDecoration: "none",
}));

const NavButtons = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 35,
  height: 35,
  backgroundColor: theme.palette.primary.main,
  fontSize: "1rem",
  fontWeight: 500,
  cursor: "pointer",
}));

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      handleClose();
      setDrawerOpen(false);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getInitials = (user) => {
    if (!user) return "";
    if (user.username) {
      return user.username.charAt(0).toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  // Drawer content for mobile
  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setDrawerOpen(false)}
    >
      <Box display="flex" alignItems="center" p={2}>
        <StyledAvatar sx={{ mr: 2 }}>{getInitials(user)}</StyledAvatar>
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            {user?.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <List>
        <ListItem button component={Link} to="/templates">
          <ListItemText primary="Templates" />
        </ListItem>
        <ListItem button component={Link} to="/profile">
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={handleLogout} disabled={isLoggingOut}>
          <ListItemText primary={isLoggingOut ? "Logging out..." : "Logout"} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" color="transparent">
      <StyledToolbar>
        <LogoText component={Link} to={user ? "/" : "/login"}>
          WebBlueprints
        </LogoText>
        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              {user ? (
                drawerContent
              ) : (
                <Box sx={{ width: 250, p: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    component={Link}
                    to="/login"
                    onClick={() => setDrawerOpen(false)}
                  >
                    Login
                  </Button>
                </Box>
              )}
            </Drawer>
          </>
        ) : (
          <NavButtons>
            {user && (
              <Button color="inherit" component={Link} to="/templates">
                Templates
              </Button>
            )}
            {user ? (
              <>
                <IconButton
                  onClick={handleMenu}
                  color="inherit"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <StyledAvatar>{getInitials(user)}</StyledAvatar>
                  )}
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Box
                    sx={{
                      px: 2,
                      py: 2,
                      display: "flex",
                      alignItems: "center",
                      minWidth: 220, // optional, for consistent width
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <StyledAvatar sx={{ width: 40, height: 40, mr: 2 }}>
                      {getInitials(user)}
                    </StyledAvatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {user?.username}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user?.email}
                      </Typography>
                    </Box>
                  </Box>
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={handleClose}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout} disabled={isLoggingOut}>
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="contained"
                component={Link}
                to="/login"
                sx={{
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  color: "white",
                }}
              >
                Login
              </Button>
            )}
          </NavButtons>
        )}
      </StyledToolbar>
    </AppBar>
  );
}

export default Header;
