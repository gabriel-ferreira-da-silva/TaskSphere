import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import CreateProjectPage from './pages/dashboard/createProject/createProjectPage';
import EditProjectPage from './pages/dashboard/editProject/editProject';
import ProjectPage from './pages/project/ProjectPage';
import CreateTaskPage from './pages/dashboard/task/createTaskPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/dashboard/create" element={<CreateProjectPage/>}/>
        <Route path="/dashboard/edit/:id" element={<EditProjectPage/>}/>
        
        <Route path="/projects/:projectId" element={<ProjectPage />} />
       
        <Route path="/project/:projectId/tasks/create" element={<CreateTaskPage />} />

        
      </Routes>
    </Router>
  );
}
