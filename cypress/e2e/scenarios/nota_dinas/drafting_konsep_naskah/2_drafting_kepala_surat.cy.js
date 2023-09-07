import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../support/pages/sidebar/menu/menu.cy"
import { DraftingKepalaSuratNotaDinasPage } from "../../../../support/pages/sidebar/konsep_naskah/nota_dinas/nodin_drafting_kepala_surat.cy"
import { DraftingNotaDinasPage } from "../../../../support/pages/sidebar/konsep_naskah/nota_dinas/pgs_drafting_nota_dinas.cy"

let draftingKepalaSuratNotaDinasPage = new DraftingKepalaSuratNotaDinasPage()
let draftingNotaDinasPage = new DraftingNotaDinasPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
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

describe('Drafting Kepala Surat Skenario', { testIsolation: false }, () => {
    qase(721,
        it('Akses form editing kepala surat', () => {
            draftingNotaDinasPage.goToKonsepNaskahNotaDinas()
            draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat()
        })
    )

    qase(723,
        it('Cek detail preview kepala naskah', () => {
            draftingKepalaSuratNotaDinasPage.checkDetailPreview()
        })
    )

    qase(725,
        it('Cek detail form kepala naskah', () => {
            draftingKepalaSuratNotaDinasPage.checkDetail()
        })
    )

    qase(724,
        it('Menutup form kepala naskah', () => {
            draftingKepalaSuratNotaDinasPage.closeKepalaSurat()
            menuPage.goToKotakMasukReviewNaskah()
        })
    )

})