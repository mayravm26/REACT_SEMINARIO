import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AutenticacioContex.jsx';
import TaskFormPage from './pages/TaskFormPage';
import PerfilPage from './pages/PerfilPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './ProtectedRoute';
import TasksPage from './pages/TasksPage';
import { TaskProvider } from './context/TaskContext.jsx';
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
      <BrowserRouter>
      <Navbar/>
        <div className="p-4">
          <h1 className="text-4xl font-bold">Hola Mundo</h1>
          <p>APP</p>
        </div>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          

          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/agregar-task" element={<TaskFormPage />} />
            <Route path="/tasks/:id" element={<TaskFormPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

      </TaskProvider>
      
    </AuthProvider>
  );
}

export default App;