import api from "./api";

export const paymentService = {
  createPaymentIntent: async (amount, currency = "usd", templates) => {
    const response = await api.post("/payments/create-payment-intent", {
      amount,
      currency,
      templates,
    });
    return response.data;
  },

  createOrder: async (orderData) => {
    const response = await api.post("/orders", orderData);
    return response.data;
  },

  getUserOrders: async () => {
    const response = await api.get("/orders/my-orders");
    return response.data;
  },
};
