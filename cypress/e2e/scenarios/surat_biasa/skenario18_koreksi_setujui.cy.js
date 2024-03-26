import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu/menu.cy"
import { CreateSuratBiasaPage } from "../../../support/pages/sidebar/konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"
import { KoreksiSuratPage } from "../../../support/pages/sidebar/kotak_masuk/7_koreksi.cy"

const { faker } = require('@faker-js/faker')
let createSuratBiasaPage = new CreateSuratBiasaPage()
let koreksiSuratPage = new KoreksiSuratPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
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

afterEach(() => {
    cy.wait(10000)
    loginPage.logoutV2step2()
})

describe('Create Surat Biasa Tujuan Internal Skenario 1 (Tujuan Kepala Surat)', () => {

    qase([13, 81, 83, 709, 150, 80, 176],
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
            createSuratBiasaPage.inputKakiSuratSkenario1(
                data_temp.env[0].staging,
                data_temp.kaki_surat[0].penandatangan_atasan1,
                data_temp.kaki_surat[1].pemeriksa1,
                data_temp.kaki_surat[2].tembusan_internal1,
                data_temp.kaki_surat[2].tembusan_internal2,
                data_temp.kaki_surat[2].tembusan_internal3)
            createSuratBiasaPage.inputKepalaSuratSkenario1(
                data_temp.env[0].staging,
                data_temp.kepala_surat[7].tempat1,
                data_temp.kepala_surat[0].tujuan1,
                data_temp.kepala_surat[0].tujuan2,
                data_temp.kepala_surat[0].tujuan3,
                data_temp.kepala_surat[1].lokasi,
                data_temp.kepala_surat[2].kode_klasifikasi,
                data_temp.kepala_surat[3].unit_pengolah,
                data_temp.kepala_surat[4].sifat_surat,
                data_temp.kepala_surat[5].urgensi_surat,
                data_temp.kepala_surat[6].perihal2)
            createSuratBiasaPage.inputBadanNaskahSkenarioRegression(faker.lorem.paragraphs(13, '<br/>\n'))
            createSuratBiasaPage.kirimSurat(data_temp.env[0].staging)
        })
    )

    qase([368, 370, 372],
        it('Koreksi dan Setujui Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_1_1, user.password)
            loginPage.directLogin()

            koreksiSuratPage.goToNaskahBelumDireview(data_temp.env[0].staging)
            koreksiSuratPage.checkDetailKoreksiSetujui()
            koreksiSuratPage.koreksiNaskah(data_temp.koreksi[0].koreksi_perihal)
            cy.wait(10000)
        })
    )

}) 