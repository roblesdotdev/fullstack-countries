function successBuilder(_req, res, next) {
  res.jsonSuccess = function (data, status = 200) {
    return res.status(status).json({
      success: true,
      status,
      data: { ...data },
    })
  }

  next()
}

module.exports = successBuilder
