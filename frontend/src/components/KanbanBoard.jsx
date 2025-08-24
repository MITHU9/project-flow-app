import { useState } from "react";
import AddTaskDialog from "./AddTaskDialog";
import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";

const KanbanBoard = ({ boards, id }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentBoardId, setCurrentBoardId] = useState(null);

  const handleAddTask = (boardId) => {
    setCurrentBoardId(boardId);
    setOpenDialog(true);
  };

  const onSubmitTask = (data) => {
    console.log("Add task to board:", currentBoardId, data);
    // integrate with API or socket.io later
  };

  return (
    <div className="flex space-x-6 overflow-x-auto py-4 px-6">
      {boards.map((board) => (
        <div
          key={board._id}
          className="rounded-lg w-64 flex-shrink-0 p-4"
          style={{
            backgroundColor: `${board.color}33`,
            border: `2px dashed ${board.color}`,
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
              board.tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-gray-700 p-3 rounded-lg shadow hover:bg-gray-600 cursor-pointer"
                >
                  <h3 className="font-medium text-white">{task.title}</h3>
                  <p className="text-sm text-gray-300">{task.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-300 italic">No tasks yet</p>
            )}
          </div>
        </div>
      ))}
      <AddTaskDialog
        isOpen={openDialog}
        onOpenChange={setOpenDialog}
        onSubmitTask={onSubmitTask}
        projectId={id}
      />
    </div>
  );
};

export default KanbanBoard;
