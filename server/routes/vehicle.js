import express from 'express'

import { getVehicles,postVehicle } from '../controllers/vehicle.js'

const router = express.Router()

router.get("/list" , getVehicles)
router.post("/create" , postVehicle)



export default router;