import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Container, Box, Typography } from "@mui/material";
import CheckoutForm from "../../components/Checkout/CheckoutForm";
import { useCart } from "../../context/cartContext";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const { cart, totalAmount } = useCart();

  if (cart.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" textAlign="center">
          Your cart is empty
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        Checkout
      </Typography>

      {/* Order Summary */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        {cart.map((item) => (
          <Box
            key={item._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: 1,
              borderBottom: "1px solid #eee",
            }}
          >
            <Typography>{item.title}</Typography>
            <Typography>${item.price.toFixed(2)}</Typography>
          </Box>
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: 2,
            fontWeight: "bold",
          }}
        >
          <Typography variant="h6">Total:</Typography>
          <Typography variant="h6">${totalAmount.toFixed(2)}</Typography>
        </Box>
      </Box>

      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Container>
  );
};

export default Checkout;
