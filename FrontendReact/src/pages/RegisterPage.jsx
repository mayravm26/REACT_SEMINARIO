/*import { useForm } from "react-hook-form";
import { useAuth } from "../context/AutenticacioContex"; // Asegúrate de que el nombre del contexto sea correcto
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const [errorMessage, setErrorMessage] = useState(""); // Inicializar como cadena vacía
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate("/tasks");
    }, [isAuthenticated, navigate]);

    // Declarar onSubmit como async para manejar la promesa de signup
    const onSubmit = async (values) => {
        try {
            const response = await signup(values); // Retorno de una promesa
            console.log("Registro exitoso:", response);
            // Puedes redirigir o mostrar un mensaje de éxito aquí
            navigate("/tasks"); // Redirigir después del registro exitoso
        } catch (error) {
            console.error("Error al registrar:", error.message);
            setErrorMessage("Error al registrar: " + error.message); // Mensaje de error al usuario
        }
        console.log(values);
    };

    return (
        <div className="w-full bg-zinc-800 max-w-md p-10 rounded-md">
            <h1 className="text-white text-xl font-bold">Register Page</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register("username", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Username"
                />
                {errors.username && <p className="text-red-500">Username es necesario</p>}

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
                
                {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Mostrar mensaje de error }

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Register
                </button>
            </form>
            <p className="flex gap-x-2 justify-between">
                ¿Tienes usuario? <Link to="/login" className="text-sky-500">Login</Link>
            </p>
        </div>
    );
}

export default RegisterPage; */


import { useEffect } from "react";
import { useAuth } from "../context/AutenticacioContex.jsx"; // Asegúrate de que el nombre del contexto sea correcto
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../components";
import { registerSchema } from "../schemas/auth"; // Asegúrate de que este esquema esté definido
import { zodResolver } from "@hookform/resolvers/zod";

function RegisterPage() {
    const { signup, errors: registerErrors, isAuthenticated } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema), // Usar zod para validación
    });
    const navigate = useNavigate();

    // Manejo del envío del formulario
    const onSubmit = async (values) => {
        try {
            await signup(values);
            navigate("/tasks"); // Redirigir después del registro exitoso
        } catch (error) {
            console.error("Error al registrar:", error.message);
        }
    };

    useEffect(() => {
        if (isAuthenticated) navigate("/tasks");
    }, [isAuthenticated, navigate]);

    return (
        <div className="h-[calc(100vh-100px)] flex items-center justify-center">
            <Card>
                {Array.isArray(registerErrors) && registerErrors.map((error, i) => (
                    <Message message={error} key={i} />
                ))}
                <h1 className="text-3xl font-bold">Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Label htmlFor="username">Username:</Label>
                    <Input
                        type="text"
                        name="username"
                        placeholder="Write your name"
                        {...register("username", { required: "Username es necesario" })}
                        autoFocus
                    />
                    {errors.username && <p className="text-red-500">{errors.username.message}</p>}

                    <Label htmlFor="email">Email:</Label>
                    <Input
                        name="email"
                        placeholder="youremail@domain.tld"
                        {...register("email", { required: "Email es necesario" })}
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    <Label htmlFor="password">Password:</Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="********"
                        {...register("password", { required: "Password es necesario", minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" } })}
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                    <Label htmlFor="confirmPassword">Confirm Password:</Label>
                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="********"
                        {...register("confirmPassword", { required: "Confirmar contraseña es necesario" })}
                    />
                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

                    <Button type="submit">Register</Button>
                </form>
                <p>
                    ¿Tienes usuario? <Link className="text-sky-500" to="/login">Login</Link>
                </p>
            </Card>
        </div>
    );
}

export default RegisterPage;
