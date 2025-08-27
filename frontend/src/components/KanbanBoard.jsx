import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import TaskForm from "./AddTaskDialog";
import { useCreateTask } from "../hooks/useCreateTask";
import toast from "react-hot-toast";
import { queryClient } from "../utils/queryClient";
import TaskCard from "./TaskCard";
import TaskDetailsModal from "./TaskDetailsModal";
import { useTaskSocket } from "../hooks/useTaskSocket";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import socket from "../utils/socket";
import { API } from "../api/authApi";

const KanbanBoard = ({ boards, id, currentUserId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentBoardId, setCurrentBoardId] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [localBoards, setLocalBoards] = useState(boards);

  const createTaskMutation = useCreateTask(id);

  // Socket hook for other events
  useTaskSocket(currentUserId);

  useEffect(() => {
    setLocalBoards(boards);

    // Join all board rooms
    boards.forEach((b) => socket.emit("joinBoard", b._id));

    // Listen for real-time reorder
    socket.on("tasks:reordered", ({ boardId, tasks }) => {
      setLocalBoards((prev) =>
        prev.map((b) =>
          b._id === boardId
            ? { ...b, tasks: tasks.sort((a, b) => a.order - b.order) }
            : b
        )
      );
    });

    return () => socket.off("tasks:reordered");
  }, [boards]);

  const handleAddTask = (boardId) => {
    setCurrentBoardId(boardId);
    setOpenDialog(true);
  };

  const handleSingleTaskClick = (taskId) => {
    setSelectedTaskId(taskId);
  };

  const handleTaskAdd = (task) => {
    createTaskMutation.mutateAsync(
      { ...task, boardId: currentBoardId, projectId: id },
      {
        onSuccess: () => {
          setOpenDialog(false);
          toast.success("Task created successfully!");
          queryClient.invalidateQueries({ queryKey: ["project", id] });
        },
        onError: (error) => console.error("Error creating task:", error),
      }
    );
  };

  const handleDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceBoardIndex = localBoards.findIndex(
      (b) => b._id === source.droppableId
    );
    const destBoardIndex = localBoards.findIndex(
      (b) => b._id === destination.droppableId
    );

    const sourceTasks = Array.from(localBoards[sourceBoardIndex].tasks);
    const destTasks =
      source.droppableId === destination.droppableId
        ? sourceTasks
        : Array.from(localBoards[destBoardIndex].tasks);

    // Remove task from source
    const [movedTask] = sourceTasks.splice(source.index, 1);
    // Insert into destination
    destTasks.splice(destination.index, 0, movedTask);

    // Update task orders and boardId
    const updatedSourceTasks = sourceTasks.map((t, i) => ({
      ...t,
      order: i,
      boardId: localBoards[sourceBoardIndex]._id,
    }));
    const updatedDestTasks = destTasks.map((t, i) => ({
      ...t,
      order: i,
      boardId: localBoards[destBoardIndex]._id,
    }));

    // Update local state correctly
    const updatedBoards = [...localBoards];
    updatedBoards[sourceBoardIndex] =
      source.droppableId === destination.droppableId
        ? { ...updatedBoards[sourceBoardIndex], tasks: updatedSourceTasks }
        : { ...updatedBoards[sourceBoardIndex], tasks: updatedSourceTasks };
    if (source.droppableId !== destination.droppableId) {
      updatedBoards[destBoardIndex] = {
        ...updatedBoards[destBoardIndex],
        tasks: updatedDestTasks,
      };
    }
    setLocalBoards(updatedBoards);

    try {
      const tasksToUpdate =
        source.droppableId === destination.droppableId
          ? updatedSourceTasks
          : [...updatedSourceTasks, ...updatedDestTasks];

      // Send all tasks in one request to backend
      await API.patch("/tasks/reorder", { tasks: tasksToUpdate });
    } catch (err) {
      console.error("Error updating task order:", err);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col lg:flex-row space-x-6 overflow-x-auto py-4 px-6 justify-center items-center lg:items-start gap-2">
        {localBoards.map((board) => (
          <Droppable droppableId={board._id} key={board._id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="rounded-lg md:w-3/5 lg:w-1/4 flex-shrink-0 p-4"
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
                    board.tasks
                      .sort((a, b) => a.order - b.order)
                      .map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => handleSingleTaskClick(task._id)}
                            >
                              <TaskCard task={task} />
                            </div>
                          )}
                        </Draggable>
                      ))
                  ) : (
                    <p className="text-gray-300 italic">No tasks yet</p>
                  )}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}

        {/* Task Modal */}
        <TaskForm
          isModalOpen={openDialog}
          onClose={() => setOpenDialog(false)}
          onTaskAdd={handleTaskAdd}
          isLoading={createTaskMutation.isPending}
        />

        <TaskDetailsModal
          isOpen={!!selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
          taskId={selectedTaskId}
        />
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
