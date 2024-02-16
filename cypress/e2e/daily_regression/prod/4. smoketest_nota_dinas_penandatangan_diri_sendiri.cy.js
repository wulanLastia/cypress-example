import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { DraftPage } from "../../../support/pages/sidebar/konsep_naskah/konsep_naskah/draft.cy"
import { DraftingNotaDinasPage } from "../../../support/pages/sidebar/konsep_naskah/nota_dinas/pgs_drafting_nota_dinas.cy"
import { CreateNotaDinasPage } from "../../../support/pages/sidebar/konsep_naskah/nota_dinas/pgs_create_nota_dinas.cy"
import { SetujuiPage } from "../../../support/pages/sidebar/kotak_masuk/5_setujui.cy"

const { faker } = require('@faker-js/faker')
let loginPage = new LoginPage()
let draftPage = new DraftPage()
let draftingNotaDinasPage = new DraftingNotaDinasPage()
let createNotaDinasPage = new CreateNotaDinasPage()
let setujuiPage = new SetujuiPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_prod.json').then((data) => {
        user = data
    })
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })

    cy.overrideFeatureToggle({
        'SIDEBAR-V1_RATE-LIMITER--FAILED_LOGIN': false,
        'SIDEBAR-V1-LOGIN-CAPTCHA': true
    })
})

before(() => {
    // LogIn Skenario Default
    loginPage.loginViaV1Prod(user.nip, user.password)
    loginPage.directLogin()

})

afterEach(() => {
    cy.wait(10000)
    loginPage.logoutV2step2PROD()
})

describe('Drafting Konsep Naskah Nota Dinas Skenario Penandatangan Diri Sendiri', () => {

    qase([1, 1069, 1064, 1065, 1067, 1066, 1062, 1063, 1061, 721, 723, 724, 725, 1123, 1118, 1146, 1147, 1148, 1151, 1159],
        it('Nota Dinas Penandatangan Diri Sendiri Tujuan Lampiran Kepala Internal', () => {
            createNotaDinasPage.gotoNotaDinas() // Cek detail halaman drafting konsep naskah Nota Dinas
            createNotaDinasPage.createKopSuratPROD()
            cy.wait(3000)
            createNotaDinasPage.createLampiranSurat1()
            cy.wait(3000)
            createNotaDinasPage.createLampiranSurat2()
            cy.wait(3000)
            createNotaDinasPage.createKakiSuratPenandatanganDiriSendiriPROD()
            cy.wait(3000)
            createNotaDinasPage.createLampiranKepalaSuratPROD()
            cy.wait(3000)
            createNotaDinasPage.createBadanSurat(faker.lorem.paragraphs(13, '<br/>\n'))
            cy.wait(3000)
            draftingNotaDinasPage.clickSimpanSurat()
            cy.wait(3000)
            draftPage.checkDataPertamaNaskahDisimpan()
            cy.wait(3000)
            setujuiPage.doTandaTanganiSurat('passphrase')
        })
    )
})