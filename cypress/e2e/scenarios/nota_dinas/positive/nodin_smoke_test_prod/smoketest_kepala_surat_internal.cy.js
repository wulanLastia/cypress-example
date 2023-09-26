import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../../support/pages/sidebar/menu/menu.cy"
import { CreateNotaDinasPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/pgs_create_nota_dinas.cy"
import { KembalikanNaskahPage } from "../../../../../support/pages/sidebar/kotak_masuk/3_kembalikan_naskah.cy"
import { PerbaikiNaskahPage } from "../../../../../support/pages/sidebar/kotak_masuk/6_perbaiki.cy"
import { SetujuiPage } from "../../../../../support/pages/sidebar/kotak_masuk/5_setujui.cy"
import { KoreksiSuratPage } from "../../../../../support/pages/sidebar/kotak_masuk/7_koreksi.cy"




let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

let createNotaDinasPage = new CreateNotaDinasPage()
let kembalikanNaskahPage = new KembalikanNaskahPage()
let perbaikiNaskahPage = new PerbaikiNaskahPage()
let setujuiPage = new SetujuiPage()
let koreksiSuratPage = new KoreksiSuratPage()



before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_prod.json').then((data) => {
        user = data
    })
})

before(() => {
    // LogIn Skenario Default
    loginPage.loginViaV1Prod(user.nip, user.password)
    loginPage.directLogin()

})




describe('Drafting Konsep Naskah Nota Dinas Skenario', () => {

    qase([1, 1069, 1064, 1065, 1067, 1066, 1062, 1063, 1061, 721, 723, 724, 725, 1123, 1118, 1146, 1147, 1148, 1151, 1159],
        it('Nota Dinas Tujuan Kepala Internal', () => {
            createNotaDinasPage.gotoNotaDinas() // Cek detail halaman drafting konsep naskah surat biasa
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
            createNotaDinasPage.createBadanSurat()
            cy.wait(3000)
            createNotaDinasPage.doKirimNaskah()
            cy.wait(10000)

            loginPage.logoutV2step2PROD() // for Trace Element Issue Only
        })
    )


    qase([399, 101, 377, 402, 100],
        it('Kembalikan Naskah', () => {
            // Login 
            loginPage.loginViaV1Prod(user.nipPemeriksa, user.passwordPemeriksa)
            loginPage.directLogin()


            // Create Naskah
            kembalikanNaskahPage.emptyField()
            cy.wait(3000)
            kembalikanNaskahPage.batalKembalikanNaskah()
            cy.wait(3000)
            kembalikanNaskahPage.checkHalamanInformasi()
            cy.wait(3000)
            kembalikanNaskahPage.checkBtnPeriksaKembali()
            cy.wait(3000)
            kembalikanNaskahPage.kembalikanNaskah()
            cy.wait(3000)
            loginPage.closePopupLandingPage()
            cy.wait(10000)

            loginPage.logoutV2step2PROD()
        })
    )


    qase([367, 712, 713, 714, 715],
        it('Perbaiki Naskah', () => {
            // Login 
            loginPage.loginViaV1Prod(user.nip, user.password)
            loginPage.directLogin()
        

            perbaikiNaskahPage.goToPerbaikiNaskahNotaDinas()
            cy.wait(3000)
            perbaikiNaskahPage.perbaikiNaskahNotaDinas()
            cy.wait(10000)

            loginPage.logoutV2step2PROD()
        })
    )


    qase([358, 102],
        it('Setujui Naskah', () => {
            // Login 
            loginPage.loginViaV1Prod(user.nipPemeriksa, user.passwordPemeriksa)
            loginPage.directLogin()

            setujuiPage.suratBelumDireview()
            cy.wait(3000)
            setujuiPage.setujui()
            cy.wait(10000)

            loginPage.logoutV2step2PROD()
        })
    )


    qase([368, 370, 372],
        it.skip('Koreksi dan Tandatangani Naskah', () => {
            // Login 
            loginPage.loginViaV1Prod(user.nipPemeriksa2, user.passwordPemeriksa)
            loginPage.directLogin()

            koreksiSuratPage.goToNaskahBelumDireview()
            cy.wait(3000)
            koreksiSuratPage.checkDetailKoreksiTandatanganiNotaDinas()
            cy.wait(3000)
            koreksiSuratPage.koreksiTandatanganiNaskahNotaDinas(user.passphrase)
            cy.wait(10000)
        })
    )



})