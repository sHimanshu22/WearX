import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to fetch user orders
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch user orders" }
      );
    }
  }
);

// Async thunk to fetch order details by ID
export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch order details" }
      );
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    totalOrders: 0,
    orderDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
  builder
    // Fetch user orders
    .addCase(fetchUserOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    .addCase(fetchUserOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders || action.payload;
      state.totalOrders = action.payload.totalOrders || action.payload.length;
    })

    .addCase(fetchUserOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to fetch orders";
    })
    .addCase(fetchOrderDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    .addCase(fetchOrderDetails.fulfilled, (state, action) => {
      state.loading = false;
        state.orderDetails = action.payload; // ✅ THIS FIX
      state.totalOrders = action.payload.totalOrders || action.payload.length;
    })

    .addCase(fetchOrderDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to fetch orders Details";
    });
}
});

export default orderSlice.reducer;
