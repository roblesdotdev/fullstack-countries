const express = require('express')
const getCountriesRoutes = require('./countries')

function getApiRoutes() {
  const router = express.Router()

  router.use('/countries', getCountriesRoutes())

  router.use(function (_req, res) {
    res.jsonError(404, 'Sorry! Could not found page.')
  })

  return router
}

module.exports = { getApiRoutes }
