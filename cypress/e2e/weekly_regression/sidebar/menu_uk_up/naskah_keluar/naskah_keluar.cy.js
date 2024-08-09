import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { MenuPage } from "@pages/sidebar/menu/menu.cy"
import { NaskahKeluarPage } from "@pages/sidebar/menu_uk_up/naskah_keluar/naskah_keluar.cy"

let loginPage = new LoginPage()
let menuPage = new MenuPage()
let naskahKeluarPage = new NaskahKeluarPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)

    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.intercept({ resourceType: /xhr/ }, { log: false })
})

describe('Menu UK dan UP - Naskah Keluar UK', { testIsolation: false }, () => {

    qase(4838,
        it('Akses halaman naskah keluar', () => {
            // Login 
            loginPage.loginViaV1(user.user_uk_diskominfo, user.password)
            loginPage.directLogin()

            // Akses halaman naskah keluar
            menuPage.goToNaskahKeluar()
        })
    )

    qase(4839,
        it('User klik detail halaman naskah keluar', () => {
            // User klik detail halaman naskah keluar
            naskahKeluarPage.checkDetail()
        })
    )
})