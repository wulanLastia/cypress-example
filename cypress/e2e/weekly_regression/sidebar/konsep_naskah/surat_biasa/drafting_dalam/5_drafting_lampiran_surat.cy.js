import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { DraftingLampiranSuratPage } from "@pages/sidebar/konsep_naskah/konsep_naskah/pgs_drafting_lampiran_surat.cy"

let draftingLampiranSuratPage = new DraftingLampiranSuratPage()
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
})

describe('Drafting Lampiran Surat Skenario', { testIsolation: false }, () => {

    qase([104, 280, 279],
        it('Check detail attachment editing form', () => {
            draftingLampiranSuratPage.aksesKonsepNaskahSuratBiasa()
            draftingLampiranSuratPage.aksesFormEditingLampiranSurat()
            draftingLampiranSuratPage.checkDetail()
        })
    )

    qase(105,
        it('Hapus lampiran drafting surat biasa', () => {
            draftingLampiranSuratPage.hapusLampiranSurat()
        })
    )
}) 