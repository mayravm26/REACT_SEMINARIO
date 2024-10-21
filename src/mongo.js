import mongoose from "mongoose";

//para verificr la conexion con la bbdd
export const connectDB = async() =>{

    try{

        await mongoose.connect('mongodb://localhost/api');
        console.log("Se ha coenctado a al Base de Datos Correctamente")
    }
    catch (error)
    {
        console.log(error);
    }
   
    
};

