import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:"products",
    initialState:{
        list:[],
    },
    reducers:{
        addProduct:(state,action) => {
            state.list.push(action.payload);
        },
        removeProduct:(state,action) =>{
            state.list = state.list.filter(
                (item) => item.id !== action.payload
            );
        },

        reduceStock: (state, action) => {
      const { productId, quantity } = action.payload;

      const product = state.list.find(
        (item) => item.id === productId
      );

      if (product) {
        product.stock -= quantity;
      }
    }
    },
});

export const { addProduct , removeProduct , reduceStock} = productSlice.actions;
export default productSlice.reducer;