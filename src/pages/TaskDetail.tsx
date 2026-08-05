import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTaskDetail } from '../features/dashboard/api/useFetchTaskDetail';

export function TaskDetail() {
  // Lấy parameter từ URL xuống
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // In a real application, you would fetch the task details based on the ID
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['task-detail', id],
    queryFn: () => fetchTaskDetail(Number(id)),
  });

  const navigateToList = () => navigate('/');

  if (isLoading) return <p>Loading tasks...</p>;
  if (isError) return <p>Load data failed: {(error as Error).message}</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <button onClick={() => navigateToList()}>Quay lại danh sách</button>
      <h1>Task Detail</h1>
      <p>
        <strong>ID:</strong> {data?.id}
      </p>
      <p>
        <strong>Title:</strong> {data?.title}
      </p>
    </div>
  );
}
