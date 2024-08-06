import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { CreateSuratBiasaPage } from "@pages/sidebar/konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"
import { ListNaskahSuratBiasaPage } from "@pages/sidebar/konsep_naskah/drafting_luar/list_jenis_naskah.cy"

const { faker } = require('@faker-js/faker')
let loginPage = new LoginPage()
let createSuratBiasaPage = new CreateSuratBiasaPage()
let listNaskahSuratBiasaPage = new ListNaskahSuratBiasaPage()
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

describe('[Negatif] Input HTML Script Create Surat Biasa Tujuan Internal Eksternal Skenario 8 (Tujuan Kepala Lampiran Surat)', () => {

    qase([13, 81, 83, 709, 150, 80, 849, 176, 306, 92, 840, 110, 123, 138],
        it('Create Naskah Surat Biasa', () => {
            // Login 
            loginPage.loginViaV1(user.nip_konseptor_1, user.password)
            loginPage.directLogin()

            // Create Naskah
            listNaskahSuratBiasaPage.goToKonsepNaskahSuratBiasa()
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
            createSuratBiasaPage.inputKepalaSuratSkenario8Negatif(
                data_temp.env[0].staging,
                data_temp.kepala_surat[7].tempat_negatif_html,
                data_temp.kepala_surat[7].assert_tempat_negatif_html,
                data_temp.kepala_surat[0].tujuan_lampiran_html1,
                data_temp.kepala_surat[0].tujuan_lampiran_html2,
                data_temp.kepala_surat[0].tujuan_lampiran_html3,
                data_temp.kepala_surat[0].tujuan_lampiran_html4,
                data_temp.kepala_surat[0].tujuan_lampiran_html5,
                data_temp.kepala_surat[0].tujuan_lampiran_html6,
                data_temp.kepala_surat[0].assert_tujuan_lampiran_html1,
                data_temp.kepala_surat[0].assert_tujuan_lampiran_html2,
                data_temp.kepala_surat[0].assert_tujuan_lampiran_html3,
                data_temp.kepala_surat[0].assert_tujuan_lampiran_html4,
                data_temp.kepala_surat[0].assert_tujuan_lampiran_html5,
                data_temp.kepala_surat[0].assert_tujuan_lampiran_html6,
                data_temp.kepala_surat[1].lokasi_negatif_html,
                data_temp.kepala_surat[2].kode_klasifikasi,
                data_temp.kepala_surat[3].unit_pengolah_html,
                data_temp.kepala_surat[4].sifat_surat,
                data_temp.kepala_surat[5].urgensi_surat,
                data_temp.kepala_surat[6].perihal_negatif_html)
            createSuratBiasaPage.inputBadanNaskahSkenarioRegression(faker.lorem.paragraphs(13, '<br/>\n'))
            createSuratBiasaPage.kirimSuratNegatif()
        })
    )
})