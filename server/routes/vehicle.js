import express from 'express'

import { getVehicles,postVehicle, deleteVehicle } from '../controllers/vehicle.js'

const router = express.Router()

router.get("/list" , getVehicles)
router.post("/create" , postVehicle)
router.delete("/delete/:id", deleteVehicle)



export default router;