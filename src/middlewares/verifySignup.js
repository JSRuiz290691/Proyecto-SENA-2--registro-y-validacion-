// se usa para verificar si envia un correo nuevo o si ya existe, o comprobar si el rol enviado ya fue creado, es como una validacion.
import {ROLES} from "../models/Role"
import User from "../models/User"


export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    
    const email = await User.findOne({email: req.body.email})
    if(email) return res.status(400).json({message: "El email ya existe"})

    next();
}

export const checkRolesExisted = async (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} does nor exists`
                })
            }
            
        }
    }
    next();
}