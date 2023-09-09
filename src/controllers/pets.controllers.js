import Pet  from "../models/Pet" // se importa desde models 

export const createPet = async (req, res) => { // ene sta funcion principal se incluye async por ser requisito del await
    console.log(req.body)
    const {name, años, parentesco, fechanacimiento, imgULR} = req.body // a esto se le llama reestructuri, se extraen todos los paramertros del objeto Pet.

    const newPet = new Pet ({name, años, parentesco, fechanacimiento, imgULR});  // se crea un nuevo Pet objeto
    
    const petSave = await newPet.save() //para guardarlo se ejecuta su metodo save, pero antes se le incluye el await por que se va a guardar en la DB y esto toma tiempo
    
    res.status(201).json(petSave) //para especificar codigo de estado ".status()", que son los que le dicen al navegadoas que exactamente paso, el codigo 201 especifica que un nuevo recurso se ha creado  
}

export const getPets = async (req, res) => {
    const pets = await Pet.find();
    res.json(pets)
}

export const getPetById = async (req, res) => { // Se busca le producto pro el id
    const pet = await Pet.findById(req.params.petId);
    res.status(200).json(pet)
}

export const updatePetById = async (req, res) => {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.petId, req.body, {  
        new: true
    })
    res.status(200).json(updatedPet)
}

export const deletePetById = async (req, res) => {
    const {petId} = req.params;
    await Pet.findByIdAndRemove(petId)
    res.status(204).json()
}