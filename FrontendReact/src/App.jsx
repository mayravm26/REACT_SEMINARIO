import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Asegúrate de que esta línea solo aparezca una vez
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AutenticacioContex';
import TareasPage from './pages/TasksPage';
import TaskFormPage from './pages/TaskFormPage';
import PerfilPage from './pages/PerfilPage';
import HomePage from './pages/HomePage'; // Verifica que no haya duplicados aquí
import ProtectedRoute from './ProtectedRoute';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="p-4">
          <h1 className="text-4xl font-bold">Hola Mundo</h1>
          <p>APP</p>
        </div>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<TareasPage />} />
            <Route path="/agregar-task" element={<TaskFormPage />} />
            <Route path="/tasks/:id" element={<TaskFormPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;