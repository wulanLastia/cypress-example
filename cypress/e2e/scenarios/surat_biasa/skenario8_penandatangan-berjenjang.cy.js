import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu/menu.cy"
import { CreateSuratBiasaPage } from "../../../support/pages/sidebar/konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"
import { ReviewVerifikasiSuratPage } from "../../../support/pages/sidebar/kotak_masuk/2_review_verifikasi_surat.cy"
import { SetujuiPage } from "../../../support/pages/sidebar/kotak_masuk/5_setujui.cy"

const { faker } = require('@faker-js/faker')
let setujuiPage = new SetujuiPage()
let reviewVerifikasiSuratPage = new ReviewVerifikasiSuratPage()
let createSuratBiasaPage = new CreateSuratBiasaPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user
let data_temp

beforeEach(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.fixture('non_cred/kepala_surat/create_data_surat_biasa.json').then((data) => {
        data_temp = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

describe('Create Surat Biasa Skenario', () => {

    qase([13, 81, 83, 709, 150, 80],
        it('Create Naskah Surat Biasa', () => {
            // Login 
            loginPage.loginViaV1(user.nip, user.password)
            loginPage.directLogin()

            // Create Naskah
            menuPage.goToKonsepNaskah()
            cy.wait(5000)
            createSuratBiasaPage.checkDetail()
            createSuratBiasaPage.inputKopSurat()
            createSuratBiasaPage.inputKakiSuratSkenario2(
                data_temp.kaki_surat[0].penandatangan_atasan1,
                data_temp.kaki_surat[1].pemeriksa1,
                data_temp.kaki_surat[2].tembusan_eksternal1,
                data_temp.kaki_surat[2].tembusan_eksternal2,
                data_temp.kaki_surat[2].tembusan_eksternal3)
            createSuratBiasaPage.inputKepalaSurat(
                data_temp.kepala_surat[0].tujuan1,
                data_temp.kepala_surat[1].lokasi,
                data_temp.kepala_surat[2].kode_klasifikasi,
                data_temp.kepala_surat[3].unit_pengolah,
                data_temp.kepala_surat[4].sifat_surat,
                data_temp.kepala_surat[5].urgensi_surat,
                data_temp.kepala_surat[6].perihal1)
            createSuratBiasaPage.inputBadanNaskah(faker.lorem.paragraphs(13, '<br/>\n'))
            createSuratBiasaPage.kirimSurat()
        })
    )

    qase([102, 422, 424],
        it('Aksi setujui untuk penomoran pada detail naskah surat masuk belum di-review', () => {
            // Login Pemeriksa 1
            loginPage.loginViaV1(user.nipPemeriksa, user.password)
            loginPage.directLogin()

            menuPage.goToKotakMasukReviewNaskah()
            reviewVerifikasiSuratPage.suratBelumDireview()
            setujuiPage.setujui()
        })
    )

    qase([633, 585],
        it('Cek list kotak masuk review naskah pemeriksa selanjutnya setelah menyetujui naskah', () => {
            // Login Pemeriksa Terakhhir
            loginPage.loginViaV1(user.nipPemeriksa2, user.password)
            loginPage.directLogin()

            menuPage.goToKotakMasukReviewNaskah()
            reviewVerifikasiSuratPage.suratBelumDireview()
            setujuiPage.doTandaTanganiSurat(user.passphrase)
        })
    )
}) 