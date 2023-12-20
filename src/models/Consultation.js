import { Schema, model } from "mongoose";

const consultationSchema = new Schema({
    reason: String,
    symptoms: String,
    clinicalExamination: String,
    dx: String,
    forecast: String,
    treatment: String
}, {
    timestamps: true, // cada que se guarde un nuevo dato va con su fecha de creacion o ultima fecha de actualizacion
    versionKey: false //
})

export default model ("Consultation", consultationSchema);