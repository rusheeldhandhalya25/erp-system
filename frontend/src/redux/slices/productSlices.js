import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* GET products */
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axios.get("http://localhost:5000/api/v1/products");
    return res.data;
  }
);

/* POST product */
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData) => {
    const res = await axios.post(
      "http://localhost:5000/api/v1/products",
      productData
    );
    return res.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load products";
      })

      // POST
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload); // instant UI update
      })
      .addCase(addProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to add product";
      });
  },
});

export default productSlice.reducer;
