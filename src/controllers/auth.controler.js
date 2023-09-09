import User from "../models/User"
import jwt from "jsonwebtoken"
import config from "../config"
import Role from "../models/Role";

export const signUp = async(req, res) => {
    const {username, email, password, roles} = req.body;

    const newUser = new User ({
        username,
        email,
        password: await User.encryptPassword(password) //cada vez que guarde un usuario, la contraseña lo que guarda es el cifrado mediante encryptPassword, se guarda la contraseña encriptada.
    })
    //antes de guardar el usuario
    if(roles) { //si existe la propiedad roles
        const foundRoles = await Role.find({name: {$in: roles}}) // si el usuario ingresa el nombre de un rol, se guarda en foundRoles, devuelve un objeto u objetos
        newUser.roles = foundRoles.map(role => role._id) // se busca guardar un arreglo con los id de cada rol, y no los objetos, que recorra el foundRoles con el metodo map, y por cada objeto quiero que solo devuelvas el rol.id
    }else{
        const role = await Role.findOne({name: "user"}) // si no encuentra ningun rol, se buscara el rol llamado user
        newUser.roles = [role._id] // se guarda en el nuevousuario el id del rol user como arreglo por que roles es un arreglo
    }

    const savedUser = await newUser.save();
    console.log(savedUser)

    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn:86400 // 24 horas, el numero esta en segundos.

    } ) // tokens, es como crear un pase para el usuario y validad si se le da informacion o no
    
    res.status(200).json({token})
}

export const signin = async(req, res) => {
    res.json("signin")
}
