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
  ListItemAvatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../../context/authContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import ConfirmDialog from "../common/ConfirmDialog";
import { useCart } from "../../context/cartContext";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [cartOpen, setCartOpen] = useState(false);
  const cartItems = [];
  const [openDialog, setOpenDialog] = useState(false);
  const { cart, totalItems, totalAmount, removeFromCart } = useCart();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleClose(); // Close menu
    setOpenDialog(true);
  };

  const handleConfirmLogout = async () => {
    setOpenDialog(false);
    try {
      setIsLoggingOut(true);
      await logout();
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

  const cartDrawerContent = (
    <Box sx={{ width: 350, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Shopping Cart
      </Typography>

      {cart.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 6,
            textAlign: "center",
          }}
        >
          <ShoppingCartIcon
            sx={{
              fontSize: 120,
              color: "#bdbdbd",
              mb: 3,
            }}
          />
          <Typography color="text.secondary">
            There are no items in your cart yet
          </Typography>
        </Box>
      ) : (
        <>
          <List>
            {cart.map((item) => (
              <ListItem
                key={item._id}
                divider
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => removeFromCart(item._id)}
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    src={item.previewImageUrl}
                    variant="rounded"
                    alt={item.title}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={
                    <Typography
                      variant="body2"
                      color="primary.main"
                      fontWeight="medium"
                    >
                      {item.price === 0 ? "FREE" : `$${item.price.toFixed(2)}`}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Total: ${totalAmount.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                color: "white",
              }}
              onClick={() => {
                setCartOpen(false);
                navigate("/checkout");
              }}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );

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
        <ListItem button component={Link} to="/">
          <ListItemText primary="My purchases" />
        </ListItem>
        <ListItem
          button
          onClick={() => handleLogoutClick()}
          disabled={isLoggingOut}
        >
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
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          {cartDrawerContent}
        </Drawer>
        {isMobile ? (
          <>
            {user && (
              <IconButton
                color="inherit"
                onClick={() => setCartOpen(true)}
                sx={{ mr: 1 }}
              >
                <Badge badgeContent={cartItems.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}
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
              <>
                <Button color="inherit" component={Link} to="/templates">
                  Templates
                </Button>
                <IconButton
                  color="inherit"
                  onClick={() => setCartOpen(true)}
                  sx={{ mr: 1 }}
                >
                  <Badge badgeContent={cartItems.length} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </>
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
                  <MenuItem component={Link} to="/" onClick={handleClose}>
                    My Orders
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleLogoutClick()}
                    disabled={isLoggingOut}
                  >
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
            <ConfirmDialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              title="Confirm Logout"
              content="Are you sure you want to logout?"
              onConfirm={handleConfirmLogout}
            />
          </NavButtons>
        )}
      </StyledToolbar>
    </AppBar>
  );
}

export default Header;
