import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as actionTypes from "./ActionTypes";

export const register = createAsyncThunk(
  actionTypes.REGISTER_REQUEST,
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  actionTypes.LOGIN_REQUEST,
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post("/api/login", { email, password });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchTasks = createAsyncThunk(
  actionTypes.FETCH_TASKS_REQUEST,
  async (_, thunkAPI) => {
    const { auth } = thunkAPI.getState() as { auth: { token: string } };
    if (!auth.token) return thunkAPI.rejectWithValue("No token provided");

    try {
      const response = await axios.get("/api/tasks", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addTask = createAsyncThunk(
  actionTypes.ADD_TASK_REQUEST,
  async (
    taskData: {
      title: string;
      description?: string;
      status: string;
      priority?: string;
      deadline?: string;
    },
    thunkAPI
  ) => {
    const { auth } = thunkAPI.getState() as { auth: { token: string } };
    if (!auth.token) return thunkAPI.rejectWithValue("No token provided");

    try {
      const response = await axios.post("/api/tasks", taskData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  actionTypes.UPDATE_TASK_REQUEST,
  async (
    taskData: {
      id: string;
      title: string;
      description?: string;
      status: string;
      priority?: string;
      deadline?: string;
    },
    thunkAPI
  ) => {
    const { auth } = thunkAPI.getState() as { auth: { token: string } };
    if (!auth.token) return thunkAPI.rejectWithValue("No token provided");

    try {
      const response = await axios.put("/api/tasks", taskData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = () => ({
  type: actionTypes.LOGOUT,
});
