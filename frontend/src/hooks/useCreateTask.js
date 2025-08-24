import { queryClient } from "../utils/queryClient";
import { createTask } from "../api/taskApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateTask = () => {
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    },
  });
};
