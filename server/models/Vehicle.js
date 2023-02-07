import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
    plate: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    contractId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Contract',
    },
    manufacturer: {
        type: String,
        required: true
    },
    color: {
        type: String
    },
    Year: {
        type: Number
    },
    tankCapacity: {
        type: Number
    }
})

const Vehicle = mongoose.model("Vehicle", VehicleSchema);
export default Vehicle