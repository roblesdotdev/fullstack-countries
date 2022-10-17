const express = require('express')

function getApiRoutes() {
  const router = express.Router()

  router.use(function (_req, res) {
    res.jsonError(404, 'Sorry! Could not found page.')
  })

  return router
}

module.exports = { getApiRoutes }
