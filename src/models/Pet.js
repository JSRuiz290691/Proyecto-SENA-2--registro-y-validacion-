import { Schema, model } from "mongoose";

const petSchema = new Schema({
    animalType: String,
    name: String,
    characteristicsPet: String,
    gender: String,
    years: Number,
    birthDate: String,
    photo: String
}, {
    timestamps: true, // cada que se guarde un nuevo dato va con su fecha de creacion o ultima fecha de actualizacion
    versionKey: false //
})

export default model ("Pet", petSchema);