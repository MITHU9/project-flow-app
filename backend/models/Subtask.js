import mongoose from "mongoose";

const taskPointSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  completedAt: Date,
});

export default mongoose.model("Subtask", taskPointSchema);
