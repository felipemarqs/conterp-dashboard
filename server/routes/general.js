import express from 'express'

import { getContracts } from '../controllers/general.js'

const router = express.Router()

router.get("/list" , getContracts)



export default router;