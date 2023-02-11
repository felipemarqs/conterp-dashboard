import express from 'express'

import { getVehicles } from '../controllers/vehicle.js'

const router = express.Router()

router.get("/list" , getVehicles)



export default router;