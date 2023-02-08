import mongoose from 'mongoose'


const ContractSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            required: true
        },
        vehicles: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Vehicle'
            }
        ]
    }
)

const Contract = mongoose.model('Contract', ContractSchema);

export default Contract;