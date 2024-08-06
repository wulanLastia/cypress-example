import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "../../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../../support/pages/sidebar/menu/menu.cy"
import { DraftingKonsepNaskahPage } from "../../../../../support/pages/sidebar/konsep_naskah/surat_biasa/pgs_drafting_surat_biasa.cy"

let draftingKonsepNaskahPage = new DraftingKonsepNaskahPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })


})

before(() => {
    loginPage.loginViaV1(user.nip_konseptor_1, user.password)
    loginPage.directLogin()
})

after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})

describe('Preview Surat Biasa', { testIsolation: false }, () => {

    qase(278,
        it('Scroll preview ke bawah', () => {
            draftingKonsepNaskahPage.goToKonsepNaskahSuratBiasa()
            draftingKonsepNaskahPage.scrollPreviewDownPage()
        })
    )

    qase(277,
        it('Scroll preview ke atas', () => {
            draftingKonsepNaskahPage.scrollPreviewPage()
            menuPage.goToKotakMasukReviewNaskah()
        })
    )
})