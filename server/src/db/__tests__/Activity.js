const { ValidationError } = require('sequelize')
const { conn, Activity } = require('../index')
const { buildActivity } = require('utils/generate')

describe('Model:Activity', () => {
  beforeEach(async () => {
    await conn.sync({ force: true })
  })

  afterAll(async () => {
    await conn.sync({ force: true })
    conn.close()
  })

  test('create activity if all props are ok', async () => {
    const fakeActivity = buildActivity()
    const activity = await Activity.create(fakeActivity)
    expect(activity.toJSON()).toEqual(expect.objectContaining(fakeActivity))
  })

  test('fails when create without required fields', async () => {
    const fakeActivity = buildActivity({ name: undefined })
    await expect(Activity.create(fakeActivity)).rejects.toBeInstanceOf(
      ValidationError
    )
  })

  test('fails with out of range difficulty', async () => {
    const fakeActivity = buildActivity({ difficulty: 100 })
    await expect(Activity.create(fakeActivity)).rejects.toBeInstanceOf(
      ValidationError
    )
  })

  test('fails with invalid season', async () => {
    const fakeActivity = buildActivity({ season: 'Invalid' })
    await expect(Activity.create(fakeActivity)).rejects.toBeInstanceOf(
      ValidationError
    )
  })
})
