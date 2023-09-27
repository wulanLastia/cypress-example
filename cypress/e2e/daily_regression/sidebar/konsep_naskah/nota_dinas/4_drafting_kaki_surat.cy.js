import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../../support/pages/sidebar/menu/menu.cy"
import { DraftingKakiSuratPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/nodin_drafting_kaki_surat.cy.js"
import { CreateNotaDinasPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/pgs_create_nota_dinas.cy"

let draftingKakiSuratPage = new DraftingKakiSuratPage()
let createNotaDinasPage = new CreateNotaDinasPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })
})

before(() => {
    loginPage.loginViaV1(user.nip, user.password)
    loginPage.directLogin()
    createNotaDinasPage.gotoNotaDinas()
})



describe('Drafting Badan Naskah Skenario', { testIsolation: false }, () => {
    after(() => {
        qase(411,
            loginPage.logoutV2step2()
        )
    })
    
    
    qase(1146,
        it('Access kaki surat editing form', () => {
            draftingKakiSuratPage.aksesFormEditingKakiSurat()
        })
    )

    qase(1147,
        it('Detail check kaki surat editing form', () => {
            draftingKakiSuratPage.inputKakiSurat()
            draftingKakiSuratPage.checkDetail()
        })
    )

    qase(1168,
        it('Batal mengisi kaki surat', () => {
            draftingKakiSuratPage.closeKakiSurat()
        })
    )

})



describe('Kaki Naskah', { testIsolation: false }, () => {
    before(() => {
        cy.then(Cypress.session.clearCurrentSessionData)
        loginPage.loginViaV1(user.nip, user.password)
        loginPage.directLogin()
        createNotaDinasPage.gotoNotaDinas()
    })

    after(() => {
        qase(411,
            loginPage.logoutV2step2()
        )
    })

    
    
    qase(1148,
        it('Check penandatangan dropdown list', () => {
            draftingKakiSuratPage.aksesFormEditingKakiSurat()
            draftingKakiSuratPage.inputKakiSurat()
            draftingKakiSuratPage.checkDropdownPenandatangan()
        })
    )

    qase(1151,
        it('Check dropdown list if user select atasan', () => {
            draftingKakiSuratPage.pilihPenandatanganAtasan()
        })
    )

    qase(1154,
        it('Check dropdown list if user select diri sendiri', () => {
            draftingKakiSuratPage.pilihPenandatanganDiriSendiri()
        })
    )

})


describe('Penandatangan', { testIsolation: false }, () => {
    before(() => {
        cy.then(Cypress.session.clearCurrentSessionData)
        loginPage.loginViaV1(user.nip, user.password)
        loginPage.directLogin()
        createNotaDinasPage.gotoNotaDinas()
    })

    after(() => {
        qase(411,
            loginPage.logoutV2step2()
        )
    })

    
    
    qase(1159,
        it('Check field if user select pemeriksa', () => {
            draftingKakiSuratPage.aksesFormEditingKakiSurat()
            draftingKakiSuratPage.inputKakiSurat()
            draftingKakiSuratPage.pilihPemeriksa()
        })
    )
})