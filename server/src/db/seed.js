const axios = require('axios')
const logger = require('loglevel')
const { Country } = require('./')

function mapCountries(data) {
  return data.map((country) => ({
    id: country.cca3,
    name: country.name.common,
    continent: country.continents[0],
    capital: country.capital ? country.capital[0] : '',
    subregion: country.subregion,
    area: country.area,
    population: country.population,
    flag_img: country.flags[1],
  }))
}

function fetchData() {
  return axios('https://restcountries.com/v3/all').then(async (res) => {
    if (res.status === 200) {
      if (!Array.isArray(res.data)) return Promise.reject('Invalid response')
      return Promise.resolve(mapCountries(res.data))
    }
    return Promise.reject(new Error('Something went wrong with the api call'))
  })
}

async function seed() {
  const count = await Country.count()
  if (count === 0) {
    logger.info('Populating database...')
    try {
      const countries = await fetchData()
      await Country.bulkCreate(countries)
      logger.info('Database is populated!')
    } catch (e) {
      logger.info(e.message)
    }
  }
}

module.exports = { seed }
