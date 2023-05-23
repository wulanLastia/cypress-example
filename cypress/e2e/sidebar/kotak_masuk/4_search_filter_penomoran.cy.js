import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { FilterDanSearchPenomoranPage } from "../../../support/pages/sidebar/kotak_masuk/4_search_filter_penomoran.cy"

let filterDanSearchPenomoranPage = new FilterDanSearchPenomoranPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('credentials.json').then((data) => {
        user = data
    })
})

before(() => {
    loginPage.loginViaV1(user.nipUK, user.password)
    loginPage.directLogin()
})

after(() => {
    qase(411,
        loginPage.backToV1()
    )
})

describe('Filter dan Search Skenario', () => {

}) 