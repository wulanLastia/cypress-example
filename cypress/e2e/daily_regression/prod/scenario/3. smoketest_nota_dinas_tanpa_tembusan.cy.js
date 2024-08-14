import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { CreateNotaDinasPage } from "@pages/sidebar/konsep_naskah/nota_dinas/pgs_create_nota_dinas.cy"
import { SetujuiPage } from "@pages/sidebar/kotak_masuk/5_setujui.cy"
import { ListNaskahSuratBiasaPage } from "@pages/sidebar/konsep_naskah/drafting_luar/list_jenis_naskah.cy"

const { faker } = require('@faker-js/faker')
let loginPage = new LoginPage()
let createNotaDinasPage = new CreateNotaDinasPage()
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

before(() => {
    // LogIn Skenario Default
    loginPage.loginViaV1Prod(user.nip_konseptor_1, user.password)
    loginPage.directLogin()

})

describe('Drafting Konsep Naskah Nota Dinas Skenario', () => {

    qase([1, 1069, 1064, 1065, 1067, 1066, 1062, 1063, 1061, 721, 723, 724, 725, 1123, 1118, 1146, 1147, 1148, 1151, 1159],
        it('Nota Dinas Tujuan Kepala Internal', () => {
            listNaskahSuratBiasaPage.goToKonsepNaskahNotaDinas() // Cek detail halaman drafting konsep naskah surat biasa
            cy.wait(5000)
            createNotaDinasPage.createKopSuratPROD()
            cy.wait(3000)
            createNotaDinasPage.createLampiranSurat1('Lampiran 1 ' + faker.lorem.paragraphs(6, '<br/>\n'))
            cy.wait(3000)
            createNotaDinasPage.createLampiranSurat2('Lampiran 2 ' + faker.lorem.paragraphs(6, '<br/>\n'))
            cy.wait(3000)
            createNotaDinasPage.createKakiSuratPenandatanganDiriSendiriPROD()
            cy.wait(3000)
            createNotaDinasPage.createKepalaSurat()
            cy.wait(3000)
            createNotaDinasPage.createBadanSurat(faker.lorem.paragraphs(13, '<br/>\n'))
            cy.wait(3000)
            setujuiPage.doTandaTanganiSurat('passphrase')
        })
    )
})