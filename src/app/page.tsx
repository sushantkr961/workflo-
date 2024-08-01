"use client";

import { addTask, fetchTasks, updateTask } from "@/lib/Actions/taskAction";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { AppDispatch, RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Tasks: React.FC = () => {
  const dispatch = useAppDispatch<AppDispatch>();
  const router = useRouter();
  const { tasks, loading, error } = useAppSelector((state: RootState) => {
    console.log("task Data", state);
    return state.tasks;
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTask({ title, description, status, priority, deadline }));
    setTitle("");
    setDescription("");
    setStatus("");
    setPriority("");
    setDeadline("");
  };

  const handleUpdateTask = (id: string) => {
    dispatch(
      updateTask({ id, title, description, status, priority, deadline })
    );
  };

  useEffect(() => {
    if (error === "Invalid token") {
      router.push("/login");
    }
  }, [error, router]);

  return (
    <div>
      <h1>Tasks</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleAddTask}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="priority">Priority:</label>
          <input
            type="text"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          Add Task
        </button>
      </form>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task: any) => (
          <li key={task.id}>
            <h3>{task?.title}</h3>
            <p>{task?.description}</p>
            <p>{task?.status}</p>
            <p>{task?.priority}</p>
            <p>
              {task.deadline && new Date(task.deadline).toLocaleDateString()}
            </p>
            <button onClick={() => handleUpdateTask(task.id)}>
              Update Task
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
