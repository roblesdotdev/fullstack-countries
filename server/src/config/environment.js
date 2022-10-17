function requireFromEnv(envName, envObj = process.env) {
  if (envObj[envName]) return envObj[envName]
  throw new Error(`Environment var ${envName} must be set`)
}

module.exports = {
  requireFromEnv,
}
