import User from "../models/User"
import jwt from "jsonwebtoken"
import config from "../config"
import Role from "../models/Role";
import Pet from "../models/Pet";

export const signUp = async(req, res) => {
    const {name, lastname, id, contactNumber, email, password, role, pets} = req.body;
    console.log('contactNumber: ', contactNumber);
    console.log('pets: ', pets);
    const newUser = new User ({
        name, 
        lastname,
        id,
        contactNumber,
        email, 
        password: await User.encryptPassword(password) //cada vez que guarde un usuario, la contraseña lo que guarda es el cifrado mediante encryptPassword, se guarda la contraseña encriptada.
    })
    //antes de guardar el usuario
    if(role) { //si existe la propiedad roles
        const foundRoles = await Role.find({name: {$in: role}}) // si el usuario ingresa el nombre de un rol, se guarda en foundRoles, devuelve un objeto u objetos
        newUser.role = foundRoles.map(role => role._id) // se busca guardar un arreglo con los id de cada rol, y no los objetos, que recorra el foundRoles con el metodo map, y por cada objeto quiero que solo devuelvas el rol.id
    }else{
        const role = await Role.findOne({name: "user"}) // si no encuentra ningun rol, se buscara el rol llamado user
        newUser.role = [role._id] // se guarda en el nuevousuario el id del rol user como arreglo por que roles es un arreglo
    }
    if(pets){
        const foundPets = await Pet.find({_id: {$in: pets}});
        newUser.pets = [foundPets.map(pet => pet._id)];
        console.log('foundPets: ', foundPets);
    }

    const savedUser = await newUser.save();
    console.log('user created: ', savedUser);
    

    const token = jwt.sign({id: savedUser._id}, config.SECRET, {  // tokens, es como crear un pase para el usuario y validad si se le da informacion o no
        expiresIn:86400 // 24 horas, el numero esta en segundos.
} ) 
    
    res.status(200).json({message: "Usuario creado exitosamente"})
}

export const signin = async(req, res) => {
    const userFound = await User.findOne({email: req.body.email}).populate("role"); // busca el email de la req que envia el usuario

    if(!userFound) return res.status(400).json({token: null, message: "Usuario no encontrado"}) // si no la encuentra 

    const matchPassword = await User.comparePassword(req.body.password, userFound.password) // compara el password que esta guardado con el que envia el usuario para comparar si son iguales. 

    if (!matchPassword) return res.status(401).json({token: null, message: "Password no valido"}) // si no son iguales

    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn:86400 // 1 dia en segundos
    })
    res.json({user:userFound, token:token})
}
