import mongoose from 'mongoose'


const RefuelSchema = new mongoose.Schema(
    {
        plate: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        vehicle: {
                type: mongoose.Types.ObjectId,
                ref: 'Vehicle'
        },
        quantity: {
                type: Number,
                required: true
            },
        price: {
            type: Number,
            required: true
        },
        fuelType: {
            type: String,
            required: true
        }
    }
)


const Refuel = mongoose.model('Refuel', RefuelSchema);

export default Refuel;