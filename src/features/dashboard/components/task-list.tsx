import { TaskListItem } from './task-item';
import { TaskFilter, type FilterTypes } from './task-filter';
import { TaskForm } from './task-form';
import {
  priorityColors,
  type TaskItem,
  type TaskStatus,
} from '../types/TaskItem';
import { useEffect, useState } from 'react';
import { Modal } from '../../../components/ui/modal';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface TaskListProps {
  tasks: TaskItem[];
  currentFilter: FilterTypes;
  onFilterChange: (filter: FilterTypes) => void;
  onDeleteItem: (id: number) => void;
  onItemDone: (id: number) => void;
  onClickItem: (id: number) => void;
  onEditItem: (task: TaskItem) => void;
}

export function TaskList({
  tasks,
  currentFilter,
  onFilterChange,
  onDeleteItem,
  onEditItem,
  onItemDone,
  onClickItem,
}: TaskListProps) {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<TaskItem | undefined>(
    {} as TaskItem
  );

  const { register, handleSubmit, reset } = useForm<TaskItem>({
    // defaultValues: {
    //   id: activeItem?.id,
    //   title: activeItem?.title,
    //   priority: activeItem?.priority,
    //   status: activeItem?.status,
    // },
  });

  useEffect(() => {
    if (activeItem) reset(activeItem);
  }, [activeItem, reset]);

  const onEditSumit: SubmitHandler<TaskItem> = (data: TaskItem) => {
    setOpenEditModal(false);
    onEditItem(data);
  };

  // Show delete modal
  const onShowDeleteModal = (id: number) => {
    setActiveItem(tasks.find((t) => t.id == id));
    setOpenDeleteModal(true);
  };

  const handleDelete = () => {
    console.log(activeItem);
    setOpenDeleteModal(false);
    if (activeItem?.id !== undefined) onDeleteItem(activeItem?.id);

    return;
  };

  const onShowEditModal = (id: number) => {
    setActiveItem(tasks.find((t) => t.id == id));
    setOpenEditModal(true);
  };

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
                </div>
                <div className="d-flex justify-content-end mb-5 gap-2">
                  <TaskFilter
                    currentFilter={currentFilter}
                    onFilterChange={onFilterChange}
                  />
                  <TaskForm />
                </div>

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
                      <tr>
                        <td colSpan={4} style={{ textAlign: 'center' }}>
                          "Empty, let's create a task!"
                        </td>
                      </tr>
                    ) : (
                      tasks.map((task) => (
                        <TaskListItem
                          key={task.id}
                          task={task}
                          onToggle={onItemDone}
                          onDelete={onShowDeleteModal}
                          onClick={onClickItem}
                          onEdit={onShowEditModal}
                        />
                      ))
                    )}
                  </tbody>
                </table>
                {openDeleteModal && (
                  <Modal
                    title="Are you sure you want delete this item?"
                    onClose={() => setOpenDeleteModal(false)}
                    open={openDeleteModal}
                    onSubmit={() => handleDelete()}
                    customSubmitTitle="Delete"
                    customSubmitClass="btn-danger"
                  >
                    <p>This action is permanent and cannot be undone.</p>
                  </Modal>
                )}
                {openEditModal && (
                  <Modal
                    title={`Edit task ${activeItem?.title}`}
                    onClose={() => setOpenEditModal(false)}
                    open={openEditModal}
                    onSubmit={handleSubmit(onEditSumit)}
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
                      <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          {...register('status')}
                        >
                          {(
                            [
                              'New',
                              'InProgress',
                              'Pending',
                              'Done',
                            ] as TaskStatus[]
                          ).map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </form>
                  </Modal>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
