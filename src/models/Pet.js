import { Schema, model } from "mongoose";

const petSchema = new Schema({
    tipoAnimal: String,
    name: String,
    sexo: String,
    años: Number,
    fechaNacimiento: String,
    DX: String,
    imgULR: String
}, {
    timestamps: true, // cada que se guarde un nuevo dato va con su fecha de creacion o ultima fecha de actualizacion
    versionKey: false //
})

export default model ("Pet", petSchema);