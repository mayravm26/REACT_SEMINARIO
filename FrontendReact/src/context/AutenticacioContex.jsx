import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, verifyTokenRequest, loginRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser ] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    // Registro
    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser (res.data);
        } catch (error) {
            handleError(error);
        }
    };

    // Inicio de sesión
    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setIsAuthenticated(true);
            setUser (res.data);
        } catch (error) {
            handleError(error);
        }
    };

    // Manejo de errores
    const handleError = (error) => {
        if (error.response) {
            if (Array.isArray(error.response.data)) {
                setErrors(error.response.data);
            } else {
                console.log(error.response);
                setErrors([error.response.data.message]);
            }
        } else {
            console.error("Error en la conexión:", error.message);
            setErrors(["Error en la conexión. Por favor, inténtalo de nuevo."]);
        }
    };

    // Limpiar mensajes de error después de 5 segundos
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    // Verificar el estado de autenticación al cargar
    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get();
            console.log(cookies);

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser (null);
            }

            try {
                const res = await verifyTokenRequest(cookies.token);
                console.log(res);

                if (!res.data) {
                    setIsAuthenticated(false);
                    setUser (null);
                } else {
                    setIsAuthenticated(true);
                    setUser (res.data);
                }
            } catch (error) {
                console.log("Error al verificar el token:", error);
                setIsAuthenticated(false);
                setUser (null);
            } finally {
                setLoading(false); // Asegurarse de que loading se actualice al final
            }
        };

        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            user,
            isAuthenticated,
            errors,
            loading,
        }}>
            {children}
        </AuthContext.Provider>
    );
};