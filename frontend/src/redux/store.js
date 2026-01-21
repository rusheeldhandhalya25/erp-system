import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlices";
import orderReducer from "./slices/orderSlice";
import authReducer from "./slices/authSlice";




const store = configureStore({
  reducer: {
    products: productReducer,
    orders: orderReducer,
    auth: authReducer
  },
});

export default store;
