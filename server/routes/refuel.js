import express from 'express'

import { getRefuel } from '../controllers/refuel.js'

const router = express.Router()

router.get("/list" , getRefuel)

export default router;