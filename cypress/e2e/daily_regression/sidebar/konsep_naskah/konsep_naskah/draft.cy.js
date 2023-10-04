import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../../support/pages/sidebar/menu/menu.cy"
import { DraftPage } from "../../../../../support/pages/sidebar/konsep_naskah/konsep_naskah/draft.cy"

let draftPage = new DraftPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

before(() => {
    loginPage.loginViaV1(user.nip, user.password)
    loginPage.directLogin()
})

after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})

describe('Draft Konsep Naskah', { testIsolation: false }, () => {

    qase(699,
        it('Cek button lihat semua pada list konsep naskah', () => {
            menuPage.goToKonsepNaskah()
            draftPage.checkBtnShowAllDraft()
        })
    )

    qase(708,
        it('Cek button kembali pada list naskah draft', () => {
            draftPage.checkBtnBack()
        })
    )

    qase(705,
        it('Cek button atur naskah pada list konsep naskah', () => {
            draftPage.checkBtnShowAllDraft()
            draftPage.aturDraftNaskah()
        })
    )

    qase(707,
        it('Batal hapus naskah draft', () => {
            draftPage.cancelRemoveDraft()
        })
    )

    qase(706,
        it('Hapus naskah draft', () => {
            draftPage.removeDraft()
        })
    )

})