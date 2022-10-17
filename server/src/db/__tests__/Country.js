const { ValidationError, UniqueConstraintError } = require('sequelize')
const { conn, Country } = require('../index')
const { buildCountry } = require('utils/generate')

describe('Model:Country', () => {
  beforeEach(async () => {
    await conn.sync({ force: true })
  })

  afterAll(async () => {
    await conn.sync({ force: true })
    conn.close()
  })

  test('create country if all props are ok', async () => {
    const fakeCountry = buildCountry()
    const country = await Country.create(fakeCountry)
    expect(country.toJSON()).toEqual(fakeCountry)
  })

  test('fails when create with invalid ID', async () => {
    const fakeCountry = buildCountry({ id: '1' })
    await expect(Country.create(fakeCountry)).rejects.toBeInstanceOf(
      ValidationError
    )
  })

  test('fails when create without required fields', async () => {
    const fakeCountry = buildCountry({ name: undefined })
    await expect(Country.create(fakeCountry)).rejects.toBeInstanceOf(
      ValidationError
    )
  })

  test('fails when create two countries with the same ID', async () => {
    const fakeCountry1 = buildCountry()
    const fakeCountry2 = buildCountry()
    await expect(
      Country.bulkCreate([fakeCountry1, fakeCountry2])
    ).rejects.toBeInstanceOf(UniqueConstraintError)
  })
})
