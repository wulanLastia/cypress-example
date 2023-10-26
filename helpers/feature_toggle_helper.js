import * as jose from 'jose'

/* helper method to set Unleash override cookie
 */
export default async function overrideFeatureToggle(toggles = {}, expirationTime = '2h') {
  const privateKeyString = Cypress.env('UNLEASH_OVERRIDE_PRIVATE_KEY')
  const privateKeyAlgorithm = Cypress.env('UNLEASH_OVERRIDE_KEY_ALGORITHM')

  const privateKey = await jose.importPKCS8(atob(privateKeyString), privateKeyAlgorithm)

  const defaultToggles = {
    // FILL WITH WHATEVER TOGGLE YOU WISH TO SET GLOBALLY
    'EXAMPLE_TOGGLE': true,
  }

  cy.log({ defaultToggles, toggles })

  const payload = {
    overrides: { ...defaultToggles, ...toggles },
  }

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: privateKeyAlgorithm })
    .setIssuedAt()
    .setIssuer('cypress-sidebar-digitalservice-id')
    .setAudience('unleash-sidebar-jabarprov-go-id')
    .setExpirationTime(expirationTime)
    .sign(privateKey)

  await cy.setCookie('OVERRIDE_FEATURE_TOGGLE', jwt)
}

