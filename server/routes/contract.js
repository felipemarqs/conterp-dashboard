import express from 'express'

import { getContracts } from '../controllers/contract.js'

const router = express.Router()

router.get("/list" , getContracts)



export default router;