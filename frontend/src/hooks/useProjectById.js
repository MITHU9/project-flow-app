import { getProject } from "../api/projectApi";
import { useQuery } from "@tanstack/react-query";

export const useProject = (id) => {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => getProject(id),
    staleTime: 1000 * 60, // cache 1 min
    enabled: !!id, // only run if id is provided
  });
};
