import { Route, Routes, BrowserRouter, useParams } from "react-router-dom";
import { TaskListPage } from "./components/TaskListPage";
import { TaskDetailPage } from "./components/TaskDetailPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskListPage />} />
        {/* Không truyền prop id ở đây nữa */}
        <Route path="/details/:id" element={<TaskDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
