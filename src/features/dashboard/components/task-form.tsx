import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { addTaskAsync } from '../api/task-api';
import { Modal } from '../../../components/ui/modal';

export function TaskForm() {
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const addTaskMutation = useMutation({
    mutationFn: addTaskAsync,
    onSuccess: () => {
      // Làm hỏng cache ["tasks"] cũ => trigger query tự  fetch lại data
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      console.log('Đã invalidate key tasks');
    },
  });

  const handleSubmit = () => {
    if (input.trim() === '') {
      alert('Vui lòng nhập tiêu đề task');
      return;
    }

    addTaskMutation.mutate(input.trim());
    setInput('');
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
        onSubmit={() => handleSubmit()}
      >
        <form>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </form>
      </Modal>
    </>
  );
}
