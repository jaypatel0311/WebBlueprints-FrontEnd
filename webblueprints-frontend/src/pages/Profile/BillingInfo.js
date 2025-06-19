import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  Divider,
  InputAdornment,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EventIcon from "@mui/icons-material/Event";
import LockIcon from "@mui/icons-material/Lock";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";

const BillingInfo = ({
  billingInfo,
  handleBillingInfoChange,
  handleBillingInfoSave,
}) => {
  // Mask card number (show only last 4 digits)
  const maskCardNumber = (value) => {
    if (!value) return "";
    const lastFourDigits = value.slice(-4);
    return "•••• •••• •••• " + lastFourDigits;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          mb: 4,
          position: "relative",
          "&:after": {
            content: '""',
            position: "absolute",
            bottom: -10,
            left: 0,
            width: 60,
            height: 4,
            borderRadius: 2,
            backgroundColor: "primary.main",
          },
        }}
      >
        Billing Information
      </Typography>

      <Box component="form" onSubmit={handleBillingInfoSave}>
        <Grid container spacing={3}>
          {/* Card Information Section */}
          <Grid item size={12}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <CreditCardIcon color="primary" />
              Payment Method
            </Typography>
            <Divider sx={{ mb: 3 }} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Card Holder Name"
              name="cardHolder"
              value={billingInfo.cardHolder}
              onChange={handleBillingInfoChange}
              fullWidth
              required
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBoxIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Card Number"
              name="cardNumber"
              value={billingInfo.cardNumber}
              onChange={handleBillingInfoChange}
              fullWidth
              required
              variant="outlined"
              placeholder="1234 5678 9012 3456"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CreditCardIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              label="Expiry Date"
              name="expiry"
              value={billingInfo.expiry}
              onChange={handleBillingInfoChange}
              fullWidth
              required
              placeholder="MM/YY"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EventIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              label="CVV"
              name="cvv"
              value={billingInfo.cvv || ""}
              onChange={handleBillingInfoChange}
              fullWidth
              required
              variant="outlined"
              placeholder="123"
              inputProps={{ maxLength: 4 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          {/* Billing Address Section */}
          <Grid item size={12} sx={{ mt: 2 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                mb: 2,
                mt: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <HomeIcon color="primary" />
              Billing Address
            </Typography>
            <Divider sx={{ mb: 3 }} />
          </Grid>

          <Grid item size={12}>
            <TextField
              label="Street Address"
              name="address"
              value={billingInfo.address}
              onChange={handleBillingInfoChange}
              fullWidth
              required
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              name="city"
              value={billingInfo.city || ""}
              onChange={handleBillingInfoChange}
              fullWidth
              required
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationCityIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Postal Code"
              name="postalCode"
              value={billingInfo.postalCode || ""}
              onChange={handleBillingInfoChange}
              fullWidth
              required
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl
              fullWidth
              required
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            >
              <InputLabel id="country-label">Country</InputLabel>
              <Select
                labelId="country-label"
                label="Country"
                name="country"
                value={billingInfo.country || ""}
                onChange={handleBillingInfoChange}
                startAdornment={
                  <InputAdornment position="start">
                    <PublicIcon color="action" />
                  </InputAdornment>
                }
              >
                <MenuItem value="US">United States</MenuItem>
                <MenuItem value="CA">Canada</MenuItem>
                <MenuItem value="UK">United Kingdom</MenuItem>
                <MenuItem value="AU">Australia</MenuItem>
                <MenuItem value="DE">Germany</MenuItem>
                <MenuItem value="FR">France</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Save Button */}
          <Grid
            item
            xs={12}
            sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                borderRadius: 6,
                px: 4,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                boxShadow: "0 4px 10px rgba(33, 150, 243, 0.3)",
                "&:hover": {
                  boxShadow: "0 6px 15px rgba(33, 150, 243, 0.4)",
                },
              }}
            >
              Save Payment Information
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default BillingInfo;
