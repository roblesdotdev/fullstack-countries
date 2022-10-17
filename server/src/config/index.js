const { requireFromEnv } = require('./environment')

const { NODE_ENV } = process.env

if (NODE_ENV !== 'production') {
  require('dotenv').config()
}

const DB_URL =
  NODE_ENV === 'test' ? 'sqlite::memory:' : requireFromEnv('DB_URL')

module.exports = {
  DB_URL,
}
