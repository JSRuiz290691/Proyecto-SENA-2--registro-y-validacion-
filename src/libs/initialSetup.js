import Role from "../models/Role"

export const createRoles = async () => {

    const count = await Role.estimatedDocumentCount() // metodo para contar si ya existen documentos

    try {
        if (count > 0) return;

    const values = await Promise.all([ 

        new Role({name: "user"}).save(),
        new Role({name: "medico"}).save(),
        new Role({name: "admin"}).save()

    ])
    console.log(values)
    } catch (error) {
        console.log(error)
    }

}