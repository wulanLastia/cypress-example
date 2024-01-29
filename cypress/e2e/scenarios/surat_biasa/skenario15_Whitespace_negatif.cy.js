import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu/menu.cy"
import { CreateSuratBiasaPage } from "../../../support/pages/sidebar/konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"

const { faker } = require('@faker-js/faker')
let createSuratBiasaPage = new CreateSuratBiasaPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user
let data_temp

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.fixture('non_cred/kepala_surat/create_data_surat_biasa.json').then((data) => {
        data_temp = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

describe('[Negatif] Input Whitespace Create Surat Biasa Tujuan Internal Eksternal Skenario 10 (Tujuan Kepala Lampiran Surat)', () => {

    qase([13, 81, 83, 709, 150, 80, 849, 176, 106, 845, 115, 119, 128, 131, 134, 143, 311],
        it('Create Naskah Surat Biasa', () => {
            // Login 
            loginPage.loginViaV1(user.nip, user.password)
            loginPage.directLogin()

            // Create Naskah
            menuPage.goToKonsepNaskah()
            createSuratBiasaPage.checkDetail()
            createSuratBiasaPage.inputKopSurat()
            createSuratBiasaPage.inputLampiranSurat(faker.lorem.paragraphs(6, '<br/>\n'))
            createSuratBiasaPage.inputLampiranSurat2(faker.lorem.paragraphs(6, '<br/>\n'))
            createSuratBiasaPage.inputKakiSuratSkenario3(
                data_temp.env[0].staging,
                data_temp.kaki_surat[0].penandatangan_atasan1,
                data_temp.kaki_surat[1].pemeriksa1,
                data_temp.kaki_surat[2].tembusan_internal1,
                data_temp.kaki_surat[2].tembusan_internal2,
                data_temp.kaki_surat[2].tembusan_internal3,
                data_temp.kaki_surat[2].tembusan_eksternal4,
                data_temp.kaki_surat[2].tembusan_eksternal5,
                data_temp.kaki_surat[2].tembusan_eksternal6)
            createSuratBiasaPage.inputKepalaSuratSkenario10Negatif(
                data_temp.kepala_surat[7].tempat_negatif_whitespace,
                data_temp.kepala_surat[0].tujuan_lampiran_whitespace,
                data_temp.kepala_surat[1].lokasi_negatif_whitespace,
                data_temp.kepala_surat[2].kode_klasifikasi_negatif_whitespace,
                data_temp.kepala_surat[3].unit_pengolah_whitespace,
                data_temp.kepala_surat[4].sifat_surat,
                data_temp.kepala_surat[5].urgensi_surat,
                data_temp.kepala_surat[6].perihal_negatif_whitespace)
            createSuratBiasaPage.inputBadanNaskahSkenarioRegression(faker.lorem.paragraphs(13, '<br/>\n'))
            createSuratBiasaPage.kirimSuratNegatif()
        })
    )
})