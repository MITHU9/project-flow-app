import { moveTaskService } from "../services/taskServices.js";

export const moveTaskSocket = async (io, data) => {
  try {
    const { taskId, newBoardId, newOrder } = data;

    const task = await moveTaskService(taskId, newBoardId, newOrder);

    // Broadcast to all connected clients
    io.emit("task:moved", {
      message: "Task moved successfully",
      task,
    });
  } catch (err) {
    console.error("❌ Error moving task:", err.message);
  }
};
