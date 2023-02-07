import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import xlsx from 'xlsx'

//Models
import Contract from "./models/Contract.js";
import Vehicle from "./models/Vehicle.js";

//Data
import {contractData} from "./data/index.js";

import generalRoutes from "./routes/general.js";

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

/* Rotas */
app.use("/contract", generalRoutes);

/* Configurando o Mongoose */

const PORT = process.env.PORT || 9000

//Importing data from Excel
let workbook = xlsx.readFile("./data/excelFiles/fleet.xlsx");

let worksheet = workbook.Sheets[workbook.SheetNames[0]];

const insertVehicles = async () => {
  const vehicles = []
      

  for (let i = 2; i <= 552; i++) {

  const contract = worksheet["A" + i].v;
  const plate = worksheet["B" + i].v;
  const type = worksheet["C" + i].v;
  const manufacturer = worksheet["D" + i].v;
  const model = worksheet["E" + i].v;
  const color = worksheet["F" + i].v;
  //const renavam = worksheet["G" + i].v;
  const tankCapacity = worksheet["H" + i].v;
  const year = worksheet["I" + i].v;

  const contractDb = await Contract.find({ name : contract})
  
  const contractId = contractDb[0]._id;

  console.log('Veículo',  i)
  

  vehicles.push(
    {
      contractId: contractId,
      plate: plate,
      type: type,
      manufacturer: manufacturer,
      model: model,
      color: color,
      //renavam: renavam,
      tankCapacity: tankCapacity,
      year: year
    }
    )

    

  }

  Vehicle.insertMany(vehicles)

  console.log(vehicles.length)
}


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) 
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running in port ${PORT}`)
      //Insert data to Database (ONLY RUN IT ONCE!!)
      //Contract.insertMany(contractData)

      //insertVehicles();
     
    });

  })
  .catch((error) => console.log(`${error} not connected`));
