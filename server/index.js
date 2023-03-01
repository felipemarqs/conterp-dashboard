import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";

//Models
import Contract from "./models/Contract.js";

//Data
import { contractData } from "./data/index.js";

import contractRoutes from "./routes/contract.js";
import vehicleRoutes from "./routes/vehicle.js";
import refuelRoutes from "./routes/refuel.js";

//Funções para importar dados do Excel
import {insertRefuelData , insertVehicles, insertManufactures} from './utils.js'

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
      //nsertVehicles();
      //insertManufactures();
    });
  })
  .catch((error) => console.log(`${error} not connected`));
