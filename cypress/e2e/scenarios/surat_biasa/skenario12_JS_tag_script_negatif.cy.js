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

describe('[Negatif] Input tag Script Create Surat Biasa Tujuan Internal Eksternal Skenario 7 (Tujuan Kepala Lampiran Surat)', () => {

    qase([13, 81, 83, 709, 150, 80, 849, 176, 305, 91, 839, 109, 122, 137],
        it('Create Naskah Surat Biasa', () => {
            // Login 
            loginPage.loginViaV1(user.nip_konseptor_1, user.password)
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
            createSuratBiasaPage.inputKepalaSuratSkenario7Negatif(
                data_temp.env[0].staging,
                data_temp.kepala_surat[7].tempat_negatif_script,
                data_temp.kepala_surat[7].assert_tempat_negatif_script,
                data_temp.kepala_surat[0].tujuan_lampiran_script1,
                data_temp.kepala_surat[0].tujuan_lampiran_script2,
                data_temp.kepala_surat[0].tujuan_lampiran_script3,
                data_temp.kepala_surat[0].tujuan_lampiran_script4,
                data_temp.kepala_surat[0].tujuan_lampiran_script5,
                data_temp.kepala_surat[0].tujuan_lampiran_script6,
                data_temp.kepala_surat[0].assert_tujuan_lampiran_script1,
                data_temp.kepala_surat[0].assert_tujuan_lampiran_script2,
                data_temp.kepala_surat[0].assert_tujuan_lampiran_script3,
                data_temp.kepala_surat[0].assert_tujuan_lampiran_script4,
                data_temp.kepala_surat[0].assert_tujuan_lampiran_script5,
                data_temp.kepala_surat[0].assert_tujuan_lampiran_script6,
                data_temp.kepala_surat[1].lokasi_negatif_script,
                data_temp.kepala_surat[2].kode_klasifikasi,
                data_temp.kepala_surat[3].unit_pengolah_script,
                data_temp.kepala_surat[4].sifat_surat,
                data_temp.kepala_surat[5].urgensi_surat,
                data_temp.kepala_surat[6].perihal_negatif_script)
            createSuratBiasaPage.inputBadanNaskahSkenarioRegression(faker.lorem.paragraphs(13, '<br/>\n'))
            createSuratBiasaPage.kirimSuratNegatif()
        })
    )
})