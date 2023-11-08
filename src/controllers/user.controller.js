import User from "../models/User";
import Role from "../models/Role";


export const createUser = async (req, res) => {

        const {name, lastname, id, email, password, role} = req.body;

        const newUser = new User ({name, lastname, id, email, password, role}); // se guarda el nuevo usuario en la constante newUser

        const userSave = await newUser.save(); // se guarda el nuevo usuario en otra constante

        res.status(201).json(userSave) //retorna el usuario guardado como objeto json
    
}

export const getUsers = async (req, res) => {
    const users = await User.find().populate('role');
    res.status(200).json(users)
}

export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.userId).populate('role');
    res.status(200).json(user)
}

export const updateUserById = async (req, res) => {
    const {name, lastname, id, email, password, role} = req.body;

    let userData = {
        name, 
        lastname,
        id, 
        email
    }

    if(password) {
        userData.password = await User.encryptPassword(password);
    }

    if(role) { //si existe la propiedad roles
        const foundRole = await Role.find({name: {$in: role}}) // si el usuario ingresa el nombre de un rol, se guarda en foundRoles, devuelve un objeto u objetos
        userData.role = foundRole.map(role => role._id) // se busca guardar un arreglo con los id de cada rol, y no los objetos, que recorra el foundRoles con el metodo map, y por cada objeto quiero que solo devuelvas el rol.id
    }

    const updateUser = await User.findByIdAndUpdate(req.params.userId, userData, {
        new: true
    })
    res.status(200).json(updateUser)
}
export const deleteUserById = async (req, res) => {
    const {userId} = req.params;
    await User.findByIdAndRemove(userId)
    res.status(204).json()
}