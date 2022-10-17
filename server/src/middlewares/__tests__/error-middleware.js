const { buildReq, buildRes, buildNext } = require('utils/generate')
const errorMiddleware = require('../error-middleware.js')

describe('errorMiddleware', () => {
  test('calls next if headersSent is true', () => {
    const req = buildReq()
    const next = buildNext()
    const res = buildRes({ headersSent: true })
    const error = new Error('something went wrong')
    errorMiddleware(error, req, res, next)
    expect(next).toHaveBeenCalledWith(error)
    expect(next).toHaveBeenCalledTimes(1)
    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })

  test('responds with 500 and the error object', () => {
    const req = buildReq()
    const next = buildNext()
    const res = buildRes()
    const error = new Error('something went wrong')
    errorMiddleware(error, req, res, next)
    expect(next).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({
      error: {
        status: 500,
        message: error.message,
        stack: error.stack,
      },
    })
  })
})
