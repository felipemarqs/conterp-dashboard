import Contract from "../models/Contract.js"
import Vehicle from "../models/Vehicle.js"


export const getContracts = async (req, res) => {

   try {
        const contractDb = await Contract.find().populate('vehicles')
        const vehicles = await Vehicle.find().populate('contractId')

       
       
        res.status(200).json(contractD)
        
   } catch (error) {

    console.log(error)
    
   }

}