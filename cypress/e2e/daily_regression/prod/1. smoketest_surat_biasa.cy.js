import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu/menu.cy"
import { CreateSuratBiasaPage } from "../../../support/pages/sidebar/konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"
import { KembalikanNaskahPage } from "../../../support/pages/sidebar/kotak_masuk/3_kembalikan_naskah.cy"
import { PerbaikiNaskahPage } from "../../../support/pages/sidebar/kotak_masuk/6_perbaiki.cy"
import { SetujuiPage } from "../../../support/pages/sidebar/kotak_masuk/5_setujui.cy"
import { KoreksiSuratPage } from "../../../support/pages/sidebar/kotak_masuk/7_koreksi.cy"

const { faker } = require('@faker-js/faker')
let createSuratBiasaPage = new CreateSuratBiasaPage()
let kembalikanNaskahPage = new KembalikanNaskahPage()
let perbaikiNaskahPage = new PerbaikiNaskahPage()
let setujuiPage = new SetujuiPage()
let koreksiSuratPage = new KoreksiSuratPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user
let data_temp

beforeEach(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_prod.json').then((data) => {
        user = data
    })

    cy.fixture('non_cred/kepala_surat/create_data_surat_biasa.json').then((data) => {
        data_temp = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

describe('Skenario Create Surat Biasa Tujuan Internal Eksternal (Tujuan Kepala Surat) Penomoran Otomatis', () => {

    qase([13, 81, 83, 709, 150, 80],
        it('Create Naskah Surat Biasa', () => {
            // Login 
            loginPage.loginViaV1Prod(user.nip, user.password)
            loginPage.directLogin()

            // Create Naskah
            menuPage.goToKonsepNaskah()
            createSuratBiasaPage.checkDetail()
            createSuratBiasaPage.inputKopSuratProd()
            createSuratBiasaPage.inputLampiranSurat(faker.lorem.paragraphs(6, '<br/>\n'))
            createSuratBiasaPage.inputLampiranSurat2(faker.lorem.paragraphs(6, '<br/>\n'))
            createSuratBiasaPage.inputKakiSuratSkenario3Prod(
                data_temp.env[0].prod,
                data_temp.kaki_surat[0].penandatangan_atasan_prod,
                data_temp.kaki_surat[1].pemeriksa_prod,
                data_temp.kaki_surat[2].tembusan_internal_prod1,
                data_temp.kaki_surat[2].tembusan_internal_prod2,
                data_temp.kaki_surat[2].tembusan_internal_prod3,
                data_temp.kaki_surat[2].tembusan_eksternal4,
                data_temp.kaki_surat[2].tembusan_eksternal5,
                data_temp.kaki_surat[2].tembusan_eksternal6)
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
            createSuratBiasaPage.inputBadanNaskahSkenarioRegression(faker.lorem.paragraphs(15, '<br/>\n'))
            createSuratBiasaPage.kirimSurat(data_temp.env[0].prod)
        })
    )

    qase([399, 101, 377, 402, 100],
        it('Kembalikan Naskah', () => {
            // Login 
            loginPage.loginViaV1Prod(user.nipPemeriksa, user.passwordPemeriksa)
            loginPage.directLogin()

            // Create Naskah
            kembalikanNaskahPage.goToNaskahBelumDireview(data_temp.env[0].prod)
            kembalikanNaskahPage.emptyField()
            kembalikanNaskahPage.batalKembalikanNaskah()
            kembalikanNaskahPage.checkHalamanInformasi()
            kembalikanNaskahPage.checkBtnPeriksaKembali(data_temp.kembalikan[0].kembalikan_perihal)
            kembalikanNaskahPage.kembalikanNaskah(data_temp.kembalikan[0].kembalikan_perihal)
            cy.wait(3000)
            loginPage.closePopupLandingPage()
        })
    )

    qase([367, 712, 713, 714, 715],
        it('Perbaiki Naskah', () => {
            // Login 
            loginPage.loginViaV1Prod(user.nip, user.password)
            loginPage.directLogin()

            perbaikiNaskahPage.goToPerbaikiNaskah(data_temp.env[0].prod)
            perbaikiNaskahPage.perbaikiNaskah(data_temp.perbaiki[0].perbaiki_perihal)
        })
    )

    qase([358, 102],
        it('Setujui Naskah', () => {
            // Login 
            loginPage.loginViaV1Prod(user.nipPemeriksa, user.passwordPemeriksa)
            loginPage.directLogin()

            setujuiPage.suratBelumDireview(data_temp.env[0].prod)
            setujuiPage.setujui()
        })
    )

    qase([368, 370, 372],
        it('Koreksi dan Tandatangani Naskah', () => {
            // Login 
            loginPage.loginViaV1Prod(user.nipPemeriksa2, user.passwordPemeriksa)
            loginPage.directLogin()

            koreksiSuratPage.goToNaskahBelumDireview(data_temp.env[0].prod)
            koreksiSuratPage.checkDetailKoreksiTandatangani()
            koreksiSuratPage.koreksiTandatanganiNaskah(user.passphrase, data_temp.koreksi[0].koreksi_perihal)
        })
    )
})