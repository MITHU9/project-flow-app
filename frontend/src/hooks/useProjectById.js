import { getProject } from "../api/projectApi";
import { useQuery } from "@tanstack/react-query";

export const useProject = (id) => {
  return useQuery({
    queryKey: ["project", id, "tasks"],
    queryFn: () => getProject(id),
    staleTime: 1000 * 60, // cache 1 min
  });
};
