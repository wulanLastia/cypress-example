import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { FilterDanSearchPenomoranPage } from "../../../support/pages/sidebar/kotak_masuk/4_search_filter_penomoran.cy"

let filterDanSearchPenomoranPage = new FilterDanSearchPenomoranPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.fixture('credentials.json').then((data) => {
        user = data
    })
})

before(() => {
    loginPage.loginViaV1(user.nipUK, user.password)
})

after(() => {
    qase(411,
        loginPage.logout()
    )
})

describe('Filter dan Search Skenario', () => {

    qase(399,
        it('[Negative] Mengosongkan seluruh kolom informasi pengembalian dan klik button Kembalikan Naskah', () => {
            kembalikanNaskahPage.emptyField()
        })
    )
}) 