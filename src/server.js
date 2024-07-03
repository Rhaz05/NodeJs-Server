import express from 'express'
import morgan from 'morgan'
import 'dotenv/config'
import { logger } from '../src/util/logger.util.js'
import { CONFIG } from '../src/config/env.config.js'
import { initRoutes } from '../src/startup/routes.startup.js'
import { CheckConnection } from '../src/db/db.js'
import { initSession } from '../src/startup/session.startup.js'

const app = express()

const serverStart = () => {
  logger.info('--------------------Server starting--------------------')
  logger.info(`Running application on ${CONFIG.NODE_ENV} Environment`)

  logger.info('Initializing Database & Session Connection')
  CheckConnection()
  initSession(app)

  logger.info('Importing middlewares')
  app.use(morgan('dev'))
  app.use(express.json())

  logger.info('Importing routes')
  initRoutes(app)

  const server = app.listen(CONFIG.PORT, () => {
    logger.info(`Server listening on port ${CONFIG.PORT}`)
  })

  process.on('SIGINT', () => {
    logger.info('SIGINT signal received, Closing the application')
    server.close()
    logger.info('--------------------Server Closed----------------------')
    process.exit(0)
  })
}

serverStart()
