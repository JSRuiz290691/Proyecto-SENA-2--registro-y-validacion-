import User from "../models/User";
import Role from "../models/Role";
import Pet from "../models/Pet"

export const getUsers = async (req, res) => {
    const users = await User.find().populate('role').populate('pets'); //populate recupera los datos de las referencias anidadas
    res.status(200).json(users)
}

export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.userId).populate('role');
    res.status(200).json(user)
}

export const updateUserById = async (req, res) => {
    const {name, lastname, id, contactNumber, email, password, role, pets} = req.body;
    console.log('number: ', contactNumber);
    console.log('pets: ', pets);

    let userData = {
        name, 
        lastname,
        id,
        contactNumber, 
        email
    }

    if(password) {
        userData.password = await User.encryptPassword(password);
    }

    if(role) { //si existe la propiedad roles
        const foundRole = await Role.find({name: {$in: role}}) // si el usuario ingresa el nombre de un rol, se guarda en foundRoles, devuelve un objeto u objetos
        userData.role = foundRole.map(role => role._id) // se busca guardar un arreglo con los id de cada rol, y no los objetos, que recorra el foundRoles con el metodo map, y por cada objeto quiero que solo devuelvas el rol.id
    }

    if(pets) { //si existe la propiedad pet
        userData.pets = [];
        for (let i = 0; i < pets.length; i++) {
            const pet_id = pets[i];
            const foundPet = await Pet.find({_id: {$in: pet_id}}) // si el usuario ingresa el nombre de un rol, se guarda en foundRoles, devuelve un objeto u objetos
            userData.pets.push(foundPet[0]._id) // se busca guardar un arreglo con los id de cada rol, y no los objetos, que recorra el foundRoles con el metodo map, y por cada objeto quiero que solo devuelvas el rol.id
        }
    }

    console.log('user update: ', userData);

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