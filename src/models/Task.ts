import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
  title: string;
  description?: string;
  status: string;
  priority?: string;
  deadline?: Date;
  userId: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, required: true },
  priority: { type: String },
  deadline: { type: Date },
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

export default mongoose.models.Task ||
  mongoose.model<ITask>("Task", taskSchema);
