import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { CreateSuratBiasaPage } from "@pages/sidebar/konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"
import { ListNaskahSuratBiasaPage } from "@pages/sidebar/konsep_naskah/drafting_luar/list_jenis_naskah.cy"
import { DraftPage } from "@pages/sidebar/konsep_naskah/konsep_naskah/draft.cy"
import { SetujuiPage } from "@pages/sidebar/kotak_masuk/5_setujui.cy"

const { faker } = require('@faker-js/faker')
let loginPage = new LoginPage()
let createSuratBiasaPage = new CreateSuratBiasaPage()
let listNaskahSuratBiasaPage = new ListNaskahSuratBiasaPage()
let draftPage = new DraftPage()
let setujuiPage = new SetujuiPage()
let user
let data_temp

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_prod.json').then((data) => {
        user = data
    })

    cy.fixture('non_cred/kepala_surat/create_data_surat_biasa.json').then((data) => {
        data_temp = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

describe('Surat Biasa - Skenario simpan draft, open draft, tte draft', () => {

    qase([13, 81, 83, 709, 150, 80, 913, 695, 176, 271],
        it('Skenario simpan draft, open draft, tte draft', () => {
            // Login
            loginPage.loginViaV1Prod(user.nip_konseptor_1, user.password)
            loginPage.directLogin()

            // Simpan draft
            listNaskahSuratBiasaPage.goToKonsepNaskahSuratBiasa()
            createSuratBiasaPage.inputKopSuratProd()
            createSuratBiasaPage.inputKakiSuratPenandatanganDiriSendiriProd(
                data_temp.kaki_surat[0].penandatangan_diri_sendiri_prod)
                createSuratBiasaPage.inputKepalaSuratSkenario5Prod(
                    data_temp.env[0].prod,
                    data_temp.kepala_surat[7].tempat1,
                    data_temp.kepala_surat[0].tujuan_internal_prod1,
                    data_temp.kepala_surat[0].tujuan_internal_prod2,
                    data_temp.kepala_surat[0].tujuan_internal_prod3,
                    data_temp.kepala_surat[0].tujuan_eksternal4,
                    data_temp.kepala_surat[0].tujuan_eksternal5,
                    data_temp.kepala_surat[0].tujuan_eksternal6,
                    data_temp.kepala_surat[1].lokasi,
                    data_temp.kepala_surat[2].kode_klasifikasi,
                    data_temp.kepala_surat[3].unit_pengolah,
                    data_temp.kepala_surat[4].sifat_surat,
                    data_temp.kepala_surat[5].urgensi_surat,
                    data_temp.kepala_surat[6].perihal6)
            createSuratBiasaPage.inputBadanNaskahSkenarioRegression(faker.lorem.paragraphs(13, '<br/>\n'))
            createSuratBiasaPage.simpanSurat()
            cy.wait(6000)

            // Open draft
            draftPage.checkDataPertamaNaskahDisimpan()

            // Tte draft
            setujuiPage.doTandaTanganiSurat(user.passphrase)
        })
    )

}) 