import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { CreateSuratBiasaPage } from "@pages/sidebar/konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"
import { DraftingKepalaSuratPage } from "@pages/sidebar/konsep_naskah/konsep_naskah/pgs_drafting_kepala_surat.cy"
import { ListNaskahSuratBiasaPage } from "@pages/sidebar/konsep_naskah/drafting_luar/list_jenis_naskah.cy"
import { KembalikanNaskahPage } from "@pages/sidebar/kotak_masuk/3_kembalikan_naskah.cy"

const { faker } = require('@faker-js/faker')
let loginPage = new LoginPage()
let createSuratBiasaPage = new CreateSuratBiasaPage()
let draftingKepalaSuratPage = new DraftingKepalaSuratPage()
let listNaskahSuratBiasaPage = new ListNaskahSuratBiasaPage()
let kembalikanNaskahPage = new KembalikanNaskahPage()
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

before(() => {
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.fixture('non_cred/kepala_surat/create_data_surat_biasa.json').then((data) => {
        data_temp = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

describe('Kembalikan Naskah Skenario', () => {

    qase([13, 81, 83, 709, 150, 80],
        it('Create Naskah Surat Biasa', () => {
            // Login 
            loginPage.loginViaV1(user.nip_konseptor_1, user.password)
            loginPage.directLogin()

            // Create Naskah
            listNaskahSuratBiasaPage.goToKonsepNaskahSuratBiasa()
            createSuratBiasaPage.inputKopSurat(data_temp.org[0].org1)
            draftingKepalaSuratPage.inputKepalaSurat(
                data_temp.env[0].staging,
                data_temp.kepala_surat[7].tempat1,
                data_temp.position_tujuan[0].position_kepala,
                [
                    data_temp.kepala_surat[0].tujuan1
                ],
                [
                    true
                ],
                data_temp.kepala_surat[1].lokasi,
                data_temp.kepala_surat[2].kode_klasifikasi,
                data_temp.kepala_surat[3].unit_pengolah,
                data_temp.kepala_surat[4].sifat_surat,
                data_temp.kepala_surat[5].urgensi_surat,
                data_temp.kepala_surat[6].perihal1
            )
            createSuratBiasaPage.inputKakiSurat(
                data_temp.env[0].staging,
                data_temp.kaki_surat[0].penandatangan_atasan1,
                data_temp.kaki_surat[1].pemeriksa1,
                data_temp.kaki_surat[2].tembusan_eksternal1,
                data_temp.kaki_surat[2].tembusan_eksternal2)
            createSuratBiasaPage.inputBadanNaskah(faker.lorem.paragraphs(13, '<br/>\n'))
            createSuratBiasaPage.kirimSurat(data_temp.env[0].staging)

            cy.wait(5000)
        })
    )

    qase([399, 101, 377, 402, 100],
        it('Kembalikan Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_1_1, user.password)
            loginPage.directLogin()

            // Kembalikan Naskah
            kembalikanNaskahPage.goToNaskahBelumDireview(data_temp.env[0].staging)
            kembalikanNaskahPage.emptyField()
            kembalikanNaskahPage.batalKembalikanNaskah()
            kembalikanNaskahPage.checkHalamanInformasi()
            kembalikanNaskahPage.checkBtnPeriksaKembali(data_temp.kembalikan[0].kembalikan_perihal)
            kembalikanNaskahPage.kembalikanNaskah(data_temp.kembalikan[0].kembalikan_perihal)
            cy.wait(3000)
        })
    )
}) 