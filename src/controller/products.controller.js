import asyncHandler from 'express-async-handler'
import { Select } from '../db/db.js'
import { logger } from '../util/logger.util.js'
import { InsertStatement } from '../util/customHelper.util.js'

export const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Select("SELECT * FROM master_product WHERE mp_productid = '1'")
    const insert = InsertStatement('master_product', 'mp', [
      'name',
      'description',
      'price',
      'category',
    ])

    logger.info(insert)
    res.status(200), res.json(products)
  } catch (err) {
    logger.error(err.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})
