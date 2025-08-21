import { useState } from "react";
import AddTaskDialog from "./AddTaskDialog";
import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";

const KanbanBoard = ({ boards }) => {
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
          className="bg-gray-800 rounded-lg w-64 flex-shrink-0 p-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">{board.title}</h2>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAddTask(board._id)}
            >
              <Plus size={16} />
            </Button>
          </div>
          <div className="space-y-3">
            {board.tasks.map((task) => (
              <div
                key={task._id}
                className="bg-gray-700 p-3 rounded-lg shadow hover:bg-gray-600 cursor-pointer"
              >
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-300">{task.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <AddTaskDialog
        isOpen={openDialog}
        onOpenChange={setOpenDialog}
        onSubmitTask={onSubmitTask}
      />
    </div>
  );
};

export default KanbanBoard;
