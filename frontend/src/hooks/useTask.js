import { queryClient } from "../utils/queryClient";
import { getTaskById, toggleSubTask } from "../api/taskApi";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useTask = (id) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => getTaskById(id),
    enabled: !!id,
  });
};

export const useToggleSubTask = () => {
  return useMutation({
    mutationFn: ({ subTaskId }) => toggleSubTask(subTaskId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["task"],
      });
    },
  });
};
