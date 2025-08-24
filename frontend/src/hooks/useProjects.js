import { getProjects } from "../api/projectApi";
import { useQuery } from "@tanstack/react-query";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 1000 * 60,
  });
};
