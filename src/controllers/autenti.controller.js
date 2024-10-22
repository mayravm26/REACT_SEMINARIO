import User from '../models/user.model.js';
import { createAccessToken } from '../libs/jwt.js';
import bcrypt from "bcryptjs";

export const registro = async (req, res) => {

    const { email, password, username } = req.body;
    try {
        
      console.log(email, password, username);
        
        const userFound = await User.findOne({ email });
        if (userFound) {
            return res.status(400).json(["El email ya está en uso"]);
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser  = new User({ username, email, password: passwordHash });
        const userSaved = await newUser .save();

        const token = createAccessToken({ id: userSaved._id });
        res.cookie('token', token);
        res.json({
            message: "Usuario creado correctamente",
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
        console.log(newUser );
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        const userFound = await User.findOne({ email });
        if (!userFound) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = createAccessToken({ id: userFound._id, username: userFound.username });
        res.cookie('token', token, {
            sameSite: 'none',
            secure : true,
            httpOnly: false
        });
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

export const logout = (req, res) => {
    res.cookie('token', "", { expires: new Date(0) });
    return res.sendStatus(200);
};

export const perfil = async (req, res) => {
    try {
        const userFound = await User.findById(req.user.id);
        if (!userFound) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

export const verifyToken = async (req,res)=> {

    //verificamos que exise

    const { token } = req.cookies;
  if (!token) return res.status(4001).json({message :"Sin autorizacion"});

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.status(401).json({message:"No autorizado"});

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
