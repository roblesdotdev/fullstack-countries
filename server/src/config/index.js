const { requireFromEnv } = require('./environment')

const { NODE_ENV } = process.env

if (NODE_ENV !== 'production') {
  require('dotenv').config()
}

module.exports = {
  DB_URL: requireFromEnv('DB_URL'),
}
