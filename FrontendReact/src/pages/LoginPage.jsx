import { useForm } from "react-hook-form";
import { useAuth } from "../context/AutenticacioContex";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin, errors: signinErrors, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await signin(data);
        } catch (error) {
            console.error("Error durante el inicio de sesión:", error);
            // Aquí podrías manejar el error de manera más específica
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/tasks");
        }
    }, [isAuthenticated, navigate]); // Añadido 'navigate' a las dependencias

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center w-full p-10 rounded-md">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                {Array.isArray(signinErrors) && signinErrors.map((error, i) => (
                    <div className="bg-red-500 p-2 text-white" key={i}>
                        {error}
                    </div>
                ))}

                <h1 className="text-2xl font-bold">LOGIN</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Email"
                    />
                    {errors.email && <p className="text-red-500">Email es necesario</p>}

                    <input
                        type="password"
                        {...register("password", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Password"
                    />
                    {errors.password && <p className="text-red-500">Password es necesario</p>}

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Login
                    </button>
                </form>
                <p className="flex gap-x-2 justify-between">
                    ¿Estás registrado? <Link to="/registro">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;