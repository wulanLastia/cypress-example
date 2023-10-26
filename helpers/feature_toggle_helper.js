import * as jose from 'jose'

/* helper method to set Unleash override cookie
 */
export async function overrideFeatureToggle(cy, toggles = {}, expirationTime = '2h') {
  const privateKeyString = process.env.UNLEASH_OVERRIDE_PRIVATE_KEY
  console.log('masuuuuuuuk')
  console.log({ privateKeyString })
  const privateKeyAlgorithm = process.env.UNLEASH_OVERRIDE_KEY_ALGORITHM
  const privateKey = await jose.importPKCS8(atob(privateKeyString), privateKeyAlgorithm)

  const defaultToggles = {
    'EXAMPLE_TOGGLE': true,
  }

  const payload = {
    overrides: { ...defaultToggles, ...toggles },
  }

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ privateKeyAlgorithm })
    .setIssuedAt()
    .setIssuer('cypress-sidebar-digitalservice-id')
    .setAudience('unleash-sidebar-jabarprov-go-id')
    .setExpirationTime(expirationTime)
    .sign(privateKey)

  cy.setCookie('OVERRIDE_FEATURE_TOGGLE', jwt)
}

