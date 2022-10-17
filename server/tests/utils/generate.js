function buildReq({ ...overrides } = {}) {
  const req = { body: {}, params: {}, query: {}, ...overrides }
  return req
}

function buildRes(overrides = {}) {
  const res = {
    json: jest.fn(() => res).mockName('json'),
    status: jest.fn(() => res).mockName('status'),
    ...overrides,
  }
  return res
}

function buildNext(impl) {
  return jest.fn(impl).mockName('next')
}

// TODO: maybe use https://fakerjs.dev/
function buildCountry(overrides = {}) {
  const country = {
    id: 'BRA',
    name: 'Brazil',
    capital: 'Brazilia',
    flag_img: 'https://flagcdn.com/w320/br.png',
    area: 8515767,
    continent: 'South America',
    population: 212559409,
    subregion: 'South America',
    ...overrides,
  }
  return country
}

function buildActivity(overrides = {}) {
  const activity = {
    name: 'Sky',
    difficulty: 5,
    duration: 24,
    season: 'Winter',
    ...overrides,
  }
  return activity
}

module.exports = {
  buildReq,
  buildRes,
  buildNext,
  buildCountry,
  buildActivity,
}
