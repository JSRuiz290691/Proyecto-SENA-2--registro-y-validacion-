// verifica si tienen toke, que tipo de rol tienen
import jwt from "jsonwebtoken"
import config from "../config"

import User from "../models/User"
import Role from "../models/Role"

// se crea un funcion para verificar si se esta enviadno un token
export const verifyToken = async (req, res, next) => {  // Esta funcion es un midelware de express, que recibe un request, response, next. Si pasa esta funcion continua y si no se peude devolver un error.
    try {
        const token = req.headers["x-access-token"]; // headers es una arreglo, en tu propiedad llamada X-access-token
        if (!token) return res.status(403).json({message: "No token proporsionado"}) // si no  existe, me envian el x-access-token, si existe continua.. 

        const decode = jwt.verify(token,config.SECRET) // si existe el token, se extrae lo del token y se guarda en la variable decode
        req.userId = decode.id; // en el objeto req estamos guardando una propiedad id, y como valor se tiene el id extraido dle token

        const user = await User.findById(req.userId, {password: 0}) // buscamos al usuario por su id, si no existe se regresa emnsaje no user found
        if (!user) return res.status(404).json({menssage: "no user found"})
    
        next()
    } catch (error) {
        return res.status(401).json({message: "No Autorizado"})
    }
};
export const isMedico = async (req, res, next) => { //para comprobar si es medico se requiere el id del usuario
    const user = await User.findById(req.userId); //se usa la misma variable que se uso arriba (userID) // obtenemos el usuario y lo guardamos en const user
    const roles = await Role.find({_id: {$in: user.roles}});  // de todo los roles quiero que busques los que cumplan con los id
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "medico") { 
            next()
            return;
        }
    }
    return res.status(403).json({message: "Requiere medico rol"})
};

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId); //se usa la misma variable que se uso arriba (userID) // obtenemos el usuario y lo guardamos en const user
    const roles = await Role.find({_id: {$in: user.roles}});  // de todo los roles quiero que busques los que cumplan con los id
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") { 
            next()
            return;
        }
    }
    return res.status(403).json({message: "Requiere Admin rol"})
}