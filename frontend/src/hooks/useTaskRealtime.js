import { useEffect } from "react";
import socket from "../utils/socket";
import { queryClient } from "../utils/queryClient";

export function useTaskRealtime(taskId, onSubTaskUpdate) {
  useEffect(() => {
    if (!taskId) return;

    socket.connect();
    socket.emit("joinTask", taskId);

    socket.on("subtask:updated", (updatedSubTask) => {
      if (onSubTaskUpdate) {
        onSubTaskUpdate(updatedSubTask);
      }

      // Optionally refresh queries for this task/project
      queryClient.invalidateQueries({
        queryKey: ["tasks", "project", updatedSubTask.taskId],
      });
    });

    return () => {
      socket.off("subtask:updated");
    };
  }, [taskId, onSubTaskUpdate]);
}
