const express = require('express')
const logger = require('loglevel')
const errorMiddleware = require('./middlewares/error-middleware')
require('express-async-errors')

function startServer({ port = process.env.PORT } = {}) {
  const app = express()

  app.get('/', (req, res) => res.json({ message: 'Working' }))

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
