import { Router } from "express";
import { autenticacionReq } from "../middlewares/validarToken.js";
import { crearTask } from "../controllers/tasks.controller.js";
import { eliminarTasks } from "../controllers/tasks.controller.js";
import { obtenerTasks } from "../controllers/tasks.controller.js";
import { updatetasks } from "../controllers/tasks.controller.js";
import { getTasks } from "../controllers/tasks.controller.js";




const router = Router()

router.get('/tasks',autenticacionReq,getTasks, (req,res)=> res.send('tasks')) //obtener
router.get('/tasks',autenticacionReq,obtenerTasks) //obeter solo uno con ID
router.post('/tasks',autenticacionReq,crearTask) //crear
router.delete('/tasks/:id',autenticacionReq,eliminarTasks) //eliminar
router.put('/tasks/:id',autenticacionReq,updatetasks)//actualizar


export default router