import Contract from "../models/Contract.js";
import Vehicle from "../models/Vehicle.js";
import Manufacturer from '../models/Manufacturer.js'

import mongoose from 'mongoose'

export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate("contractId", "name").populate("manufacturer", "name");
    res.status(200).json(vehicles);
  } catch (error) {
    console.log(error);
  }
};

export const postVehicle = async (req, res) => {
  const {
    contractName,
    plate,
    type,
    manufacturer: manufacturerName,
    model,
    color,
    year,
  } = req.body;


  const [vehicleExists] = await Vehicle.find({ plate: plate });
  const [contract] = await Contract.find({ name: contractName });
  const [manufacturer] = await Manufacturer.find({ name: manufacturerName })

  if (vehicleExists) {
    res.status(404).json({ error: "Veículo já cadastrado!" });
    return;
  }

  if (!contract) {
    res.status(404).json({ error: "Contrato não cadastrado" });
    return
  }

  if (!manufacturer) {
    res.status(404).json({ error: "Fabricante não cadastrado" });
    return
  }


  try {

    await Vehicle.create({
      plate: plate.toUpperCase(),
      type: type,
      model: model,
      contractId: contract._id,
      manufacturer: manufacturer._id,
      color: color,
      Year: year,
    });

    const [newVehicle] = await Vehicle.find({ plate: plate });
    contract.vehicles.push(newVehicle._id);
    await contract.save();
    res.status(200).json({ newVehicle, contract });
  } catch (error) {
    console.log(error);
  }
};

export const deleteVehicle = async (req, res) => {
  const { id } = req.params
  console.log(id)

  console.log("🎅🤶👼👼👼🎅🎅👮‍♀️👮‍♂️👮‍♂️👮‍♀️👮‍♀️👮‍♀️🎅🎅🤶")
  const vehicle = await Vehicle.findById(mongoose.Types.ObjectId(id.toString()))


  try {

    
    const contractId = vehicle.contractId
    const contract = await Contract.findById(mongoose.Types.ObjectId(contractId))
    await Vehicle.findByIdAndDelete(id)
    contract.vehicles.filter((element) => {
      element._id !== id
    })
    await contract.save()
    console.log("Deu certo | 👲👲")
    res.sendStatus(204)
  } catch (error) {
    res.sendStatus(404)
  }
}
