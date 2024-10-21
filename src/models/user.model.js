//datos que vamos a guardar
import mongoose from 'mongoose'

//esquema de mi usuario
const userSchemas= new mongoose.Schema({

    username:{
        type:String,
        require: true,
    },
    email:{
        type:String,
        require: true,
        unique: true,
    },
    
    password:{
        type:String,
        require: true,
    },
    
}, {timestamps:true})

export default mongoose.model('User', userSchemas) //como guardamos en nuestra BBDD PARA GUARDARLO PARA LAS CONSULTAS