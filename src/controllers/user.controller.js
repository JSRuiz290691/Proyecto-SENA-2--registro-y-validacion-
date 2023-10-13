import User from "../models/User"


export const createUser = async (req, res) => {

        const {name, lastname, id, email, password, roles} = req.body;

        const newUser = new User ({name, lastname, id, email, password, roles}); // se guarda el nuevo usuario en la constante newUser

        const userSave = await newUser.save(); // se guarda el nuevo usuario en otra constante

        res.status(201).json(userSave) //retorna el usuario guardado como objeto json
    
}

export const getUsers = async (req, res) => {
    const users = await User.find().populate('roles');
    res.status(200).json(users)
}

export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user)
}

export const updateUserById = async (req, res) => {
    const updateUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true
    })
    res.status(200).json(updateUser)
}
export const deleteUserById = async (req, res) => {
    const {userId} = req.params;
    await User.findByIdAndRemove(userId)
    res.status(204).json()
}