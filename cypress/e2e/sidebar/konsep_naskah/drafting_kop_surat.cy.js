import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu.cy"
import { DraftingKopSuratPage } from "../../../support/pages/sidebar/konsep_naskah/drafting_kop_surat.cy"

let draftingKopSuratPage = new DraftingKopSuratPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

before(() => {
    cy.fixture('credentials.json').then((data) => {
        user = data
    })
})

before(() => {
    loginPage.navigateLoginPage()
    loginPage.enterNip(user.nip)
    loginPage.clickBtnMasuk()
})

after(() => {
    qase(411,
        loginPage.logout()
    )
})

describe('Drafting Kop Surat Skenario', () => {
    qase(81,
        it('Akses form editing kop surat (drafting)', () => {
            draftingKopSuratPage.aksesFormKopSurat()
        })
    )

    qase(82,
        it('Cek detail form editing kop surat', () => {
            draftingKopSuratPage.checkDetail()
        })
    )

    qase(291,
        it('Check selected radio button (default)', () => {
            draftingKopSuratPage.checkPreviewDefault()
        })
    )

    qase(285,
        it('Cek preview setelah memilih kop Sekretariat Daerah', () => {
            draftingKopSuratPage.checkPreviewSekda()
        })
    )

    qase(74,
        it('Cek preview setelah memilih kop Dinas/Badan', () => {
            draftingKopSuratPage.checkPreviewDinas()
        })
    )
    
    qase(75,
        it('Cek preview setelah memilih kop UPTD/cabang dinas', () => {
            draftingKopSuratPage.checkPreviewUPTD()
        })
    )

    qase(72,
        it('Menutup form editing kop surat', () => {
            draftingKopSuratPage.closeKopSurat()
        })
    )
})