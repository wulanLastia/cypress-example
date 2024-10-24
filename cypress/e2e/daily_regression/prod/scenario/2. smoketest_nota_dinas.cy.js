import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { CreateNotaDinasPage } from "@pages/sidebar/konsep_naskah/nota_dinas/pgs_create_nota_dinas.cy"
import { KembalikanNaskahPage } from "@pages/sidebar/kotak_masuk/3_kembalikan_naskah.cy"
import { SetujuiPage } from "@pages/sidebar/kotak_masuk/5_setujui.cy"
import { PerbaikiNaskahPage } from "@pages/sidebar/kotak_masuk/6_perbaiki.cy"
import { KoreksiSuratPage } from "@pages/sidebar/kotak_masuk/7_koreksi.cy"
import { ListNaskahSuratBiasaPage } from "@pages/sidebar/konsep_naskah/drafting_luar/list_jenis_naskah.cy"

const { faker } = require('@faker-js/faker')
let loginPage = new LoginPage()
let createNotaDinasPage = new CreateNotaDinasPage()
let kembalikanNaskahPage = new KembalikanNaskahPage()
let perbaikiNaskahPage = new PerbaikiNaskahPage()
let koreksiSuratPage = new KoreksiSuratPage()
let listNaskahSuratBiasaPage = new ListNaskahSuratBiasaPage()
let setujuiPage = new SetujuiPage()
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
    cy.then(Cypress.session.clearCurrentSessionData)
    
    cy.fixture('cred/credentials_prod.json').then((data) => {
        user = data
    })

    cy.fixture('non_cred/kepala_surat/create_data_nota_dinas.json').then((data) => {
        data_temp = data
    })
})

describe('Drafting Konsep Naskah Nota Dinas Skenario', () => {

    qase([1, 1069, 1064, 1065, 1067, 1066, 1062, 1063, 1061, 721, 723, 724, 725, 1123, 1118, 1146, 1147, 1148, 1151, 1159],
        it('Nota Dinas Tujuan Kepala Internal', () => {
            // LogIn Skenario Default
            loginPage.loginViaV1Prod(user.nip_konseptor_1, user.password)
            loginPage.directLogin()

            listNaskahSuratBiasaPage.goToKonsepNaskahNotaDinas() // Cek detail halaman drafting konsep naskah surat biasa
            cy.wait(5000)
            createNotaDinasPage.createKopSuratPROD()
            cy.wait(3000)
            createNotaDinasPage.createLampiranSurat1('Lampiran 1 ' + faker.lorem.paragraphs(6, '<br/>\n'))
            cy.wait(3000)
            createNotaDinasPage.createLampiranSurat2('Lampiran 2 ' + faker.lorem.paragraphs(6, '<br/>\n'))
            cy.wait(3000)
            createNotaDinasPage.createKakiSuratPROD(
                data_temp.kaki_surat[0].penandatangan_atasan_prod,
                data_temp.kaki_surat[1].pemeriksa_prod
            )
            cy.wait(3000)
            createNotaDinasPage.createKepalaSurat(
                [data_temp.kepala_surat[0].tujuan_prod1], 
                [data_temp.kepala_surat[1].tembusan_prod1, data_temp.kepala_surat[1].tembusan_prod2], 
                data_temp.kepala_surat[3].kode_klasifikasi, 
                data_temp.kepala_surat[4].unit_pengolah, 
                data_temp.kepala_surat[5].sifat_surat, 
                data_temp.kepala_surat[6].urgensi_surat, 
                data_temp.kepala_surat[7].perihal2
            )
            cy.wait(3000)
            createNotaDinasPage.createBadanSurat(faker.lorem.paragraphs(13, '<br/>\n'))
            cy.wait(3000)
            createNotaDinasPage.doKirimNaskah(data_temp.env[0].prod)
            cy.wait(10000)
        })
    )

    qase([399, 101, 377, 402, 100],
        it('Kembalikan Naskah', () => {
            // Login 
            loginPage.loginViaV1Prod(user.nip_pemeriksa_1_1, user.password_pemeriksa)
            loginPage.directLogin()

            // Create Naskah
            kembalikanNaskahPage.goToNaskahBelumDireview(data_temp.env[0].prod)
            cy.wait(3000)
            kembalikanNaskahPage.emptyField()
            cy.wait(3000)
            kembalikanNaskahPage.batalKembalikanNaskah()
            cy.wait(3000)
            kembalikanNaskahPage.checkHalamanInformasi()
            cy.wait(3000)
            kembalikanNaskahPage.checkBtnPeriksaKembali(data_temp.kembalikan[0].kembalikan_perihal)
            cy.wait(3000)
            kembalikanNaskahPage.kembalikanNaskah(data_temp.kembalikan[0].kembalikan_perihal)
            cy.wait(10000)
        })
    )

    qase([367, 712, 713, 714, 715],
        it('Perbaiki Naskah', () => {
            // Login 
            loginPage.loginViaV1Prod(user.nip_konseptor_1, user.password)
            loginPage.directLogin()

            perbaikiNaskahPage.goToPerbaikiNaskah(data_temp.env[0].prod)
            cy.wait(3000)
            perbaikiNaskahPage.perbaikiNaskahNotaDinas(data_temp.perbaiki[0].perbaiki_perihal)
            cy.wait(10000)
        })
    )

    qase([358, 102],
        it('Setujui Naskah', () => {
            // Login 
            loginPage.loginViaV1Prod(user.nip_pemeriksa_1_1, user.password_pemeriksa)
            loginPage.directLogin()

            setujuiPage.suratBelumDireview()
            setujuiPage.setujui()
        })
    )

    qase([368, 370, 372],
        it('Koreksi dan Tandatangani Naskah', () => {
            // Login 
            loginPage.loginViaV1Prod(user.nip_pemeriksa_1_2, user.password_pemeriksa)
            loginPage.directLogin()

            koreksiSuratPage.goToNaskahBelumDireview(data_temp.env[0].prod)
            cy.wait(3000)
            koreksiSuratPage.checkDetailKoreksiTandatanganiNotaDinas()
            cy.wait(3000)
            koreksiSuratPage.koreksiTandatanganiNaskahNotaDinas('passphrase')
            cy.wait(10000)
        })
    )
})