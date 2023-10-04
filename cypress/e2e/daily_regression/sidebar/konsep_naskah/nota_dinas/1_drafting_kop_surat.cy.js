import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../../support/pages/sidebar/menu/menu.cy"
import { CreateNotaDinasPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/pgs_create_nota_dinas.cy"
import { DraftingKopSuratNotaDinasPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/nodin_drafting_kop_surat.cy"


let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

let createNotaDinasPage = new CreateNotaDinasPage()
const draftingKopSuratNotaDinasPage = new DraftingKopSuratNotaDinasPage()


    
before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

before(() => {
    loginPage.loginViaV1(user.nip, user.password)
    loginPage.directLogin()
    createNotaDinasPage.gotoNotaDinas()
})

after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})

describe('Drafting Kop Surat Nota Dinas Skenario', { testIsolation: false }, () => {
    qase(1064,
        it('Akses form editing kop surat (drafting)', () => {
            draftingKopSuratNotaDinasPage.aksesFormEditingKopSurat()
            cy.wait(6000)
        })
    )

    qase(1065,
        it('Cek detail form editing kop surat', () => {
            draftingKopSuratNotaDinasPage.checkDetail()
        })
    )

    qase(1067,
        it('Check selected radio button (default)', () => {
            draftingKopSuratNotaDinasPage.checkPreviewDefault()
        })
    )

    qase(1066,
        it('Cek preview setelah memilih kop Sekretariat Daerah', () => {
            draftingKopSuratNotaDinasPage.checkPreviewSekda()
        })
    )

    qase(1062,
        it('Cek preview setelah memilih kop Dinas/Badan', () => {
            draftingKopSuratNotaDinasPage.checkPreviewDinas()
        })
    )

    qase(1063,
        it('Cek preview setelah memilih kop UPTD/cabang dinas', () => {
            draftingKopSuratNotaDinasPage.checkPreviewUPTD()
        })
    )

    qase(1061,
        it('Menutup form editing kop surat', () => {
            draftingKopSuratNotaDinasPage.closeKopSurat()
            menuPage.goToKotakMasukReviewNaskah()
        })
    )
})