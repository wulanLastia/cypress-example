import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { CreateSuratBiasaPage } from "@pages/sidebar/konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"
import { ListNaskahSuratBiasaPage } from "@pages/sidebar/konsep_naskah/drafting_luar/list_jenis_naskah.cy"
import { SetujuiPage } from "@pages/sidebar/kotak_masuk/5_setujui.cy"
import { DraftPage } from "@pages/sidebar/konsep_naskah/konsep_naskah/draft.cy"

const { faker } = require('@faker-js/faker')
let loginPage = new LoginPage()
let createSuratBiasaPage = new CreateSuratBiasaPage()
let listNaskahSuratBiasaPage = new ListNaskahSuratBiasaPage()
let setujuiPage = new SetujuiPage()
let draftPage = new DraftPage()
let user
let data_temp

Cypress.on('uncaught:exception', (err, runnable) => {
    // Jika terdapat error 'uncaught:exception' pada Headless Mode
    if (err.message.includes('postMessage')) {
        return false; // return false digunakan untuk skip error pada Headless Mode
    }

    // throw error untuk exceptions lain bila terdapat error lainnya selain 'uncaught:exception'
    throw err;
});

after(() => {
    cy.wait(10000)
    loginPage.logoutV2step2()
})

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

describe('Create Surat Biasa Skenario', () => {

    qase([13, 81, 83, 709, 150, 80, 913, 176],
        it('Create Naskah Surat Biasa', () => {
            loginPage.loginViaV1(user.nip_konseptor_1, user.password)
            loginPage.directLogin()

            // Create Naskah
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
                data_temp.kepala_surat[6].perihal1)
            createSuratBiasaPage.inputBadanNaskahSkenarioRegression(faker.lorem.paragraphs(13, '<br/>\n'))
            createSuratBiasaPage.simpanSurat()
            cy.wait(6000)
            draftPage.checkDataPertamaNaskahDisimpan()
            setujuiPage.doTandaTanganiSurat(user.passphrase)
        })
    )

}) 