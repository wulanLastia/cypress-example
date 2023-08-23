import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu/menu.cy"
import { ReviewVerifikasiSuratPage } from "../../../support/pages/sidebar/kotak_masuk/2_review_verifikasi_surat.cy"
import { CreateSuratBiasaPage } from "../../../support/pages/sidebar/konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"
import { FilterDanSearchPenomoranPage } from "../../../support/pages/sidebar/kotak_masuk/4_search_filter_penomoran.cy"
import { SetujuiPage } from "../../../support/pages/sidebar/kotak_masuk/5_setujui.cy"

let setujuiPage = new SetujuiPage()
let filterDanSearchPenomoranPage = new FilterDanSearchPenomoranPage()
let createSuratBiasaPage = new CreateSuratBiasaPage()
let reviewVerifikasiSuratPage = new ReviewVerifikasiSuratPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('credentials_dev.json').then((data) => {
        user = data
    })
})

describe('Create Surat Biasa Skenario', () => {

    qase([13, 81, 83, 709, 150, 80, 913],
        it('Create Naskah Surat Biasa', () => {
            Login 
            loginPage.loginViaV1(user.nip, user.password)
            loginPage.directLoginUnleash()

            // loginPage.navigateLoginPageV2()
            // loginPage.enterNip(user.nip)
            // loginPage.clickBtnMasuk()
            // loginPage.closePopupLandingPage()

            // Create Naskah
            menuPage.goToKonsepNaskah()
            createSuratBiasaPage.checkDetail()
            createSuratBiasaPage.inputKopSurat()
            createSuratBiasaPage.inputKepalaSurat()
            createSuratBiasaPage.inputKakiSuratPDF()
            createSuratBiasaPage.inputBadanNaskahSkenarioRegression()
            createSuratBiasaPage.inputKakiSuratSkenario4()
            cy.wait(6000)
            menuPage.checkDataPertamaNaskahDisimpan()
            setujuiPage.doTandaTanganiSurat(user.passphrase)



            // createSuratBiasaPage.kirimSurat()
        })
    )

    // it.skip('Penomoran oleh UK', () => {
    //     // Login UK untuk melakukan penomoran
    //     loginPage.loginViaV1(user.nipUK, user.password)
    //     loginPage.directLoginUK()

    //     menuPage.goToKotakMasukPenomoranDanDistribusi()
    //     filterDanSearchPenomoranPage.suratBelumDinomori()
    //     filterDanSearchPenomoranPage.nomoriDanTeruskan()
    // })

    // it('Tandatangani oleh Penandatangan (Diri Sendiri)', () => {
    //     // Login UK untuk melakukan penomoran
    //     loginPage.loginViaV1(user.nip, user.password)
    //     loginPage.directLogin()

    //     menuPage.goToKotakMasukReviewNaskah()
    //     reviewVerifikasiSuratPage.suratBelumDitandatangani()
    //     setujuiPage.tandaTangani(user.passphrase)
    // })
}) 