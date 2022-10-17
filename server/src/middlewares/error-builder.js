function errorBuilder(_req, res, next) {
  res.jsonError = function (status = 400, message = 'Something went wrong') {
    return res.status(status).json({
      success: false,
      status,
      error: {
        message,
      },
    })
  }

  next()
}

module.exports = errorBuilder
