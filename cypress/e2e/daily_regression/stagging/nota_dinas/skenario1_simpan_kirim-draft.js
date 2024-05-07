import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { DraftPage } from "@pages/sidebar/konsep_naskah/konsep_naskah/draft.cy"
import { DraftingNotaDinasPage } from "@pages/sidebar/konsep_naskah/nota_dinas/pgs_drafting_nota_dinas.cy"
import { CreateNotaDinasPage } from "@pages/sidebar/konsep_naskah/nota_dinas/pgs_create_nota_dinas.cy"
import { SetujuiPage } from "@pages/sidebar/kotak_masuk/5_setujui.cy"
import { ListNaskahSuratBiasaPage } from "@pages/sidebar/konsep_naskah/drafting_luar/list_jenis_naskah.cy"

const { faker } = require('@faker-js/faker')
let loginPage = new LoginPage()
let draftPage = new DraftPage()
let draftingNotaDinasPage = new DraftingNotaDinasPage()
let createNotaDinasPage = new CreateNotaDinasPage()
let setujuiPage = new SetujuiPage()
let listNaskahSuratBiasaPage = new ListNaskahSuratBiasaPage()
let user

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
})

afterEach(() => {
    cy.wait(10000)
    loginPage.logoutV2step2()
})

describe('Drafting Konsep Naskah Nota Dinas Skenario Penandatangan Diri Sendiri', () => {

    qase([1, 1069, 1064, 1065, 1067, 1066, 1062, 1063, 1061, 721, 723, 724, 725, 1123, 1118, 1146, 1147, 1148, 1151, 1159],
        it('Nota Dinas Penandatangan Diri Sendiri Tujuan Lampiran Kepala Internal', () => {
            listNaskahSuratBiasaPage.goToKonsepNaskahNotaDinas() // Cek detail halaman drafting konsep naskah Nota Dinas
            createNotaDinasPage.createKopSurat()
            cy.wait(3000)
            createNotaDinasPage.createLampiranSurat1()
            cy.wait(3000)
            createNotaDinasPage.createLampiranSurat2()
            cy.wait(3000)
            createNotaDinasPage.createKakiSuratPenandatanganDiriSendiri()
            cy.wait(3000)
            createNotaDinasPage.createLampiranKepalaSurat()
            cy.wait(3000)
            createNotaDinasPage.createBadanSurat(faker.lorem.paragraphs(13, '<br/>\n'))
            cy.wait(3000)
            createNotaDinasPage.doKirimNaskah(dataNotaDinas.env[0].staging)
        })
    )
})