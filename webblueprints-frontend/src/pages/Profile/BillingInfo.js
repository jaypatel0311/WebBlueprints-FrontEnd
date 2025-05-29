import React from "react";
import { Typography, Box, TextField, Button, Paper } from "@mui/material";

const BillingInfo = ({
  billingInfo,
  handleBillingInfoChange,
  handleBillingInfoSave,
}) => (
  <Paper sx={{ p: 4 }}>
    <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
      Billing Information
    </Typography>
    <Box
      component="form"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        mb: 4,
        alignItems: "center",
      }}
      onSubmit={handleBillingInfoSave}
    >
      <TextField
        label="Card Holder"
        name="cardHolder"
        value={billingInfo.cardHolder}
        sx={{ flex: 1, minWidth: 220 }}
        fullWidth={false}
        required
        onChange={handleBillingInfoChange}
      />
      <TextField
        label="Card Number"
        name="cardNumber"
        value={billingInfo.cardNumber}
        sx={{ flex: 1, minWidth: 220 }}
        fullWidth={false}
        required
        onChange={handleBillingInfoChange}
      />
      <TextField
        label="Expiry"
        name="expiry"
        value={billingInfo.expiry}
        sx={{ flex: 1, minWidth: 120 }}
        fullWidth={false}
        required
        onChange={handleBillingInfoChange}
      />
      <TextField
        label="Address"
        name="address"
        value={billingInfo.address}
        sx={{ flex: 2, minWidth: 220 }}
        fullWidth={false}
        required
        onChange={handleBillingInfoChange}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ height: 56, minWidth: 120, alignSelf: "flex-end" }}
      >
        Save
      </Button>
    </Box>
  </Paper>
);

export default BillingInfo;
