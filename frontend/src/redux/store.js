import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlices";
import orderReducer from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    orders: orderReducer,
  },
});

export default store;
