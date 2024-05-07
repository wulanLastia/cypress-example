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
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.fixture('non_cred/kepala_surat/create_data_surat_biasa.json').then((data) => {
        data_temp = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

after(() => {
    cy.wait(10000)
    loginPage.logoutV2step2()
})

describe('Surat Biasa - Skenario simpan draft, open draft, tte draft', () => {

    qase([13, 81, 83, 709, 150, 80, 913, 695, 176, 271],
        it('Skenario simpan draft, open draft, tte draft', () => {
            loginPage.loginViaV1(user.nip_konseptor_1, user.password)
            loginPage.directLogin()

            // Simpan draft
            listNaskahSuratBiasaPage.goToKonsepNaskahSuratBiasa()
            createSuratBiasaPage.inputKopSurat()
            createSuratBiasaPage.inputKakiSuratPenandatanganDiriSendiri(
                data_temp.kaki_surat[0].penandatangan_diri_sendiri)
            createSuratBiasaPage.inputKepalaSurat(
                data_temp.env[0].staging,
                data_temp.kepala_surat[7].tempat1,
                data_temp.kepala_surat[0].tujuan1,
                data_temp.kepala_surat[1].lokasi,
                data_temp.kepala_surat[2].kode_klasifikasi,
                data_temp.kepala_surat[3].unit_pengolah,
                data_temp.kepala_surat[4].sifat_surat,
                data_temp.kepala_surat[5].urgensi_surat,
                data_temp.kepala_surat[6].perihal8)
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