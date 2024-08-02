import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Interfaces for payloads and responses
interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface ApiResponse {
  message: string;
  token?: string;
}

// Helper function to handle API requests
const apiRequest = async (
  url: string,
  data: object
): Promise<{ data: ApiResponse; status: number }> => {
  try {
    const response = await axios.post<ApiResponse>(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { data: response.data, status: response.status };
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    throw new Error("An unknown error occurred.");
  }
};

// Define the login action
export const loginUser = createAsyncThunk<
  ApiResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const { data, status } = await apiRequest("/api/login", userData);
    // console.log("Login Data:", data);
    // console.log("Status Code:", status);

    if (status === 200 && data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Define the registration action
export const registerUser = createAsyncThunk<
  ApiResponse,
  RegisterPayload,
  { rejectValue: string }
>("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const { data, status } = await apiRequest("/api/register", userData);
    console.log("Register Data:", data);
    console.log("Status Code:", status);

    if (status === 201) {
      console.log("Registration successful");
    }

    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
