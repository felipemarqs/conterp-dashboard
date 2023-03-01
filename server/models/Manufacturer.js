import mongoose from 'mongoose'


const ManufacturerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        models: [
            {
                type: String,
            }
        ]
    }
);

const Manufacturer = mongoose.model("Manufacturer", ManufacturerSchema);
export default Manufacturer