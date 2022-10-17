const { buildReq, buildRes, buildNext } = require('utils/generate')
const successBuilder = require('../success-builder.js')

describe('successBuilder', () => {
  test('always call next', () => {
    const req = buildReq()
    const next = buildNext()
    const res = buildRes()
    successBuilder(req, res, next)
    expect(next).toHaveBeenCalledTimes(1)
  })

  test('jsonSuccess helper should be defined', () => {
    const req = buildReq()
    const next = buildNext()
    const res = buildRes()
    successBuilder(req, res, next)
    expect(res.jsonSuccess).toBeDefined()
  })

  test('responds with valid object', () => {
    const req = buildReq()
    const next = buildNext()
    const res = buildRes()
    const data = { totalItems: 1, items: [{ id: 1 }] }
    successBuilder(req, res, next)
    res.jsonSuccess(data)
    expect(res.status).toHaveBeenCalledWith(200) // default status
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      status: 200,
      data,
    })
  })
})
