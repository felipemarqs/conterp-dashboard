import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";

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
app.use("general", generalRoutes);

/* Configurando o Mongoose */

const PORT = process.env.PORT || 9000

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) 
  .then(() => {
    app.listen(PORT, () => console.log(`Server running in port ${PORT}`));

  })
  .catch((error) => console.log(`${error} not connected`));
