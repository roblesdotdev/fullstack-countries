const { Activity, Country } = require('../db')
const { Op } = require('sequelize')

async function createActivity(req, res) {
  const { countriesIDs } = req.body
  const count = await Country.count({
    where: { id: { [Op.in]: countriesIDs } },
  })
  if (count !== countriesIDs.length) {
    return res.jsonError(400, 'Invalid countries IDs provided.')
  }
  const { name, ...formData } = res.form
  const [activity, created] = await Activity.findOrCreate({
    where: {
      name,
    },
    defaults: {
      ...formData,
    },
  })
  if (!created)
    return res.jsonError(400, `The activity ${res.form.name} already exists`)
  await activity.setCountries(countriesIDs)

  const newActivity = await Activity.findByPk(activity.id, {
    include: {
      model: Country,
      through: { attributes: [] },
    },
  })

  res.jsonSuccess({ activity: newActivity })
}

async function getAllActivities(_req, res) {
  const activities = await Activity.findAll({
    order: [['id', 'DESC']],
  })
  res.jsonSuccess({ activities })
}

async function getActivity(req, res) {
  const { activityID } = req.params
  const activity = await Activity.findByPk(activityID, {
    include: {
      model: Country,
      through: { attributes: [] },
    },
  })
  if (!activity)
    return res.jsonError(404, `Couldn't found activity ${activityID}`)

  res.jsonSuccess({ activity })
}

module.exports = {
  createActivity,
  getAllActivities,
  getActivity,
}
