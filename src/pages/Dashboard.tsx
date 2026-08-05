import { useState } from 'react';
import { type FilterTypes } from '../features/dashboard/components/task-filter';
import { TaskList } from '../features/dashboard/components/task-list';
import { Loading } from '../components/ui/loading';
import { useTasks } from '../features/dashboard/api/useTasks';
import { useNavigate } from 'react-router-dom';
import { useUpdateTaskMutation } from '../features/dashboard/api/useUpdateTaskMutation';
import { useRemoveTaskMutation } from '../features/dashboard/api/useRemoveTaskMutation';
import type { TaskItem } from '../features/dashboard/types/TaskItem';

export function Dashboard() {
  const [currentFilter, setCurrentFilter] = useState<FilterTypes>('all');
  const navigate = useNavigate();

  const { data: tasks, isLoading, isError, error } = useTasks(currentFilter);

  const removeTaskMutation = useRemoveTaskMutation();
  const toggleTaskMutation = useUpdateTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();

  if (isLoading) return <Loading />;
  if (isError) return <p>Lỗi: {(error as Error).message}</p>;

  // const filteredTasks =
  //   tasks?.items.filter((task) => {
  //     switch (currentFilter) {
  //       case 'active':
  //         return !task.completed;
  //       case 'completed':
  //         return task.completed;
  //       default:
  //         return true;
  //     }
  //   }) ?? [];

  // Xử lý toggle hoàn thành
  const handleToggle = (id: number) => {
    const currentItem = tasks?.items.find((t) => t.id == id);

    if (!currentItem) return;
    const updated = { ...currentItem, status: 'Done' } as TaskItem;
    toggleTaskMutation.mutate(updated);
  };

  const handleDelete = async (id) => {
    removeTaskMutation.mutate(id);
  };

  const handleEdit = async (taskItem: TaskItem) => {
    updateTaskMutation.mutate(taskItem);
  };

  const onClickItem = (id: number) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="container">
      <TaskList
        tasks={tasks?.items ?? []}
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
        onClickItem={onClickItem}
        onItemDone={handleToggle}
        onDeleteItem={handleDelete}
        onEditItem={handleEdit}
      />
    </div>
  );
}
