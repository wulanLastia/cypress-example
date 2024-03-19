import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { CreateNotaDinasPage } from "../../../support/pages/sidebar/konsep_naskah/nota_dinas/pgs_create_nota_dinas.cy"
import { KembalikanNaskahPage } from "../../../support/pages/sidebar/kotak_masuk/3_kembalikan_naskah.cy"
import { PerbaikiNaskahPage } from "../../../support/pages/sidebar/kotak_masuk/6_perbaiki.cy"
import { SetujuiPage } from "../../../support/pages/sidebar/kotak_masuk/5_setujui.cy"
import { KoreksiSuratPage } from "../../../support/pages/sidebar/kotak_masuk/7_koreksi.cy"

const { faker } = require('@faker-js/faker')
let loginPage = new LoginPage()
let createNotaDinasPage = new CreateNotaDinasPage()
let kembalikanNaskahPage = new KembalikanNaskahPage()
let perbaikiNaskahPage = new PerbaikiNaskahPage()
let setujuiPage = new SetujuiPage()
let koreksiSuratPage = new KoreksiSuratPage()
let user
let data_temp

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_prod.json').then((data) => {
        user = data
    })

    cy.fixture('non_cred/kepala_surat/create_data_nota_dinas.json').then((data) => {
        data_temp = data
    })
})

before(() => {
    // LogIn Skenario Default
    loginPage.loginViaV1Prod(user.nip_konseptor_1, user.password)
    loginPage.directLogin()

})

describe('Drafting Konsep Naskah Nota Dinas Skenario', () => {

    qase([1, 1069, 1064, 1065, 1067, 1066, 1062, 1063, 1061, 721, 723, 724, 725, 1123, 1118, 1146, 1147, 1148, 1151, 1159],
        it('Nota Dinas Tujuan Kepala Internal', () => {
            createNotaDinasPage.gotoNotaDinas() // Cek detail halaman drafting konsep naskah surat biasa
            cy.wait(5000)
            createNotaDinasPage.createKopSuratPROD()
            cy.wait(3000)
            createNotaDinasPage.createLampiranSurat1()
            cy.wait(3000)
            createNotaDinasPage.createLampiranSurat2()
            cy.wait(3000)
            createNotaDinasPage.createKakiSuratPROD()
            cy.wait(3000)
            createNotaDinasPage.createKepalaSurat()
            cy.wait(3000)
            createNotaDinasPage.createBadanSurat(faker.lorem.paragraphs(13, '<br/>\n'))
            cy.wait(3000)
            createNotaDinasPage.doKirimNaskah(data_temp.env[0].prod)
            cy.wait(10000)

            loginPage.logoutV2step2PROD() // for Trace Element Issue Only
        })
    )

    qase([399, 101, 377, 402, 100],
        it('Kembalikan Naskah', () => {
            // Login 
            loginPage.loginViaV1Prod(user.user.nip_pemeriksa_1 - 1, user.password_pemeriksa)
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
            cy.wait(3000)
            loginPage.closePopupLandingPage()
            cy.wait(10000)

            loginPage.logoutV2step2PROD()
        })
    )

    qase([367, 712, 713, 714, 715],
        it('Perbaiki Naskah', () => {
            // Login 
            loginPage.loginViaV1Prod(user.nip_konseptor_1, user.password)
            loginPage.directLogin()

            perbaikiNaskahPage.goToPerbaikiNaskahNotaDinas(data_temp.env[0].prod)
            cy.wait(3000)
            perbaikiNaskahPage.perbaikiNaskahNotaDinas(data_temp.perbaiki[0].perbaiki_perihal)
            cy.wait(10000)

            loginPage.logoutV2step2PROD()
        })
    )

    qase([358, 102],
        it('Setujui Naskah', () => {
            // Login 
            loginPage.loginViaV1Prod(user.user.nip_pemeriksa_1 - 1, user.password_pemeriksa)
            loginPage.directLogin()

            setujuiPage.suratBelumDireview(data_temp.env[0].prod)
            cy.wait(3000)
            setujuiPage.setujui()
            cy.wait(10000)

            loginPage.logoutV2step2PROD()
        })
    )

    qase([368, 370, 372],
        it('Koreksi dan Tandatangani Naskah', () => {
            // Login 
            loginPage.loginViaV1Prod(user.user.nip_pemeriksa_1 - 2, user.password_pemeriksa)
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