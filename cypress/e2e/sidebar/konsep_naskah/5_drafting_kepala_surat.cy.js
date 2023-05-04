import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu/menu.cy"
import { DraftingKepalaSuratPage } from "../../../support/pages/sidebar/konsep_naskah/4_drafting_kepala_surat.cy"

let draftingKepalaSuratPage = new DraftingKepalaSuratPage()
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
    loginPage.closePopupLandingPage()
})

/*after(() => {
    qase(411,
        loginPage.logout()
    )
})*/

describe('Drafting Kepala Surat Skenario', () => {
    qase(83,
        it('Akses form editing kepala surat', () => {
            draftingKepalaSuratPage.aksesKonsepNaskahSuratBiasa()
            draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        })
    )

    qase(83,
        it('Cek detail form editing kepala surat', () => {
            draftingKepalaSuratPage.checkDetail()
        })
    )

    qase(303,
        it('Cek tempat penulisan surat default', () => {
            draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
            draftingKepalaSuratPage.validateTempat()
        })
    )

    qase(347,
        it('Cek isian tanggal surat default', () => {
            draftingKepalaSuratPage.validateTanggal()
        })
    )

    qase(262,
        it('Add tujuan', () => {
            draftingKepalaSuratPage.validateTujuan()
        })
    )

    qase(116,
        it('Check on preview page after input di', () => {
            draftingKepalaSuratPage.validateLokasi()
        })
    )

    qase(120,
        it('Cek preview setelah memilih kode klasifikasi', () => {
            draftingKepalaSuratPage.validateKodeKlasifikasi()
        })
    )

    qase(129,
        it('Check on preview page after input unit pengolah', () => {
            draftingKepalaSuratPage.validateUnitPengolah()
        })
    )

    qase(132,
        it('Cek preview setelah memilih sifat', () => {
            draftingKepalaSuratPage.validateSifatSurat()
        })
    )

    qase(133,
        it('Cek dropdown urgensi', () => {
            draftingKepalaSuratPage.validateUrgensiSurat()
        })
    )

    qase(144,
        it('Check on preview page after input perihal', () => {
            draftingKepalaSuratPage.validatePerihal()
        })
    )


    qase(199,
        it('Batal mengisi kepala naskah', () => {
            draftingKepalaSuratPage.closeKepalaSurat()
        })
    )

})