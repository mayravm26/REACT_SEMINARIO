import { Router } from "express";
import { login } from "../controllers/autenti.controller.js";
import { registro } from "../controllers/autenti.controller.js";
import { logout } from "../controllers/autenti.controller.js";
import { perfil } from "../controllers/autenti.controller.js";
import { autenticacionReq } from "../middlewares/validarToken.js";
import { validateSchema } from "../middlewares/validacion.middlewares.js";
import { registerSchema } from "../schemas/autenticacio.schema.js";
import { loginSchema } from "../schemas/autenticacio.schema.js";
import {verifyToken} from "../controllers/autenti.controller.js"


const router = Router()

//rutas que vamos a ejecutar
router.post('/registro', validateSchema(registerSchema),registro);
router.post('/login', validateSchema(loginSchema),login);
router.post('/logout', logout);
router.get('/perfil',autenticacionReq,perfil );
router.get("/verify", verifyToken);

export default router