import { Schema, model } from "mongoose";

const clinicHistorySchema = new Schema( 
    {
        pet: {
            ref: "Pet",
            type: Schema.Types.ObjectId,
        },
        owner: {
            ref: "User",
            type: Schema.Types.ObjectId,
        },
        consultations: [{
            reason: String,
            symptoms: String,
            clinicalExamination: String,
            dx: String,
            forecast: String,
            treatment: String
        }]
    },
    {
        timestamps: true,
        versionKey: false, 
    }
);

export default model ("clinicHistory", clinicHistorySchema);