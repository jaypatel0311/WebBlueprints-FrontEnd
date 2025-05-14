import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

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

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const NavButtons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
}));

function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <StyledToolbar>
        <LogoText component={Link} to="/">
          WebBlueprints
        </LogoText>
        <NavButtons>
          <Button color="inherit" component={Link} to="/templates">
            Templates
          </Button>
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
        </NavButtons>
      </StyledToolbar>
    </AppBar>
  );
}

export default Header;
