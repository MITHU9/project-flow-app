import * as yup from "yup";

export const taskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string(),
  assignedUser: yup.string().required("Assigned user is required"),
  deadline: yup.date().nullable(),
  priority: yup.string().oneOf(["low", "medium", "high"]),
  status: yup.string().oneOf(["todo", "progress", "done"]),
  tags: yup.array().of(yup.string()),
  attachments: yup.mixed(),
  taskPoints: yup.array().of(
    yup.object().shape({
      text: yup.string().required("Subtask text is required"),
      completed: yup.boolean(),
    })
  ),
  comments: yup
    .array()
    .of(
      yup.object().shape({
        text: yup.string().required("Comment text is required"),
        author: yup.string().required("Author is required"),
      })
    )
    .optional(), // <-- comments are now optional
  projectId: yup.string().required("Project is required"),
  boardId: yup.string().required("Board is required"),
});
