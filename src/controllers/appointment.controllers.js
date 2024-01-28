import Appointment  from "../models/Appointment" // se importa desde models 

export const createAppointment = async (req, res) => { // ene sta funcion principal se incluye async por ser requisito del await
    
    const {date, time, pet} = req.body // a esto se le llama deconstruccion, se extraen todos los paramertros del objeto Pet.

    const appointments = await Appointment.find({date: date, time: time});
    console.log(appointments);
    if (appointments.length > 0) {
        res.status(200).json({msg: 'Debe seleccionar otra fecha y hora'})
    } else {
        const newAppointment = new Appointment({date, time, pet});  // se crea un nuevo Pet objeto
        const appointmentSave = await newAppointment.save() //para guardarlo se ejecuta su metodo save, pero antes se le incluye el await por que se va a guardar en la DB y esto toma tiempo
        res.status(200).json(appointmentSave) //para especificar codigo de estado ".status()", que son los que le dicen al navegadoas que exactamente paso, el codigo 201 especifica que un nuevo recurso se ha creado  
    }
}

export const getappointment = async (req, res) => {
    const appointments = await Appointment.find().populate('pet');
    res.json(appointments)
}

export const getAppointmentById = async (req, res) => { // Se busca la cita por el id
    const appointments = await Appointment.findById(req.params.appointmentId);
    res.status(200).json(appointments)
}

export const updateAppointmentById = async (req, res) => {
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.appointmentId, req.body, {  
        new: true
    })
    res.status(200).json(updatedAppointment)
}

export const deleteAppointmentById = async (req, res) => {
    const {appointmentId} = req.params;
    await Appointment.findByIdAndRemove(appointmentId)
    res.status(204).json()
}