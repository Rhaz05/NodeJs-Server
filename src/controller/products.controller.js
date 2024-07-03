import asyncHandler from "express-async-handler";
import { Select } from "../db/db.js";

export const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Select("SELECT * FROM master_product");
    res.status(200), res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
