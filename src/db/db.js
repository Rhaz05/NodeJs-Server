import mysql from "mysql2/promise";
import "dotenv/config";
import { logger } from "../util/logger.util.js";
import { CONFIG } from "../config/env.config.js";

const connection = mysql.createPool({
  host: CONFIG.DB_HOST,
  user: CONFIG.DB_USER,
  password: CONFIG.DB_PASSWORD,
  database: CONFIG.DB_DATABASE,
});

export const CheckConnection = async () => {
  try {
    const connect = await connection.getConnection();
    connect.release();
  } catch (err) {
    logger.fatal("Error connecting to MySQL database: ", err);
  }
};

export const InsertMultiple = async (stmt, todos) => {
  try {
    const [results] = await connection.query(stmt, [todos]);
    console.log(`Row inserted: ${results.affectedRows}`);
    return 1;
  } catch (err) {
    console.error(err.message);
    return 0;
  }
};

export const Select = async (sql) => {
  try {
    const [results] = await connection.query(sql);
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const SelectParameter = async (sql, condition) => {
  try {
    const [results] = await connection.query(sql, [condition]);
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const Update = async (sql, data) => {
  try {
    const [results] = await connection.query(sql, data);
    console.log("Rows affected:", results.affectedRows);
    return `Rows affected: ${results.affectedRows}`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const CloseConnect = async () => {
  await connection.end();
};
