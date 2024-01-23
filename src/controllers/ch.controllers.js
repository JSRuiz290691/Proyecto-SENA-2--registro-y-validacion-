import Pet  from "../models/Pet"
import User  from "../models/User"
import clinicHistory  from "../models/ClinicHistory" // se importa desde models
import Consultation  from "../models/Consultation"
const ObjectId = require('mongodb').ObjectId;

export const createClinicHistory = async (req, res) => { // ene sta funcion principal se incluye async por ser requisito del await
    
    const {petId, userId} = req.body // a esto se le llama reestructuri, se extraen todos los paramertros del objeto ch.

    const foundPet = await Pet.findById(petId)
    const foundUser = await User.findById(userId)

    const newClinicHistory = new clinicHistory({
        pet: foundPet._id,
        owner: foundUser._id
    });  // se crea una nueva CH objeto
    
    const clinicHistorySave = await newClinicHistory.save() //para guardarlo se ejecuta su metodo save, pero antes se le incluye el await por que se va a guardar en la DB y esto toma tiempo
    
    res.status(200).json(clinicHistorySave) //para especificar codigo de estado ".status()", que son los que le dicen al navegadoas que exactamente paso, el codigo 200 especifica que un nuevo recurso se ha creado  
}

export const getClinicHistoryByPetId = async (req, res) => { // Se busca la cita por el id de la mascota
    let petId = req.params.petId;
    const clinicHistoryData = await clinicHistory.findOne({pet: petId}).populate('pet').populate('owner');
    if(clinicHistoryData !== null) {
        res.status(200).json(clinicHistoryData)
    } else {
        const foundPet = await Pet.findById(petId)
        const user = await User.findOne({ pets: petId})
        if(user === null) {
            res.status(404).json({})
        } else {
            const newClinicHistory = new clinicHistory({
                pet: foundPet._id,
                owner: user._id
            });
            const clinicHistoryObject = await newClinicHistory.save()
            res.status(200).json(clinicHistoryObject)
        }
    }
}

export const addConsultation = async (req, res) => { // en esta funcion principal se incluye async por ser requisito del await
    
    const { chId,reason, symptoms, clinicalExamination, dx, forecast, treatment} = req.body // a esto se le llama reestructuri, se extraen todos los paramertros del objeto ch.

    const newConsultation = new Consultation({
        reason: reason,
        symptoms: symptoms,
        clinicalExamination: clinicalExamination,
        dx: dx,
        forecast: forecast,
        treatment: treatment,
    });  // se crea una nueva consultation

    const updatedCH = await clinicHistory.updateOne(
        { "_id": chId },
        { 
            $push: { 
                "consultations": newConsultation
            }
        }
    )
    
    res.status(200).json(updatedCH) //para especificar codigo de estado ".status()", que son los que le dicen al navegadoas que exactamente paso, el codigo 200 especifica que un nuevo recurso se ha creado  
}

export const getClinicHistoryById = async (req, res) => { // Se busca la cita por el id
    const clinicHistoryData = await clinicHistory.findById(req.params.clinicHistoryId);
    res.status(200).json(clinicHistoryData)
}

export const deleteClinicHistoryById = async (req, res) => {
    const {clinicHistoryId} = req.params;
    await clinicHistory.findByIdAndRemove(clinicHistoryId)
    res.status(204).json()
}