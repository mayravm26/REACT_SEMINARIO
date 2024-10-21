import axios from "./axios";

export const getTasksRequest = async () => axios.get("/tasks"); //para pedir todas las tareas 
export const createTaskRequest = async (task) => axios.post("/tasks", task); //para crear
export const updateTaskRequest = async (task) =>  //actualizamos
  axios.put(`/tasks/${task._id}`, task);

export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`); //eliminar
export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`); //una tarea especifica