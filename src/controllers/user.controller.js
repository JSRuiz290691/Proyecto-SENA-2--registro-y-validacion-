import User from "../models/User"


export const createUser = async (req, res) => {

        const {nombres, apellidos, fechaNacimiento, documentoIdentidad, email, password, roles} = req.body;

        const newUser = new User ({nombres, apellidos, fechaNacimiento, documentoIdentidad, email, password, roles});

        const userSave = await newUser.save();

        res.status(201).json(userSave)
    
}

export const getUsers = async (req, res) => {
    const users = await User.find();
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