import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { DraftingKakiSuratPage } from "../../../../support/pages/sidebar/konsep_naskah/konsep_naskah/pgs_drafting_kaki_surat.cy"

let draftingKakiSuratPage = new DraftingKakiSuratPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('credentials_dev.json').then((data) => {
        user = data
    })
})

before(() => {
    loginPage.loginViaV1(user.nip, user.password)
    loginPage.directLogin()
})

after(() => {
    qase(411,
        loginPage.backToV1()
    )
})

describe('Drafting Kaki Surat Skenario', { testIsolation: false }, () => {
    qase(150,
        it('Access kaki surat editing form', () => {
            draftingKakiSuratPage.aksesKonsepNaskahSuratBiasa()
            draftingKakiSuratPage.aksesFormEditingKakiSurat()
        })
    )

    qase(151,
        it('Detail check kaki surat editing form', () => {
            draftingKakiSuratPage.checkDetail()
        })
    )

    qase(154,
        it('Check penandatangan dropdown list', () => {
            draftingKakiSuratPage.checkDropdownPenandatangan()
        })
    )

    qase(159,
        it('Leave the field empty when submitting the form', () => {
            draftingKakiSuratPage.leaveEmptyField()
        })
    )

    qase(164,
        it('Check dropdown list if user select diri sendiri', () => {
            draftingKakiSuratPage.aksesFormEditingKakiSurat()
            draftingKakiSuratPage.pilihPenandatanganDiriSendiri()
        })
    )

    qase(161,
        it('Check dropdown list if user select atasan', () => {
            draftingKakiSuratPage.pilihPenandatanganAtasan()
        })
    )

    qase(171,
        it('Check field if user select pemeriksa', () => {
            draftingKakiSuratPage.pilihPemeriksa()
        })
    )

    qase(201,
        it('Batal mengisi kaki surat', () => {
            draftingKakiSuratPage.closeKakiSurat()
        })
    )

}) 