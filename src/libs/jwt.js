import { TOKEN_SECRETO } from "../config.js";
import jwt from 'jsonwebtoken';

export function createAccessToken(payload) {

    return new Promise((resolve, reject) => {

            //token de acceso para usarlo varias veces
    jwt.sign(
    payload,
    TOKEN_SECRETO,
{
    expiresIn:"1d",
},
//collback
(err, token) => {
    if (err) reject(err)
        resolve(token)
    }
);
        
});
}
