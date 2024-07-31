import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Task from "@/models/Task";
import { authenticate } from "@/utils/authMiddleware";
import { connectDB } from "@/utils/db";

connectDB();

export const GET = async (req: NextRequest) => {
  const user = await authenticate(req);
  if (user instanceof NextResponse) return user;

  try {
    const tasks = await Task.find({
      userId: new mongoose.Types.ObjectId(user.id),
    });
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  const user = await authenticate(req);
  if (user instanceof NextResponse) return user;

  const { title, description, status, priority, deadline } = await req.json();

  if (!title || !status) {
    return NextResponse.json(
      { message: "Title and status are required" },
      { status: 400 }
    );
  }

  try {
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      deadline,
      userId: new mongoose.Types.ObjectId(user.id),
    });

    await newTask.save();
    return NextResponse.json(
      { message: "Task added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  const user = await authenticate(req);
  if (user instanceof NextResponse) return user;

  const { id, title, description, status, priority, deadline } =
    await req.json();

  if (!id) {
    return NextResponse.json(
      { message: "Task ID is required" },
      { status: 400 }
    );
  }

  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id),
        userId: new mongoose.Types.ObjectId(user.id),
      },
      { title, description, status, priority, deadline },
      { new: true }
    );

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Task updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
