import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import xlsx from "xlsx";

//Models
import Contract from "./models/Contract.js";
import Vehicle from "./models/Vehicle.js";
import Refuel from "./models/Refuel.js";

//Data
import { contractData } from "./data/index.js";

import contractRoutes from "./routes/contract.js";
import vehicleRoutes from "./routes/vehicle.js";
import refuelRoutes from "./routes/refuel.js";

/*Configurando o servidor*/

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  
  next();
}); */

/* Rotas */
app.use("/contract", contractRoutes);
app.use("/vehicle", vehicleRoutes);
app.use("/refuel", refuelRoutes);

/* Configurando o Mongoose */

const PORT = process.env.PORT || 9000;

//Importing data from Excel
let workbook = xlsx.readFile("./data/excelFiles/refuel@.xlsx");

let worksheet = workbook.Sheets[workbook.SheetNames[0]];

const insertVehicle = async () => {
  const cars = [];

  for (let i = 2; i <= 23; i++) {

    const contractName = worksheet["B" + i].v
    const plate = worksheet["E" + i].v
    const manufacturer = worksheet["M" + i].v  !== undefined ? worksheet["M" + i].v : "Não Informado";
    const type = worksheet["K" + i].v !== undefined ? worksheet["K" + i].v : "Não Informado";
    const model = worksheet["N" + i].v !== undefined ? worksheet["N" + i].v : "Não Informado";
    const color = worksheet["Q" + i].v !== undefined ? worksheet["Q" + i].v : "Não Informado";
    const yearExcel = worksheet["O" + i].v !== undefined ? worksheet["O" + i].v : "Não Informado";
    const isActiveExcel = worksheet["S" + i].v !== undefined ? worksheet["S" + i].v : "Não Informado";

    const year =  yearExcel.substring(yearExcel.indexOf("/") + 1)
    const isActve = isActiveExcel === "Ativo" ? true : false

    const [contract] = await Contract.find({ name: contractName });
    const contractId = contract._id;

    await Vehicle.create({
      contractId: contractId,
      plate: plate,
      type: type,
      manufacturer: manufacturer,
      model: model,
      color: color,
      year: year,
      isActive: isActive,
    });

    const [newVehicleDb] = await Vehicle.find({ plate: plate });
    console.log("novo carro:", newVehicleDb);

    contract.vehicles.push(newVehicleDb._id);

    await contract.save();
  }

  /* const contract = await Contract.find({ name: "Integridade" });
  const contractId = contract[0]._id; */

  /*  await Vehicle.create({
    contractId: contractId,
    contract: "Integridade",
    plate: "RTV7A56",
    type: "Automóvel",
    manufacturer: "FIAT",
    model: "STRADA",
    color: "BRANCA",
    tankCapacity: 55,
    year: 2022,
    isActive: true,
  });

  const newVehicleDb = await Vehicle.find({ plate: "RTV7A56" });
  console.log("novo carro:", newVehicleDb);

  contract[0].vehicles.push(newVehicleDb[0]._id);

  await contract[0].save(); */
};

const insertRefuelData = async () => {
  const refuelData = [];

  function ExcelDateToJSDate(date) {
    return new Date(Math.round((date - 25569) * 86400 * 1000));
  }

  for (let i = 5; i <= 823; i++) {
    console.log("Veículo atual", i - 1);
    const plate = worksheet["A" + i].v;
    const date = worksheet["B" + i].v;
    const quantity = worksheet["C" + i].v;
    const price = worksheet["D" + i].v;
    const fuelType = worksheet["E" + i].v;

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

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to MongoDb Server running in port ${PORT}`);
      //Insert data to Database (ONLY RUN IT ONCE!!)
      //Contract.insertMany(contractData)

      //insertRefuelData();
      //insertVehicle();
    });
  })
  .catch((error) => console.log(`${error} not connected`));
