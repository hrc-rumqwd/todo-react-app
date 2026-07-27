import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { addTaskAsync } from '../api/task-api';

export function TaskForm() {
  const [input, setInput] = useState('');

  const queryClient = useQueryClient();

  const addTaskMutation = useMutation({
    mutationFn: addTaskAsync,
    onSuccess: () => {
      // Làm hỏng cache ["tasks"] cũ => trigger query tự  fetch lại data
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      console.log('Đã invalidate key tasks');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim() === '') {
      alert('Vui lòng nhập tiêu đề task');
      return;
    }

    addTaskMutation.mutate(input.trim());
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '15px' }}>
      <input
        type="text"
        placeholder="Enter a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" disabled={addTaskMutation.isPending}>
        {addTaskMutation.isPending ? 'Đang tạo...' : 'Thêm task'}
      </button>
    </form>
  );
}
