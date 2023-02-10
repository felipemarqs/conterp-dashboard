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
