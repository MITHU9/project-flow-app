import { useMutation } from "@tanstack/react-query";
import { API } from "../api/authApi";
import { queryClient } from "../utils/queryClient";

export const useReorderTasks = (projectId) => {
  return useMutation({
    mutationFn: async ({
      tasks,
      sourceBoardId,
      destinationBoardId,
      movedTaskId,
    }) => {
      return API.patch("/tasks/reorder", {
        tasks,
        sourceBoardId,
        destinationBoardId,
        movedTaskId,
      });
    },
    // Optimistic update
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["project", projectId] });

      const previousData = queryClient.getQueryData(["project", projectId]);

      queryClient.setQueryData(["project", projectId], (old) => {
        if (!old) return old;
        return {
          ...old,
          boards: old.boards.map((b) =>
            b._id === variables.sourceBoardId
              ? {
                  ...b,
                  tasks: variables.tasks.filter((t) => t.boardId === b._id),
                }
              : b._id === variables.destinationBoardId
              ? {
                  ...b,
                  tasks: variables.tasks.filter((t) => t.boardId === b._id),
                }
              : b
          ),
        };
      });

      return { previousData };
    },
    // Rollback on error
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["project", projectId], context.previousData);
      }
    },
    // Sync with server after success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
  });
};
