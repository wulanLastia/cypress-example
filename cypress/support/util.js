const jose = require('jose')

const privateKeyString = process.env.CYPRESS_UNLEASH_OVERRIDE_PRIVATE_KEY
const privateKeyAlgorithm = process.env.CYPRESS_UNLEASH_OVERRIDE_KEY_ALGORITHM

const defaultToggles = {
  // FILL WITH WHATEVER TOGGLE YOU WISH TO SET GLOBALLY
  'EXAMPLE_TOGGLE': true,
}

/* Generate JWT token for overriding Unleash Feature Toggle
 */
const generateFeatureToggleOverrideJWT = async function(toggles = {}, expirationTime = '2h') {
  const privateKey = await jose.importPKCS8(atob(privateKeyString), privateKeyAlgorithm)

  const payload = {
    overrides: { ...defaultToggles, ...toggles },
  }

  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: privateKeyAlgorithm })
    .setIssuedAt()
    .setIssuer('cypress-sidebar-digitalservice-id')
    .setAudience('unleash-sidebar-jabarprov-go-id')
    .setExpirationTime(expirationTime)
    .sign(privateKey)
}

module.exports = { generateFeatureToggleOverrideJWT }
