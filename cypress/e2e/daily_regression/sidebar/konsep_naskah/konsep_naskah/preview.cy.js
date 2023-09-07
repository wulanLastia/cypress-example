import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../../support/pages/auth/login.cy"
import { DraftingKonsepNaskahPage } from "../../../../../support/pages/sidebar/konsep_naskah/surat_biasa/pgs_drafting_surat_biasa.cy"

let draftingKonsepNaskahPage = new DraftingKonsepNaskahPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('credentials_dev.json').then((data) => {
        user = data
    })
})

before(() => {
    loginPage.loginViaV1(user.nip, user.password)
    loginPage.directLogin()
})

after(() => {
    qase(411,
        loginPage.logoutV2()
    )
})

describe('Preview Surat Biasa', () => {
    qase(278,
        it('Scroll preview ke bawah', () => {
            // Login
            draftingKonsepNaskahPage.goToKonsepNaskahSuratBiasa()
            draftingKonsepNaskahPage.scrollPreviewDownPage()
        })
    )
})