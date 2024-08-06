import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../support/pages/sidebar/menu/menu.cy"
import { ReviewVerifikasiSuratPage } from "../../../../support/pages/sidebar/kotak_masuk/2_review_verifikasi_surat.cy"
import { CreateSuratBiasaPage } from "../../../../support/pages/sidebar/konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"

const { faker } = require('@faker-js/faker')
let reviewVerifikasiSuratPage = new ReviewVerifikasiSuratPage()
let menuPage = new MenuPage()
let loginPage = new LoginPage()
let createSuratBiasaPage = new CreateSuratBiasaPage()
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

afterEach(() => {
    loginPage.logoutV2step2()
})

describe('Detail Review dan Verifikasi hasil Surat (Kotak Masuk) Skenario', () => {

    qase([13, 81, 83, 709, 150, 80],
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

            cy.wait(5000)
        })
    )

    qase([97, 358, 99],
        it('Check Detail Review dan Verifikasi hasil Surat (Kotak Masuk)', () => {
            //Login
            loginPage.loginViaV1(user.nip_pemeriksa_1_1, user.password)
            loginPage.directLogin()

            menuPage.goToKotakMasukReviewNaskah()
            reviewVerifikasiSuratPage.suratBelumDireview()
            reviewVerifikasiSuratPage.lanjutkanReviewDrafting()
            menuPage.goToKotakKeluarReviewNaskah()

            cy.wait(5000)
        })
    )
})