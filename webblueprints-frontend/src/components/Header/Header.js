import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  ListItemIcon,
  Container,
  Fade,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../../context/authContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LogoutIcon from "@mui/icons-material/Logout";
import TemplateIcon from "@mui/icons-material/WebAsset";
import Badge from "@mui/material/Badge";
import ConfirmDialog from "../common/ConfirmDialog";
import { useCart } from "../../context/cartContext";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  backgroundColor: "rgba(255, 255, 255, 0.98)",
  borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
  position: "sticky",
  top: 0,
  zIndex: theme.zIndex.drawer + 1,
  backdropFilter: "blur(8px)",
}));

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  padding: "0.75rem 0",
});

const LogoText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 800,
  fontSize: "1.8rem",
  position: "relative",
  background: "linear-gradient(90deg, #2196F3 15%, #21CBF3 50%, #2196F3 85%)",
  backgroundSize: "200% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  cursor: "pointer",
  textDecoration: "none",
  letterSpacing: "-0.5px",
  animation: "shine 8s linear infinite",
  "@keyframes shine": {
    "0%": { backgroundPosition: "0% center" },
    "100%": { backgroundPosition: "200% center" },
  },
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px) scale(1.03)",
    textShadow: "0 10px 20px rgba(33, 150, 243, 0.15)",
  },
  "&::before": {
    content: "'{ }'",
    fontFamily: "monospace",
    fontSize: "1.5rem",
    fontWeight: 400,
    background: "linear-gradient(135deg, #21CBF3 0%, #2196F3 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginRight: theme.spacing(0.5),
    transform: "rotate(10deg)",
    display: "inline-block",
  },
}));

const NavButtons = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

const StyledNavButton = styled(Button)(({ theme, active }) => ({
  position: "relative",
  fontWeight: 600,
  borderRadius: 8,
  padding: "8px 16px",
  textTransform: "none",
  letterSpacing: "0.5px",
  fontSize: "0.95rem",
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    width: active ? "80%" : "0%",
    height: "3px",
    backgroundColor: theme.palette.primary.main,
    transition: "all 0.3s ease",
    transform: "translateX(-50%)",
    borderRadius: "3px 3px 0 0",
  },
  "&:hover::after": {
    width: "80%",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 38,
  height: 38,
  backgroundColor: theme.palette.primary.main,
  fontSize: "1rem",
  fontWeight: 500,
  cursor: "pointer",
  boxShadow: "0 3px 8px rgba(33, 150, 243, 0.2)",
  border: "2px solid white",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 5px 12px rgba(33, 150, 243, 0.3)",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.error.main,
    color: "white",
    fontWeight: "bold",
    boxShadow: "0 2px 6px rgba(239, 83, 80, 0.3)",
    padding: "0 4px",
    minWidth: "18px",
    height: "18px",
  },
}));

const MenuHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid",
  borderColor: theme.palette.divider,
}));

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { cart, totalItems, totalAmount, removeFromCart } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [scrolling, setScrolling] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const userData = user?.user || user;
  const userName =
    userData?.username || userData?.name || userData?.email || "User";
  const userEmail = userData?.email || "";
  const userRole = userData?.role || "user";
  const isAdmin = userRole === "admin";

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleClose();
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

  const isActive = (path) => {
    return location.pathname === path;
  };

  const cartDrawerContent = (
    <Box sx={{ width: { xs: "100vw", sm: 380 }, p: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Your Cart {totalItems > 0 && `(${totalItems})`}
        </Typography>
        <IconButton onClick={() => setCartOpen(false)} size="small">
          <MenuIcon fontSize="small" sx={{ transform: "rotate(90deg)" }} />
        </IconButton>
      </Box>

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
              fontSize: 100,
              color: "rgba(0,0,0,0.1)",
              mb: 3,
            }}
          />
          <Typography
            variant="h6"
            fontWeight="medium"
            color="text.secondary"
            gutterBottom
          >
            Your cart is empty
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Discover amazing templates to add to your collection
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              setCartOpen(false);
              navigate("/templates");
            }}
            sx={{
              borderRadius: 8,
              textTransform: "none",
              px: 3,
              py: 1,
            }}
          >
            Browse Templates
          </Button>
        </Box>
      ) : (
        <>
          <List sx={{ maxHeight: "calc(70vh - 180px)", overflowY: "auto" }}>
            {cart.map((item) => (
              <ListItem
                key={item._id}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "rgba(33, 150, 243, 0.04)",
                  },
                }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => removeFromCart(item._id)}
                    sx={{
                      color: "error.main",
                      "&:hover": {
                        bgcolor: "rgba(239, 83, 80, 0.1)",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    src={item.previewImageUrl}
                    variant="rounded"
                    alt={item.title}
                    sx={{ width: 50, height: 50, borderRadius: 2 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight="medium">
                      {item.title}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color="primary.main"
                      fontWeight="bold"
                    >
                      {item.price === 0 ? "FREE" : `$${item.price.toFixed(2)}`}
                    </Typography>
                  }
                  sx={{ ml: 1 }}
                />
              </ListItem>
            ))}
          </List>

          <Box
            sx={{
              mt: 3,
              pt: 3,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 3,
                px: 1,
              }}
            >
              <Typography variant="subtitle1" color="text.secondary">
                Total ({totalItems} items)
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="primary.main">
                ${totalAmount.toFixed(2)}
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: 8,
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "1rem",
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                boxShadow: "0 4px 10px rgba(33, 150, 243, 0.3)",
                "&:hover": {
                  boxShadow: "0 6px 15px rgba(33, 150, 243, 0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.2s ease",
              }}
              onClick={() => {
                setCartOpen(false);
                navigate("/checkout");
              }}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );

  // Drawer content for mobile
  const drawerContent = (
    <Box sx={{ width: 280 }} role="presentation">
      <MenuHeader>
        <StyledAvatar sx={{ mr: 2 }}>{getInitials(userData)}</StyledAvatar>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {userName || "Guest"}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            sx={{ maxWidth: 200 }}
          >
            {userEmail || "Not signed in"}
          </Typography>
        </Box>
      </MenuHeader>

      <List>
        <ListItem
          button
          component={Link}
          to="/templates"
          onClick={() => setDrawerOpen(false)}
          sx={{
            bgcolor: isActive("/templates")
              ? "rgba(33, 150, 243, 0.08)"
              : "transparent",
            borderRight: isActive("/templates")
              ? `3px solid ${theme.palette.primary.main}`
              : "none",
          }}
        >
          <ListItemIcon>
            <TemplateIcon
              color={isActive("/templates") ? "primary" : "inherit"}
            />
          </ListItemIcon>
          <ListItemText
            primary="Templates"
            primaryTypographyProps={{
              fontWeight: isActive("/templates") ? "bold" : "medium",
            }}
          />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/profile"
          onClick={() => setDrawerOpen(false)}
          sx={{
            bgcolor: isActive("/profile")
              ? "rgba(33, 150, 243, 0.08)"
              : "transparent",
            borderRight: isActive("/profile")
              ? `3px solid ${theme.palette.primary.main}`
              : "none",
          }}
        >
          <ListItemIcon>
            <PersonIcon color={isActive("/profile") ? "primary" : "inherit"} />
          </ListItemIcon>
          <ListItemText
            primary="Profile"
            primaryTypographyProps={{
              fontWeight: isActive("/profile") ? "bold" : "medium",
            }}
          />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/purchases"
          onClick={() => setDrawerOpen(false)}
          sx={{
            bgcolor: isActive("/purchases")
              ? "rgba(33, 150, 243, 0.08)"
              : "transparent",
            borderRight: isActive("/purchases")
              ? `3px solid ${theme.palette.primary.main}`
              : "none",
          }}
        >
          <ListItemIcon>
            <ReceiptIcon
              color={isActive("/purchases") ? "primary" : "inherit"}
            />
          </ListItemIcon>
          <ListItemText
            primary="My Purchases"
            primaryTypographyProps={{
              fontWeight: isActive("/purchases") ? "bold" : "medium",
            }}
          />
        </ListItem>

        <Divider sx={{ my: 1.5 }} />

        <ListItem
          button
          onClick={() => handleLogoutClick()}
          disabled={isLoggingOut}
        >
          <ListItemIcon>
            {isLoggingOut ? (
              <CircularProgress size={24} />
            ) : (
              <LogoutIcon color="action" />
            )}
          </ListItemIcon>
          <ListItemText primary={isLoggingOut ? "Logging out..." : "Logout"} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <StyledAppBar
      elevation={scrolling ? 1 : 0}
      sx={{
        boxShadow: scrolling ? "0 4px 20px rgba(0,0,0,0.05)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <StyledToolbar>
        <LogoText component={Link} to={userData ? "/" : "/login"}>
          WebBlueprints
        </LogoText>

        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          PaperProps={{
            sx: {
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
              overflow: "hidden",
            },
          }}
        >
          {cartDrawerContent}
        </Drawer>

        {isMobile ? (
          <>
            {userData && (
              <Tooltip title="Shopping Cart">
                <IconButton
                  onClick={() => setCartOpen(true)}
                  sx={{
                    mr: 1.5,
                    color: theme.palette.text.primary,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  <StyledBadge badgeContent={totalItems} color="error" max={99}>
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              </Tooltip>
            )}
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              sx={{
                bgcolor: "rgba(0,0,0,0.04)",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.08)",
                },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              PaperProps={{
                sx: {
                  borderTopLeftRadius: 16,
                  borderBottomLeftRadius: 16,
                },
              }}
            >
              {userData ? (
                drawerContent
              ) : (
                <Box sx={{ width: 280, p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Welcome
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Sign in to access all features
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    component={Link}
                    to="/login"
                    onClick={() => setDrawerOpen(false)}
                    sx={{
                      py: 1.2,
                      borderRadius: 8,
                      textTransform: "none",
                      fontWeight: "bold",
                      background:
                        "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    }}
                  >
                    Login
                  </Button>
                </Box>
              )}
            </Drawer>
          </>
        ) : (
          <NavButtons>
            {userData && (
              <>
                <StyledNavButton
                  component={Link}
                  to="/templates"
                  active={isActive("/templates") ? 1 : 0}
                >
                  Templates
                </StyledNavButton>

                <Tooltip title="Shopping Cart">
                  <IconButton
                    onClick={() => setCartOpen(true)}
                    sx={{
                      color: theme.palette.text.primary,
                      borderRadius: 2,
                      p: 1.2,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        color: theme.palette.primary.main,
                        bgcolor: "rgba(33, 150, 243, 0.08)",
                      },
                    }}
                  >
                    <StyledBadge
                      badgeContent={totalItems}
                      color="error"
                      max={99}
                    >
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </>
            )}

            {userData ? (
              <>
                <Tooltip title="Account & Settings">
                  <IconButton
                    onClick={handleMenu}
                    disabled={isLoggingOut}
                    sx={{
                      ml: 1,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {isLoggingOut ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      <StyledAvatar>{getInitials(userData)}</StyledAvatar>
                    )}
                  </IconButton>
                </Tooltip>

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
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      mt: 1,
                      overflow: "visible",
                      borderRadius: 3,
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: -6,
                        right: 14,
                        width: 12,
                        height: 12,
                        bgcolor: "background.paper",
                        transform: "rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  TransitionComponent={Fade}
                  transitionDuration={200}
                >
                  <MenuHeader>
                    <StyledAvatar sx={{ width: 40, height: 40, mr: 2 }}>
                      {getInitials(userData)}
                    </StyledAvatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {userName || "User"}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        sx={{ maxWidth: 150 }}
                      >
                        {userEmail}
                      </Typography>
                    </Box>
                  </MenuHeader>

                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={handleClose}
                    sx={{ py: 1.5, px: 2 }}
                  >
                    <ListItemIcon>
                      <PersonIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="My Profile" />
                  </MenuItem>

                  <MenuItem
                    component={Link}
                    to="/purchases"
                    onClick={handleClose}
                    sx={{ py: 1.5, px: 2 }}
                  >
                    <ListItemIcon>
                      <ReceiptIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="My Purchases" />
                  </MenuItem>

                  <Divider />

                  <MenuItem
                    onClick={() => handleLogoutClick()}
                    disabled={isLoggingOut}
                    sx={{ py: 1.5, px: 2 }}
                  >
                    <ListItemIcon>
                      {isLoggingOut ? (
                        <CircularProgress size={20} />
                      ) : (
                        <LogoutIcon fontSize="small" color="action" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={isLoggingOut ? "Logging out..." : "Logout"}
                    />
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="contained"
                component={Link}
                to="/login"
                sx={{
                  borderRadius: 8,
                  py: 1,
                  px: 3,
                  textTransform: "none",
                  fontWeight: "bold",
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  boxShadow: "0 4px 10px rgba(33, 150, 243, 0.3)",
                  "&:hover": {
                    boxShadow: "0 6px 15px rgba(33, 150, 243, 0.4)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.2s ease",
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
    </StyledAppBar>
  );
}

export default Header;
