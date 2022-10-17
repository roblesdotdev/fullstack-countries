const express = require('express')
const logger = require('loglevel')
const errorMiddleware = require('./middlewares/error-middleware')
const errorBuilder = require('./middlewares/error-builder')
const successBuilder = require('./middlewares/success-builder')
const cors = require('cors')
const { getApiRoutes } = require('./routes')
require('express-async-errors')

function startServer({ port = process.env.PORT } = {}) {
  const app = express()

  app.disable('x-powered-by')
  app.use(express.urlencoded({ extended: true, limit: '50mb' }))
  app.use(express.json({ limit: '50mb' }))
  if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan')
    app.use(morgan('tiny'))
  }
  app.use(
    cors({
      origin: '*',
      credentials: true,
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
      methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    })
  )

  app.use(errorBuilder)
  app.use(successBuilder)

  app.use(getApiRoutes())

  app.use(errorMiddleware)

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      logger.info(`Server listening at ${server.address().port}`)
    })

    resolve(server)
  })
}

module.exports = {
  startServer,
}
