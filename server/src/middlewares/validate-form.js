function hasRequiredFields(fields, obj) {
  for (const f of fields) {
    if (!obj[f]) {
      return false
    }
  }
  return true
}

function validateForm(req, res, next) {
  const required = ['name', 'difficulty', 'duration', 'season']
  if (!hasRequiredFields(required, req.body)) {
    return res.jsonError(400, `${required.join(', ')} are required`)
  }
  const { name, difficulty, duration, season, countriesIDs } = req.body

  if (!Array.isArray(countriesIDs) || !countriesIDs.length) {
    return res.jsonError(400, 'countriesIDs is required and must be an array')
  }

  res.form = {
    name: name.trim(),
    difficulty: +difficulty,
    duration: duration.trim(),
    season: season.trim(),
  }
  next()
}

module.exports = validateForm
