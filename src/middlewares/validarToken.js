//validamos antes de llegar a una ruta 
import jwt from 'jsonwebtoken'
import { TOKEN_SECRETO } from '../config.js';


export const autenticacionReq =( req,res,next) =>{
   const {token} = req.cookies;
    //console.log(token);
    if(!token)
        return res.status(401).json({message: "No autorizado"});

    jwt.verify(token,TOKEN_SECRETO,(err, user) => {
        if (err) return res.status(403).json({message: "Token invalido"});
        req.user=user
        next();
    })

    //console.log( req.headers)

    /*const cookies= req.cookies
    console.log(cookies);*/

};