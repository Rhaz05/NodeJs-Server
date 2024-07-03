import express from 'express'
import { getAllProducts } from '../controller/products.controller.js'
export const productsRoute = express.Router()

productsRoute.get('/', getAllProducts)
