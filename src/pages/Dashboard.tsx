import { useState } from 'react';
import { type FilterTypes } from '../features/dashboard/components/task-filter';
import { TaskList } from '../features/dashboard/components/task-list';

export function Dashboard() {
  const [currentFilter, setCurrentFilter] = useState<FilterTypes>('all');
  return (
    <div className="container">
      <TaskList
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
      />
    </div>
  );
}
