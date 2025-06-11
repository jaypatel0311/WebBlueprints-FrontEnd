import React, { createContext, useContext, useReducer, useEffect } from "react";

// Initial state
const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

// Actions
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const CLEAR_CART = "CLEAR_CART";

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { item } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItemIndex !== -1) {
        // Item exists in cart, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };

        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalAmount: state.totalAmount + item.price,
        };
      } else {
        // Add new item to cart
        const newItem = {
          ...item,
          quantity: 1,
        };

        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1,
          totalAmount: state.totalAmount + item.price,
        };
      }
    }

    case REMOVE_FROM_CART: {
      const { itemId } = action.payload;
      const itemToRemove = state.items.find((item) => item._id === itemId);

      if (!itemToRemove) return state;

      const updatedItems = state.items.filter((item) => item._id !== itemId);

      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems - itemToRemove.quantity,
        totalAmount:
          state.totalAmount - itemToRemove.price * itemToRemove.quantity,
      };
    }

    case UPDATE_QUANTITY: {
      const { itemId, quantity } = action.payload;
      if (quantity <= 0) {
        // Remove item if quantity is zero or negative
        return cartReducer(state, {
          type: REMOVE_FROM_CART,
          payload: { itemId },
        });
      }

      const existingItemIndex = state.items.findIndex(
        (item) => item._id === itemId
      );

      if (existingItemIndex === -1) return state;

      const item = state.items[existingItemIndex];
      const quantityDifference = quantity - item.quantity;

      const updatedItems = [...state.items];
      updatedItems[existingItemIndex] = {
        ...item,
        quantity,
      };

      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDifference,
        totalAmount: state.totalAmount + quantityDifference * item.price,
      };
    }

    case CLEAR_CART:
      return initialState;

    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  // Load cart from localStorage on initial render
  const loadCartFromLocalStorage = () => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
    return initialState;
  };

  const [state, dispatch] = useReducer(
    cartReducer,
    initialState,
    loadCartFromLocalStorage
  );

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(state));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [state]);

  // Actions
  const addToCart = (item) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { item },
    });
  };

  const removeFromCart = (itemId) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: { itemId },
    });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({
      type: UPDATE_QUANTITY,
      payload: { itemId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        totalItems: state.totalItems,
        totalAmount: state.totalAmount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
