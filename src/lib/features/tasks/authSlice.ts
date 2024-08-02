import { loginUser, registerUser } from "@/lib/Actions/authActions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define separate state interfaces for login and registration
interface AuthState {
  token: string | null;
  loginStatus: "idle" | "loading" | "succeeded" | "failed";
  registerStatus: "idle" | "loading" | "succeeded" | "failed";
  loginError: string | null;
  registerError: string | null;
}

const initialState: AuthState = {
  token: null,
  loginStatus: "idle",
  registerStatus: "idle",
  loginError: null,
  registerError: null,
};

// Define a generic success action
const successAction = (
  state: AuthState,
  action: PayloadAction<{ message: string; token?: string }>
) => {
  state.loginError = null;
  state.registerError = null;
  if (action.payload.token) {
    state.token = action.payload.token;
  }
};

// Define a generic failure action
const failureAction = (state: AuthState, error: string) => {
  state.token = null;
  state.loginError = error;
  state.registerError = error;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.loginStatus = "idle";
      state.registerStatus = "idle";
      state.loginError = null;
      state.registerError = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // Handle login actions
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "loading";
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        successAction(state, action);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "failed";
        failureAction(state, action.payload as string);
      });

    // Handle registration actions
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = "loading";
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerStatus = "succeeded";
        successAction(state, action);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerStatus = "failed";
        failureAction(state, action.payload as string);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
