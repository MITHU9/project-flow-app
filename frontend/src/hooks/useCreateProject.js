// src/hooks/useCreateProject.js
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/queryClient";
import { createProject } from "../api/projectApi";

export const useCreateProject = () => {
  return useMutation({
    mutationFn: createProject,
    onSuccess: (newProject) => {
      queryClient.invalidateQueries(["projects"]);
      // Optimistically update the new project in the cache
      queryClient.setQueryData(["project", newProject._id], newProject);
    },
  });
};
