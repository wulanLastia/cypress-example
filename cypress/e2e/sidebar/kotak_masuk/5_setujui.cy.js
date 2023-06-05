import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { SetujuiPage } from "../../../support/pages/sidebar/kotak_masuk/5_setujui.cy"

let setujuiPage = new SetujuiPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('credentials_dev.json').then((data) => {
        user = data
    })
})

before(() => {
    loginPage.loginViaV1(user.nipUK, user.password)
    loginPage.directLoginUK()
})

/*after(() => {
    qase(411,
        loginPage.backToV1()
    )
})*/

describe('Setujui Naskah Skenario', { testIsolation: false }, () => {


}) 