import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define interfaces for the task data and responses
interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  deadline?: string;
}

interface TaskResponse {
  message: string;
  task?: Task;
}

// Fetch tasks action
export const fetchTasks = createAsyncThunk<
  Task[],
  void,
  { rejectValue: string }
>("tasks/fetchTasks", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/tasks", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue("An unknown error occurred.");
    }
  }
});

// Add task action
export const addTask = createAsyncThunk<
  Task,
  Omit<Task, "id">,
  { rejectValue: string }
>("tasks/addTask", async (taskData, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/tasks", taskData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.task;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue("An unknown error occurred.");
    }
  }
});

// Update task action
export const updateTask = createAsyncThunk<Task, Task, { rejectValue: string }>(
  "tasks/updateTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/tasks/${taskData.id}`, taskData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.task;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An unknown error occurred.");
      }
    }
  }
);
