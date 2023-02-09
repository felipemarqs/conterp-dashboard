import Contract from "../models/Contract.js";
import Vehicle from "../models/Vehicle.js";

export const getContracts = async (req, res) => {
  try {
    const contracts = await Contract.find().populate("vehicles");
    res.status(200).json(contracts);
  } catch (error) {
    console.log(error);
  }
};
