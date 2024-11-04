import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { CreateSuratBiasaPage } from "@pages/sidebar/konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"
import { SetujuiPage } from "@pages/sidebar/kotak_masuk/5_setujui.cy"
import { ListNaskahSuratBiasaPage } from "@pages/sidebar/konsep_naskah/drafting_luar/list_jenis_naskah.cy"

const { faker } = require('@faker-js/faker')
let createSuratBiasaPage = new CreateSuratBiasaPage()
let setujuiPage = new SetujuiPage()
let listNaskahSuratBiasaPage = new ListNaskahSuratBiasaPage()
let loginPage = new LoginPage()
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

describe('Skenario Surat Biasa - Tujuan Lampiran Internal 3, Tembusan Internal 3, Lampiran 2, Tandatangani Diri Sendiri', () => {

    qase([79, 13, 81, 83, 709, 150, 80, 849, 176],
        it('Create Naskah Surat Biasa', () => {
            // Login 
            loginPage.loginViaV1(user.nip_konseptor_2, user.password)
            loginPage.directLogin()

            // Create Naskah
            listNaskahSuratBiasaPage.goToKonsepNaskahSuratBiasa()
            createSuratBiasaPage.inputKopSurat(data_temp.org[0].org2)
            createSuratBiasaPage.inputLampiranSurat(faker.lorem.paragraphs(6, '<br/>\n'))
            createSuratBiasaPage.inputLampiranSurat2(faker.lorem.paragraphs(6, '<br/>\n'))
            createSuratBiasaPage.inputKakiSuratSkenario6(
                data_temp.env[0].staging,
                data_temp.kaki_surat[0].penandatangan_diri_sendiri2,
                data_temp.kaki_surat[2].tembusan_internal1,
                data_temp.kaki_surat[2].tembusan_internal2,
                data_temp.kaki_surat[2].tembusan_internal3)
            createSuratBiasaPage.inputKepalaSuratSkenario2(
                data_temp.env[0].staging,
                data_temp.kepala_surat[7].tempat1,
                data_temp.kepala_surat[0].tujuan1,
                data_temp.kepala_surat[0].tujuan2,
                data_temp.kepala_surat[0].tujuan4,
                data_temp.kepala_surat[1].lokasi,
                data_temp.kepala_surat[2].kode_klasifikasi,
                data_temp.kepala_surat[3].unit_pengolah,
                data_temp.kepala_surat[4].sifat_surat,
                data_temp.kepala_surat[5].urgensi_surat,
                data_temp.kepala_surat[6].perihal3)
            createSuratBiasaPage.inputBadanNaskahSkenarioRegression(faker.lorem.paragraphs(13, '<br/>\n'))
            setujuiPage.doTandaTanganiSurat(user.passphrase)

            cy.wait(3000)
        })
    )
}) 