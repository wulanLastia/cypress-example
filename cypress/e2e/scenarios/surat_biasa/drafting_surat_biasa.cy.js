import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu/menu.cy"
import { DraftingKonsepNaskahPage } from "../../../support/pages/sidebar/konsep_naskah/surat_biasa/pgs_drafting_surat_biasa.cy"

let draftingKonsepNaskahPage = new DraftingKonsepNaskahPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
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

describe('Drafting Konsep Naskah Skenario', { testIsolation: false }, () => {
    qase(70,
        it('Cek detail halaman drafting konsep naskah surat biasa', () => {
            draftingKonsepNaskahPage.checkDetail()
        })
    )

    qase(76,
        it('Batal drafting konsep naskah', () => {
            draftingKonsepNaskahPage.batalDrafting()
        })
    )

    qase(77,
        it('Melanjutkan drafting konsep naskah', () => {
            draftingKonsepNaskahPage.lanjutkanDrafting()
        })
    )
})