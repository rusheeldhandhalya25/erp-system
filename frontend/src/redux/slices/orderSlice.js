import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* GET orders */
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async () => {
    const res = await axios.get("http://localhost:5000/api/orders");
    return res.data;
  }
);

/* POST order */
export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (orderData) => {
    const res = await axios.post(
      "http://localhost:5000/api/orders",
      orderData
    );
    return res.data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load orders";
      })

      // POST
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addOrder.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to add order";
      });
  },
});

export default orderSlice.reducer;
