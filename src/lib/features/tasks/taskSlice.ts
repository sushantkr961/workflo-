import { addTask, fetchTasks, updateTask } from "@/lib/Actions/taskAction";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the task interface
interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  deadline?: string;
}

// Define the state interface
interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

// Initial state for the tasks
const initialTaskState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Create the task slice
const taskSlice = createSlice({
  name: "tasks",
  initialState: initialTaskState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(
        fetchTasks.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error =
            action.payload || "An error occurred while fetching tasks.";
        }
      )
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(
        addTask.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error =
            action.payload || "An error occurred while adding the task.";
        }
      )
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(
        updateTask.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error =
            action.payload || "An error occurred while updating the task.";
        }
      );
  },
});

export default taskSlice.reducer;
