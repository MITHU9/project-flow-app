import { useEffect } from "react";
import socket from "../utils/socket";
import { queryClient } from "../utils/queryClient";

export function useTaskRealtime(taskId, handlers = {}) {
  useEffect(() => {
    if (!taskId) return;

    socket.connect();
    socket.emit("joinTask", taskId);

    // ✅ Subtask updates
    const handleSubTaskUpdate = (updatedSubTask) => {
      handlers.onSubTaskUpdate?.(updatedSubTask);

      // Keep react-query cache in sync
      queryClient.invalidateQueries({
        queryKey: ["task", taskId],
      });
    };

    // ✅ Comment updates
    const handleCommentAdded = (newComment) => {
      handlers.onCommentAdded?.(newComment);

      queryClient.invalidateQueries({
        queryKey: ["task", taskId],
      });
    };

    socket.on("subtask:updated", handleSubTaskUpdate);
    socket.on("comment:added", handleCommentAdded);

    return () => {
      socket.off("subtask:updated", handleSubTaskUpdate);
      socket.off("comment:added", handleCommentAdded);
      socket.emit("leaveTask", taskId);
    };
  }, [taskId, handlers]);
}
