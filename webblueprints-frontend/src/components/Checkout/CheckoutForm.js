import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useCart } from "../../context/cartContext";
import api from "../../utils/axiosInterceptor";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const user = useAuth();
  const navigate = useNavigate();
  const userData = user?.user || user;
  const userName =
    userData?.username || userData?.name || userData?.email || "User";
  const { cart, totalAmount, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Create payment intent on backend
      const { data } = await api.post("/payments/create-payment-intent", {
        amount: Math.round(totalAmount * 100), // Convert to cents
        currency: "usd",
        templates: cart.map((item) => ({
          templateId: item._id,
          title: item.title,
          price: item.price,
        })),
      });

      // Confirm payment with Stripe
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: userName,
            },
          },
        });

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent.status === "succeeded") {
        // Payment successful - create order
        await api.post("/payments/create-order", {
          paymentIntentId: paymentIntent.id,
          templates: cart.map((item) => item._id),
          totalAmount: totalAmount,
          status: "completed",
        });

        setSuccess(true);
        clearCart();
        navigate("/purchases");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Typography variant="h5" color="success.main" gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="body1">
          Thank you for your purchase. You can now download your templates.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 500, mx: "auto", p: 3 }}
    >
      <Typography variant="h5" gutterBottom>
        Complete Your Purchase
      </Typography>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Total: ${totalAmount.toFixed(2)}
      </Typography>

      <Box
        sx={{
          p: 2,
          border: "1px solid #ccc",
          borderRadius: 1,
          mb: 2,
          "& .StripeElement": {
            padding: "12px",
          },
        }}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
            },
            hidePostalCode: false,
            // Add these options to handle international postal codes
            postalCode: {
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                },
              },
            },
          }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={!stripe || loading}
        sx={{
          py: 1.5,
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
        }}
      >
        {loading ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            Processing...
          </>
        ) : (
          `Pay $${totalAmount.toFixed(2)}`
        )}
      </Button>
    </Box>
  );
};

export default CheckoutForm;
