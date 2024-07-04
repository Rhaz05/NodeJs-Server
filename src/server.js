import express from 'express'
import morgan from 'morgan'
import 'dotenv/config'
import { logger } from '../src/util/logger.util.js'
import { CONFIG } from '../src/config/env.config.js'
import { initRoutes } from '../src/startup/routes.startup.js'
import { CheckConnection } from '../src/db/db.js'
import { initSession } from '../src/startup/session.startup.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

  logger.info('Serving static files')
  app.use(express.static(path.join(__dirname, '..', 'public')))
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
  })
  app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
      res.json({
        message: '404 Not Found',
      })
    } else {
      res.type('txt').send('404 Not Found')
    }
  })

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
