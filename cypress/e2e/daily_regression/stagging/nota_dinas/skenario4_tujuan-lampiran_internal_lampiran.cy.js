import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { CreateNotaDinasPage } from "@pages/sidebar/konsep_naskah/nota_dinas/pgs_create_nota_dinas.cy"
import { KembalikanNaskahPage } from "@pages/sidebar/kotak_masuk/3_kembalikan_naskah.cy"
import { PerbaikiNaskahPage } from "@pages/sidebar/kotak_masuk/6_perbaiki.cy"
import { SetujuiPage } from "@pages/sidebar/kotak_masuk/5_setujui.cy"
import { KoreksiSuratPage } from "@pages/sidebar/kotak_masuk/7_koreksi.cy"
import { ListNaskahSuratBiasaPage } from "@pages/sidebar/konsep_naskah/drafting_luar/list_jenis_naskah.cy"

const { faker } = require('@faker-js/faker')
let loginPage = new LoginPage()
let createNotaDinasPage = new CreateNotaDinasPage()
let kembalikanNaskahPage = new KembalikanNaskahPage()
let perbaikiNaskahPage = new PerbaikiNaskahPage()
let setujuiPage = new SetujuiPage()
let koreksiSuratPage = new KoreksiSuratPage()
let listNaskahSuratBiasaPage = new ListNaskahSuratBiasaPage()
let user
let dataNotaDinas

Cypress.on('uncaught:exception', (err, runnable) => {
    // Jika terdapat error 'uncaught:exception' pada Headless Mode
    if (err.message.includes('postMessage')) {
        return false; // return false digunakan untuk skip error pada Headless Mode
    }

    // throw error untuk exceptions lain bila terdapat error lainnya selain 'uncaught:exception'
    throw err;
});

beforeEach(() => {
    cy.intercept({ resourceType: /xhr/ }, { log: false })
})

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })
})

before(() => {
    // LogIn Skenario Default
    loginPage.loginViaV1(user.nip_konseptor_1, user.password)
    loginPage.directLogin()

    cy.fixture('non_cred/kepala_surat/create_data_nota_dinas.json').then((jsonData) => {
        dataNotaDinas = jsonData  // Assign data from jsonData
    })
})

afterEach(() => {
    cy.wait(10000)
    loginPage.logoutV2step2()
})

describe('Drafting Konsep Naskah Nota Dinas Skenario', () => {

    qase([1, 1069, 1064, 1065, 1067, 1066, 1062, 1063, 1061, 721, 723, 724, 725, 1123, 1118, 1146, 1147, 1148, 1151, 1159],
        it('Nota Dinas Tujuan Lampiran Kepala Internal', () => {
            listNaskahSuratBiasaPage.goToKonsepNaskahNotaDinas() // Cek detail halaman drafting konsep naskah Nota Dinas
            createNotaDinasPage.createKopSurat()
            cy.wait(3000)
            createNotaDinasPage.createLampiranSurat1()
            cy.wait(3000)
            createNotaDinasPage.createLampiranSurat2()
            cy.wait(3000)
            createNotaDinasPage.createKakiSurat()
            cy.wait(3000)
            createNotaDinasPage.createLampiranKepalaSurat()
            cy.wait(3000)
            createNotaDinasPage.createBadanSurat(faker.lorem.paragraphs(13, '<br/>\n'))
            cy.wait(3000)
            createNotaDinasPage.doKirimNaskah(dataNotaDinas.env[0].staging)
        })
    )

    qase([399, 101, 377, 402, 100],
        it('Kembalikan Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_1_1, user.password)
            loginPage.directLogin()

            // Create Naskah
            kembalikanNaskahPage.goToNaskahBelumDireview(dataNotaDinas.env[0].staging)
            cy.wait(3000)
            kembalikanNaskahPage.emptyField()
            cy.wait(3000)
            kembalikanNaskahPage.batalKembalikanNaskah()
            cy.wait(3000)
            kembalikanNaskahPage.checkHalamanInformasi()
            cy.wait(3000)
            kembalikanNaskahPage.checkBtnPeriksaKembali(dataNotaDinas.kembalikan[0].kembalikan_perihal)
            cy.wait(3000)
            kembalikanNaskahPage.kembalikanNaskah(dataNotaDinas.kembalikan[0].kembalikan_perihal)
            cy.wait(3000)
        })
    )

    qase([367, 712, 713, 714, 715],
        it('Perbaiki Naskah', () => {
            // Set toogle unleash

            // Login 
            loginPage.loginViaV1(user.nip_konseptor_1, user.password)
            loginPage.directLogin()

            perbaikiNaskahPage.goToPerbaikiNaskahNotaDinas(dataNotaDinas.env[0].staging)
            cy.wait(3000)
            perbaikiNaskahPage.perbaikiNaskahNotaDinas(dataNotaDinas.perbaiki[0].perbaiki_perihal)
            cy.wait(10000)
        })
    )

    qase([358, 102],
        it('Setujui Naskah', () => {
            // Set toogle unleash

            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_1_1, user.password)
            loginPage.directLogin()

            setujuiPage.suratBelumDireview(dataNotaDinas.env[0].staging)
            setujuiPage.setujui()
        })
    )

    qase([368, 370, 372],
        it('Koreksi dan Tandatangani Naskah', () => {
            // Set toogle unleash

            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_1_2, user.password)
            loginPage.directLogin()

            koreksiSuratPage.goToNaskahBelumDireview(dataNotaDinas.env[0].staging)
            koreksiSuratPage.checkDetailKoreksiTandatanganiNotaDinas()
            koreksiSuratPage.koreksiTandatanganiNaskahNotaDinas(user.passphrase)
            cy.wait(10000)
        })
    )
})