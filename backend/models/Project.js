import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    color: { type: String, default: "#3B82F6" },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
    deadline: Date,
    progress: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "archived"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
