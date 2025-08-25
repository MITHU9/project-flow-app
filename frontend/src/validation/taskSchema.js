import * as yup from "yup";

export const taskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().optional(),
  assignedUser: yup.string().required("Assigned user is required"),
  deadline: yup.date().nullable().optional(),
  priority: yup.string().oneOf(["low", "medium", "high"]).optional(),
  status: yup.string().oneOf(["todo", "progress", "done"]).optional(),
  tags: yup.string().optional(),
  attachment: yup.mixed().optional(),
  taskPoints: yup
    .array()
    .of(
      yup.object().shape({
        text: yup.string().required("Task point text is required"),
        completed: yup.boolean().default(false),
      })
    )
    .optional(),
  comments: yup
    .array()
    .of(
      yup.object().shape({
        text: yup.string().required("Comment text is required"),
        author: yup.string().required("Author is required"),
      })
    )
    .optional(),
});
