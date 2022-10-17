const { buildReq, buildRes, buildNext } = require('utils/generate')
const errorBuilder = require('../error-builder.js')

describe('errorBuilder', () => {
  test('always call next', () => {
    const req = buildReq()
    const next = buildNext()
    const res = buildRes()
    errorBuilder(req, res, next)
    expect(next).toHaveBeenCalledTimes(1)
  })

  test('jsonError helper should be defined', () => {
    const req = buildReq()
    const next = buildNext()
    const res = buildRes()
    errorBuilder(req, res, next)
    expect(res.jsonError).toBeDefined()
  })

  test('responds with valid object', () => {
    const req = buildReq()
    const next = buildNext()
    const res = buildRes()
    const status = 400
    const message = 'something went wrong'
    errorBuilder(req, res, next)
    res.jsonError(status, message)
    expect(res.status).toHaveBeenCalledWith(status)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      status,
      error: { message },
    })
  })

  test('responds with default obj', () => {
    const req = buildReq()
    const next = buildNext()
    const res = buildRes()
    errorBuilder(req, res, next)
    res.jsonError()
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      status: 400,
      error: { message: 'Something went wrong' },
    })
  })
})
