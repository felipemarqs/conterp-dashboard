import Contract from "../models/Contract.js";
import Vehicle from "../models/Vehicle.js";
import Manufacturer from "../models/Manufacturer.js";

export const getManufacturers = async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find();
    res.status(200).json(manufacturers);
  } catch (error) {
    console.log(error);
  }
};
