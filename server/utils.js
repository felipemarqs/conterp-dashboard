import xlsx from "xlsx";

//Models
import Contract from "./models/Contract.js";
import Vehicle from "./models/Vehicle.js";
import Refuel from "./models/Refuel.js";
import Manufacturer from "./models/Manufacturer.js";

//Data
import manufacturerData from './data/index.js'

//Importing data from Excel
let workbookFleet = xlsx.readFile("./data/excelFiles/fleet_alelo.xlsx");
let workbookFuel = xlsx.readFile("./data/excelFiles/refuel@.xlsx");

let worksheetFleet = workbookFleet.Sheets[workbookFleet.SheetNames[0]];
let worksheetRefuel = workbookFuel.Sheets[workbookFuel.SheetNames[0]];



export const insertVehicles = async () => {
  for (let i = 2; i <= 579; i++) {
    const contractName = worksheetFleet["B" + i].v;
    const plate = worksheetFleet["E" + i].v;
    const manufacturerExcel =
      worksheetFleet["M" + i] !== undefined
        ? worksheetFleet["M" + i].v
        : "Não Informado";
    const type =
      worksheetFleet["K" + i] !== undefined
        ? worksheetFleet["K" + i].v
        : "Não Informado";
    const modelExcel =
      worksheetFleet["N" + i] !== undefined
        ? worksheetFleet["N" + i].v
        : "Não Informado";
    const color =
      worksheetFleet["Q" + i] !== undefined
        ? worksheetFleet["Q" + i].v
        : "Não Informado";
    const yearExcel =
      worksheetFleet["O" + i] !== undefined
        ? worksheetFleet["O" + i].v
        : "Não Informado";
    const isActiveExcel =
      worksheetFleet["S" + i] !== undefined
        ? worksheetFleet["S" + i].v
        : "Não Informado";

    const year = yearExcel.substring(yearExcel.indexOf("/") + 1);
    const isActive = isActiveExcel === "Ativo" ? true : false;

  
    const [contract] = await Contract.find({ name: contractName });
    const contractId = contract._id;

    

    await Vehicle.create({
      contractId: contractId,
      plate: plate,
      type: type,
      manufacturer: manufacturerExists._id,
      model: modelExcel,
      color: color,
      year: year,
      isActive: isActive,
    });

    const [newVehicleDb] = await Vehicle.find({ plate: plate });
    console.log("novo carro:", newVehicleDb);

    contract.vehicles.push(newVehicleDb._id);

    await contract.save();
  }

};

export const insertRefuelData = async () => {
  const refuelData = [];

  function ExcelDateToJSDate(date) {
    return new Date(Math.round((date - 25569) * 86400 * 1000));
  }

  for (let i = 5; i <= 823; i++) {
    console.log("Veículo atual", i - 1);
    const plate = worksheetRefuel["A" + i].v;
    const date = worksheetRefuel["B" + i].v;
    const quantity = worksheetRefuel["C" + i].v;
    const price = worksheetRefuel["D" + i].v;
    const fuelType = worksheetRefuel["E" + i].v;

    console.log(plate);

    const [vehicle] = await Vehicle.find({ plate: plate });

    if (vehicle) {
      const vehicleId = vehicle._id;

      refuelData.push({
        plate: plate,
        date: ExcelDateToJSDate(date),
        vehicle: vehicleId,
        quantity: quantity,
        price: price,
        fuelType: fuelType,
      });
    }
  }

  Refuel.insertMany(refuelData);
};

export const insertManufactures = async () => {

  await Manufacturer.insertMany(manufacturerData)



}
