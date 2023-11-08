import { Schema, model } from "mongoose";

const appointmentSchema = new Schema( 
    {
        date:{
            type: String,
        },
        time: {
            type: String,
        },
        pet: {
            ref: "Pet",
            type: Schema.Types.ObjectId,
        },
    },
    {
        timestamps: true,
        versionKey: false, 
    }
);

export default model ("Appointment", appointmentSchema);