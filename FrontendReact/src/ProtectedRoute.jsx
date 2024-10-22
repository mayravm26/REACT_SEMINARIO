import { useAuth } from "./context/AutenticacioContex";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const { loading,user, isAuthenticated } = useAuth(); // loading esté definido
    console.log(loading,isAuthenticated);

    if(loading) return <h1> Loanding</h1>

    // Redirigir a la página de login si no está autenticado
    if (!loading && !isAuthenticated) {
        return <Navigate to='/login' replace />;
    }
//componentes de dentro 
    return <Outlet />;
}

export default ProtectedRoute;

//Permite proteger las paginas o rutas 
