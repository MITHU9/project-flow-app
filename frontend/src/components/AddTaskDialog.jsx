import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

const AddTaskDialog = ({ isOpen, onOpenChange, onSubmitTask }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    onSubmitTask(data);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input {...register("title", { required: true })} />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea {...register("description")} />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">
              Add Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
