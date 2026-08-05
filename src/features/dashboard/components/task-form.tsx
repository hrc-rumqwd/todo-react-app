import { useState } from 'react';
import { Modal } from '../../../components/ui/modal';
import { priorityColors, type TaskItem } from '../types/TaskItem';
import { useCreateTaskMutation } from '../api/useCreateTaskMutation';
import { useForm, type SubmitHandler } from 'react-hook-form';

export function TaskForm() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<TaskItem>();

  const addTaskMutation = useCreateTaskMutation();

  const onSubmit: SubmitHandler<TaskItem> = (data, e) => {
    e?.preventDefault();
    addTaskMutation.mutate(data);

    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setOpen(true)}
      >
        Create Task
      </button>

      <Modal
        title="Create new task"
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <form>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              {...register('title')}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Priority</label>
            <select
              className="form-select"
              aria-label="Default select example"
              {...register('priority')}
            >
              {priorityColors.map((t) => (
                <option key={t.priority} value={t.priority}>
                  {t.priority}
                </option>
              ))}
            </select>
          </div>
        </form>
      </Modal>
    </>
  );
}
