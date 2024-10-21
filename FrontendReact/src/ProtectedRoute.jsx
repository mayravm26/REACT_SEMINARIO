import { useAuth } from "./context/AutenticacioContex";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const { user, isAuthenticated, loading } = useAuth(); // loading esté definido
    console.log(user, isAuthenticated);

    // Mostrar un mensaje de carga mientras se verifica la autenticación
    if (loading) return <h1>Loading...</h1>;

    // Redirigir a la página de login si no está autenticado
    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;