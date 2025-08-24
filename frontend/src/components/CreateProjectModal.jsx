import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { projectSchema } from "../validation/projectSchema";
import { useAuthContext } from "../hooks/useAuthContext";

const CreateProjectModal = ({ open, onClose, onCreate }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#3b82f6",
    },
  });

  const { user } = useAuthContext();

  const onSubmit = (data) => {
    onCreate({ ...data, createdBy: user._id });
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Fill in details to quickly start a new project.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Project Name */}
          <div>
            <label className="text-sm font-medium">Project Name</label>
            <Input
              placeholder="e.g. Marketing Campaign"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Description (textarea) */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              rows={4}
              placeholder="Optional project description"
              {...register("description")}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Modern Color Picker */}
          <div>
            <label className="text-sm font-medium mb-1 block">Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                {...register("color")}
                className="h-10 w-14 cursor-pointer rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden p-0 bg-transparent"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                {watch("color")}
              </span>
            </div>
            {errors.color && (
              <p className="text-sm text-red-500 mt-1">
                {errors.color.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button className="cursor-pointer" type="submit">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
