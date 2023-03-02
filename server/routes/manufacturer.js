import express from "express";

import { getManufacturers, getModels } from "../controllers/manufactures.js";

const router = express.Router();

router.get("/list", getManufacturers);
router.get("listModels", getModels)

export default router;
