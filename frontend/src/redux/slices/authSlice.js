import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data) => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      data
    );
    localStorage.setItem("token", res.data.token);
    return res.data.user;
  }
);

// SIGNUP
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (data) => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/signup",
      data
    );
    return res.data.message;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = "Login failed";
      })

      // SIGNUP
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state) => {
        state.loading = false;
        state.error = "Signup failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
