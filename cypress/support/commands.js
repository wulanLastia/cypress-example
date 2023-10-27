// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload';

/* Custom command to override Unleash setting on website via a JWT token cookie
 *
 * Example:
 *
 *    ```
 *    // /cypress/e2e/test_aja.cy.js
 *    // run with npm run cy_local_test -- --spec cypress/e2e/test_aja.cy.js --browser chrome
 *
 *    beforeEach(() => {
 *      // default call to set all feature toggle beside the defaults into FALSE
 *      cy.overrideFeatureToggle()
 *    })
 *
 *    describe('Visit dummy endpoint', () => {
 *      it('should contain a TRUE text', () => {
 *        // detailed override to only activate feature toggle we required
 *        cy.overrideFeatureToggle({
 *         'EXAMPLE-FEATURE-TOGGLE' : true,
 *         'SIDEBAR-V1-FEAT-UPLOAD-E-MATERAI': true,
 *        })
 *
 *        cy.visit('http://localhost:8080/test/cypress') // 1.
 *
 *        cy.get('#value')
 *          .should('contain.text', 'TRUE');
 *      });
 *    });
 *
 *    ```
 */
Cypress.Commands.add('overrideFeatureToggle', (toggles = {}, expirationTime = '2h') => {
  cy.task('generateFeatureToggleOverrideJWT', { toggles, expirationTime })
    .then(jwt => cy.setCookie('OVERRIDE_FEATURE_TOGGLE', jwt))
})

