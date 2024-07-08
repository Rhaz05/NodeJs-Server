import express from 'express'
import { salesReport } from '../controller/reports.controller.js'
export const reportsRoute = express.Router()

reportsRoute.post('/sales', salesReport)
