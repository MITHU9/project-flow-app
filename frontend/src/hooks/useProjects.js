import { getProjects } from "../api/projectApi";
import { useQuery } from "@tanstack/react-query";

export const useProjects = (id) => {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => getProjects(id),
    staleTime: 1000 * 60,
  });
};
