const logger = require('loglevel')
const { startServer } = require('./server')

logger.setLevel('INFO')

startServer({ port: 3001 })
