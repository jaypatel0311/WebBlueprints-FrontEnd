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
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
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

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <StyledToolbar>
        <LogoText component={Link} to={user ? "/" : "/login"}>
          WebBlueprints
        </LogoText>
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
                  <AccountCircle />
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
                <MenuItem component={Link} to="/profile" onClick={handleClose}>
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
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                color: "white",
              }}
            >
              Login
            </Button>
          )}
        </NavButtons>
      </StyledToolbar>
    </AppBar>
  );
}

export default Header;
