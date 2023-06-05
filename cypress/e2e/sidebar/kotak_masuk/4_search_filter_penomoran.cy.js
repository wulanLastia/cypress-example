import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { FilterDanSearchPenomoranPage } from "../../../support/pages/sidebar/kotak_masuk/4_search_filter_penomoran.cy"

let filterDanSearchPenomoranPage = new FilterDanSearchPenomoranPage()
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

describe('Filter dan Search Skenario', { testIsolation: false }, () => {

    qase(204,
        it('Melakukan pencarian dengan kata kunci perihal yang tersedia pada data', () => {
            filterDanSearchPenomoranPage.searchDokumen('Dinomori')
        })
    )

    qase(203,
        it('Cek aksi pencarian jika kata kunci kurang dari 3 karakter', () => {
            filterDanSearchPenomoranPage.searchDokumen('Di')
        })
    )
}) 