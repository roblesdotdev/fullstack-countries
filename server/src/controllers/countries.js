const { Op } = require('sequelize')
const { Country, Activity } = require('../db')

async function getAllCountries(req, res) {
  const { name: q } = req.query
  const queryConfig = {
    attributes: ['id', 'name', 'flag_img', 'continent', 'population'],
    order: [['name', 'ASC']],
    include: {
      model: Activity,
      attributes: ['id'],
      through: { attributes: [] },
    },
  }
  if (q) queryConfig.where = { name: { [Op.iLike]: `%${q}%` } }
  const result = await Country.findAndCountAll(queryConfig)

  if (q && !result.rows.length)
    return res.jsonError(404, `Country '${q}' couldn't found.`)

  if (!result.rows.length)
    return res.jsonError(404, "We couldn't find the page you were looking for.")
  res.jsonSuccess({
    totalItems: result.count,
    countries: result.rows,
    query: q ?? null,
  })
}

async function getCountry(req, res) {
  const { id: countryID } = req.params
  const country = await Country.findByPk(countryID, {
    include: {
      model: Activity,
      through: { attributes: [] },
    },
  })
  if (!country) {
    return res.jsonError(404, `Country with id ${countryID} couldn't found`)
  }
  res.jsonSuccess({ country })
}

module.exports = {
  getAllCountries,
  getCountry,
}
