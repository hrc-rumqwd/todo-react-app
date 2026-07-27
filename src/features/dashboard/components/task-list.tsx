import { useQuery } from '@tanstack/react-query';
import { fetchTasksAsync } from '../api/task-api';
import { TaskItem } from './task-item';
import { TaskFilter, type FilterTypes } from './task-filter';

interface TaskListProps {
  currentFilter: FilterTypes;
  onFilterChange: (filter: FilterTypes) => void;
}

export function TaskList({ currentFilter, onFilterChange }: TaskListProps) {
  // State contains Task list
  //   const [tasks, setTasks] = useState<Task[]>([]);
  //   const [isLoading, setIsLoading] = useState<boolean>(true);
  //   const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  //   useEffect(() => {
  //     setIsLoading(true);
  //     setTimeout(() => {
  //       setTasks([
  //         { id: 1, title: "Learn React", completed: false },
  //         { id: 2, title: "Learn TypeScript", completed: true },
  //         { id: 3, title: "Build a Todo App", completed: false },
  //       ]);
  //       setIsLoading(false);
  //     }, 1500);
  //   }, []);

  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasksAsync,
  });

  if (isLoading) return <p>Đang tải dữ liệu từ TanStack Query...</p>;
  if (isError) return <p>Lỗi: {(error as Error).message}</p>;

  //   const filteredTasks = tasks.filter((task) => {
  //     switch (filter) {
  //       case "active":
  //         return !task.completed;
  //       case "completed":
  //         return task.completed;
  //       default:
  //         return true;
  //     }
  //   });

  // Xử lý toggle hoàn thành
  const handleToggle = (id: number) => {};

  // Xử lý xóa task
  const handleDelete = (id: number) => {};

  return (
    <section>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-12 col-xl-10">
            <div className="card mask-custom">
              <div className="card-body p-4 text-white">
                <div className="text-center pt-3 pb-2">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                    alt="Check"
                    width="60"
                  />
                  <h2 className="my-4 text-dark">Task List</h2>
                </div>
                <div className="d-flex justify-content-end mb-5">
                  <TaskFilter
                    currentFilter={currentFilter}
                    onFilterChange={onFilterChange}
                  />
                </div>
                {isLoading ? (
                  <p>Loading tasks...</p>
                ) : isError ? (
                  <p>Lỗi: {(error as Error).message}</p>
                ) : (
                  <table className="table text-white mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Author</th>
                        <th scope="col">Task</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.length == 0 ? (
                        <p>Empty, let's create a task!</p>
                      ) : (
                        tasks.map((task) => (
                          <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={handleToggle}
                            onDelete={handleDelete}
                          />
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
