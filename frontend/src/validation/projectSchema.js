import * as yup from "yup";

export const projectSchema = yup.object().shape({
  name: yup.string().required("Project name is required"),
  description: yup.string().max(200, "Description must be under 200 chars"),
  color: yup.string().required(),
});
