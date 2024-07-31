export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "To-Do" | "In Progress" | "Under Review" | "Completed";
  priority?: "Low" | "Medium" | "Urgent";
  deadline?: Date;
  userId: string; // Change ObjectId to string
}

export interface TaskState {
  tasks: Task[];
}
