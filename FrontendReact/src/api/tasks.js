/*import axios from "./axios";

export const getTasksRequest = async () => axios.get("/tasks"); //para pedir todas las tareas 
export const createTaskRequest = async (task) => axios.post("/tasks", task); //para crear
export const updateTaskRequest = async (task) =>  //actualizamos
  axios.put(`/tasks/${task._id}`, task);

export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`); //eliminar
export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`); //una tarea especifica

//mis peticines CRUD */

import axios from "./axios";

// Obtener todas las tareas
export const getTasksRequest = async () => {
  return axios.get("/tasks");
};

// Crear una nueva tarea
export const createTaskRequest = async (task) => {
  return axios.post("/tasks", task);
};

// Actualizar una tarea existente
export const updateTaskRequest = async (task) => {
  return axios.put(`/tasks/${task._id}`, task);
};

// Eliminar una tarea
export const deleteTaskRequest = async (id) => {
  return axios.delete(`/tasks/${id}`);
};

// Obtener una tarea específica
export const getTaskRequest = async (id) => {
  return axios.get(`/tasks/${id}`);
};