import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import TaskForm from "./AddTaskDialog";
import { useCreateTask } from "../hooks/useCreateTask";
import toast from "react-hot-toast";
import { queryClient } from "../utils/queryClient";
import TaskCard from "./TaskCard";

const KanbanBoard = ({ boards, id }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentBoardId, setCurrentBoardId] = useState(null);
  const createTaskMutation = useCreateTask(id);

  const handleAddTask = (boardId) => {
    setCurrentBoardId(boardId);
    setOpenDialog(true);
    console.log("Open task dialog for board:", boardId);
  };

  const handleTaskAdd = (task) => {
    createTaskMutation.mutateAsync(
      {
        ...task,
        boardId: currentBoardId,
        projectId: id,
      },
      {
        onSuccess: () => {
          setOpenDialog(false);
          toast.success("Task created successfully!");
          queryClient.invalidateQueries({
            queryKey: ["project", id],
          });
        },
        onError: (error) => {
          console.error("Error creating task:", error);
        },
      }
    );
  };

  console.log(boards?.map((b) => b.tasks));

  return (
    <div className="flex flex-col lg:flex-row space-x-6 overflow-x-auto py-4 px-6 md:justify-center md:items-center gap-2">
      {boards.map((board) => (
        <div
          key={board._id}
          className="rounded-lg md:min-w-1/2 lg:w-1/4 flex-shrink-0 p-4"
          style={{
            backgroundColor: `${board.color}10`,
            border: `2px dashed ${board.color}80`,
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-white">{board.title}</h2>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAddTask(board._id)}
              className="border-white text-white hover:bg-white hover:text-gray-800"
            >
              <Plus size={16} />
            </Button>
          </div>
          <div className="space-y-3">
            {board.tasks.length > 0 ? (
              board.tasks.map((task) => <TaskCard key={task._id} task={task} />)
            ) : (
              <p className="text-gray-300 italic">No tasks yet</p>
            )}
          </div>
        </div>
      ))}
      {/* Task Modal */}
      <TaskForm
        isModalOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        onTaskAdd={handleTaskAdd}
        isLoading={createTaskMutation.isPending}
      />
    </div>
  );
};

export default KanbanBoard;
