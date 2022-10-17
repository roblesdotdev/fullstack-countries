const express = require('express')
const logger = require('loglevel')
const errorMiddleware = require('./middlewares/error-middleware')
const errorBuilder = require('./middlewares/error-builder')
const successBuilder = require('./middlewares/success-builder')
require('express-async-errors')

function startServer({ port = process.env.PORT } = {}) {
  const app = express()

  app.use(errorBuilder)
  app.use(successBuilder)

  app.get('/', (req, res) => res.jsonSuccess({ message: 'Working' }))
  app.get('/err', (req, res) => res.jsonError(404, 'Not found'))

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
