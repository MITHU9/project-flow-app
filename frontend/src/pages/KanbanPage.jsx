import KanbanBoard from "../components/KanbanBoard";

const KanbanPage = () => {
  // Dummy data following backend model
  const boards = [
    {
      _id: "board1",
      title: "To Do",
      tasks: [
        { _id: "task1", title: "Task 1", description: "Description 1" },
        { _id: "task2", title: "Task 2", description: "Description 2" },
      ],
    },
    {
      _id: "board2",
      title: "In Progress",
      tasks: [{ _id: "task3", title: "Task 3", description: "Description 3" }],
    },
    {
      _id: "board3",
      title: "Done",
      tasks: [{ _id: "task4", title: "Task 4", description: "Description 4" }],
    },
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200">
      <h1 className="text-3xl font-bold p-6">Project Name</h1>
      <KanbanBoard boards={boards} />
    </div>
  );
};

export default KanbanPage;
