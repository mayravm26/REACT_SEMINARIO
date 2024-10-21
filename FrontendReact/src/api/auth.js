import axios from "axios";

const API = 'http://localhost:4000/api'; // Es nuestro backend
//para le registro
export const registerRequest = (user) => axios.post(`${API}/Registro`, user); 
//rutalogin
export const loginRequest = (user) => axios.post(`${API}/login`, user); 
export const verifyTokenRequest = async () => axios.get(`/auth/verify`);


//peticiones del backend