//Componente que nos sirve para guardar la informacion en constante componentes que engloban a otros 
import { Children, createContext, useContext, useEffect, useState } from "react";
import { registerRequest, verifyTokenRequest } from "../api/auth";
import { loginRequest } from "../api/auth";
import { data } from "autoprefixer";
import Cookies from "js-cookie";



export const AuthContext = createContext();
export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context)
    {
        throw new Error("useAuth dentro del Authprovider"); //para no importar todos los datos 
    }
    return context;
};


export const AuthProvider = ({children}) => {

    const [user,setUser]= useState(null);
    const [isAuthenticated,setIsAuthenticated]= useState(false);
    const [errors, setErrors] = useState([]); //para visualizar mejor los errores 
    const [ loading,setLoading] = useState(true);

    //Login

    const signup= async (user) =>
    {
        //validamos que todo este OK 
        try{
            const res = await loginRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
            // envio de API
        } catch (error){
            console.log(error.response);
            setErrors(error.response.data);
           
        }
        
    };

    const signin = async (user) => {
        // validamos que todo esté OK 
        try {
            const res = await loginRequest(user);
            console.log(res);
            setUser (res.data);
            setIsAuthenticated(true);
            // Aquí puedes agregar cualquier lógica adicional para el envío de API
        } catch (error) {
            if (error.response) {
                if (Array.isArray(error.response.data)) {
                    return setErrors(error.response.data);
                }
                console.log(error.response);
                setErrors(error.response.data);
            } else {
                // Manejo de otros tipos de errores
                console.error("Error de conexión:", error);
                setErrors(["Error de conexión. Por favor, inténtelo de nuevo más tarde."]);
            }
        }
    };

        // para que los mensaje no se queden siempre limpiar
    useEffect(() => {
        if (errors.length > 0)
        {
            const timer = setTimeout(() =>
            {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    })

    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get();
            console.log(cookies);
            
            // Verificar si no hay token en las cookies
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                 return setUser (null);
                 // Salir de la función si no hay token
            }
    
            try {
                const res = await verifyTokenRequest(cookies.token); // Añadido await
                console.log(res); // Corregido console-log a console.log
    
                if (!res.data) { 
                    setIsAuthenticated(false);
                    setUser (null); //  usuario se establezca como null
                    setLoading(false);
                    return; // Salir de la función si no hay  datos
                }
    
                setIsAuthenticated(true);
                setUser (res.data);
            } catch (error) {
                setIsAuthenticated(false);
                setUser (null);
                console.log("Error al verificar el token:", error); // Añadido mensaje de error
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
    )
}

   