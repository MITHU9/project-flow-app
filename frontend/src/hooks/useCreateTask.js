import { queryClient } from "../utils/queryClient";
import { createTask } from "../api/taskApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateTask = (projectId) => {
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", "project", projectId],
      });
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    },
  });
};
