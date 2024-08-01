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
const apiRequest = async (url: string, data: object): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    throw new Error("An unknown error occurred.");
  }
};

// Define the login action
export const loginUser = createAsyncThunk<ApiResponse, LoginPayload>(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await apiRequest("/api/login", userData);

      // Store the token in localStorage if available
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Define the registration action
export const registerUser = createAsyncThunk<ApiResponse, RegisterPayload>(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await apiRequest("/api/register", userData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
