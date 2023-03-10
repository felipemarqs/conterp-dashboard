import Refuel from "../models/Refuel.js";
import Vehicle from "../models/Vehicle.js";
import Contract from "../models/Contract.js";

export const getRefuel = async (req, res) => {
  try {
    const refuel = await Refuel.find().populate({
        path: "vehicle",
        populate: {
            path: "contractId",
            model: "Contract",
            select: "name"
        }
     })

    res.status(200).json(refuel);
  } catch (error) {
    console.log(error);
  }
};
