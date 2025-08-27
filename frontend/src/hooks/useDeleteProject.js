import { useMutation } from "@tanstack/react-query";
import { API } from "../api/authApi";
import { queryClient } from "../utils/queryClient";

export const useDeleteProject = () => {
  return useMutation({
    mutationFn: (projectId) => API.delete(`/projects/${projectId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
