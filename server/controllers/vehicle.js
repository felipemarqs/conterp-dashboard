import Contract from "../models/Contract.js";
import Vehicle from "../models/Vehicle.js";

export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate("contractId", "name");
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
    manufacturer,
    model,
    color,
    tankCapacity,
    year,
  } = req.body;

  const vehicleExists = await Vehicle.find({ plate: plate });

  if (vehicleExists) {
    res.json({ Error: 'Veículo já cadastrado!'})
    return 
  }

  try {
    const [contract] = await Contract.find({ name: contractName });
    const contractId = contract._id;
    await Vehicle.create({
      contractId: contractId,
      contract: contract,
      plate: plate,
      type: type,
      manufacturer: manufacturer,
      model: model,
      color: color,
      tankCapacity: tankCapacity,
      year: year,
    });

    const [newVehicle] = await Vehicle.find({ plate: plate });

    contract.vehicles.push(newVehicle._id);

    await contract.save();
    res.status(200).json({newVehicle , contract})
  } catch (error) {
    console.log(error)
  }
};
