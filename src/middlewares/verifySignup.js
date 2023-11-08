// se usa para verificar si envia un correo nuevo o si ya existe, o comprobar si el rol enviado ya fue creado, es como una validacion.
import {ROLES} from "../models/Role"
import User from "../models/User"


export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    
    const email = await User.findOne({email: req.body.email})
    if(email) return res.status(400).json({message: "El email ya existe"})

    next();
}

export const checkDuplicateId = async (req, res, next) => {
    
    const id = await User.findOne({id: req.body.id})
    if(id) return res.status(400).json({message: "El numero de identificacion ya existe"})

    next();
}

export const checkRolesExisted = async (req, res, next) => {
    if (req.body.rol) {
        for (let i = 0; i < req.body.rol.length; i++) {
            if (!ROLES.includes(req.body.rol[i])) {
                return res.status(400).json({
                    message: `Role ${req.body.rol[i]} does nor exists`
                })
            }
            
        }
    }
    next();
} 