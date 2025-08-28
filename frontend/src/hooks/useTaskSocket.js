import { useEffect } from "react";
import socket from "../utils/socket";
import { queryClient } from "../utils/queryClient";

export function useTaskSocket(currentUserId, setNotifications, setUnreadCount) {
  useEffect(() => {
    if (!currentUserId || !setNotifications || !setUnreadCount) return;

    // Load notifications from localStorage
    const stored = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(stored);
    setUnreadCount(stored.filter((n) => !n.read).length);

    socket.connect();
    socket.emit("joinRoom", currentUserId);

    socket.on("task:assigned", (data) => {
      const newNotification = {
        message: data.message,
        projectName: data.projectName,
        task: data.task,
        read: false,
        createdAt: new Date().toISOString(),
      };

      const updatedNotifications = [newNotification, ...stored];

      setNotifications(updatedNotifications);
      setUnreadCount((prev) => prev + 1);

      localStorage.setItem(
        "notifications",
        JSON.stringify(updatedNotifications)
      );

      queryClient.invalidateQueries({
        queryKey: ["tasks", "project", data.task.projectId],
      });
    });

    return () => {
      socket.off("task:assigned");
      socket.disconnect();
    };
  }, [currentUserId, setNotifications, setUnreadCount]);
}
