const express = require('express')
const { getAllCountries, getCountry } = require('../controllers/countries')

function getCountriesRoutes() {
  const router = express.Router()

  router.route('/').get(getAllCountries)
  router.route('/:id').get(getCountry)

  return router
}

module.exports = getCountriesRoutes
