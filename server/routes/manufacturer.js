import express from "express";

import { getManufacturers } from "../controllers/manufactures.js";

const router = express.Router();

router.get("/list", getManufacturers);

export default router;
