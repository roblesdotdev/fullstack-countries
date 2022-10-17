// generic error handler for unhandled situations
function errorMiddleware(error, _req, res, next) {
  if (res.headersSent) {
    next(error)
  } else {
    res.status(500)
    res.json({
      error: {
        status: 500,
        message: error.message,
        ...(process.env.NODE_ENV === 'production'
          ? null
          : { stack: error.stack }),
      },
    })
  }
}

module.exports = errorMiddleware
