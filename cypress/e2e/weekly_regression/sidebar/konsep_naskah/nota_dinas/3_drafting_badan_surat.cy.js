import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "../../../../../support/pages/auth/login.cy"
import { DraftingBadanNaskahPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/nodin_drafting_badan_surat.cy.js"
import { CreateNotaDinasPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/pgs_create_nota_dinas.cy"

let draftingBadanNaskahPage = new DraftingBadanNaskahPage()
let createNotaDinasPage = new CreateNotaDinasPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })


})

before(() => {
    loginPage.loginViaV1(user.nip_konseptor_1, user.password)
    loginPage.directLogin()
    createNotaDinasPage.gotoNotaDinas()
})

after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})

describe('Drafting Badan Naskah Skenario', { testIsolation: false }, () => {
    qase(1123,
        it('Akses form editing badan naskah', () => {
            draftingBadanNaskahPage.aksesFormEditingBadanNaskah()
        })
    )

    qase(1114,
        it('Insert a table', () => {
            draftingBadanNaskahPage.insertTable()
            draftingBadanNaskahPage.clearBadanField()
        })
    )

    qase(1120,
        it('Insert a new paragraph after numeric list', () => {
            draftingBadanNaskahPage.checkPreviewTextNumeric()
        })
    )

    qase(1118,
        it('Menutup form editing badan naskah', () => {
            cy.wait(3000)
            draftingBadanNaskahPage.closeBadanNaskah()
        })
    )
})