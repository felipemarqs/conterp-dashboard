import Contract from "../models/Contract.js"
import Vehicle from "../models/Vehicle.js"


export const getContracts = async (req, res) => {

   try {
        const contract = await Contract.find()
        const vehicles = await Vehicle.find().populate('contractId' ,'name').select("-_id")
        res.status(200).json(vehicles)
        console.log(contract);
   } catch (error) {

    console.log(error)
    
   }

}