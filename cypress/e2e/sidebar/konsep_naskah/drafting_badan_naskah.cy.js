import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu/menu.cy"
import { DraftingBadanNaskahPage } from "../../../support/pages/sidebar/konsep_naskah/drafting_badan_naskah.cy"

let draftingBadanNaskahPage = new DraftingBadanNaskahPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

before(() => {
    cy.fixture('credentials.json').then((data) => {
        user = data
    })
})

before(() => {
    loginPage.navigateLoginPage()
    loginPage.enterNip(user.nip)
    loginPage.clickBtnMasuk()
})

after(() => {
    qase(411,
        loginPage.logout()
    )
})

describe('Drafting Badan Naskah Skenario', () => {
    qase(146,
        it('Check on preview page if user entered bold text', () => {
            draftingBadanNaskahPage.aksesBadanNaskah()
            draftingBadanNaskahPage.checkPreviewTextBold()
        })
    )

    qase(147,
        it('Check on preview page if user entered italic text', () => {
            draftingBadanNaskahPage.checkPreviewTextItalic()
        })
    )

    qase(148,
        it('Check on preview page if user entered numeric list', () => {
            draftingBadanNaskahPage.checkPreviewTextNumeric()
        })
    )

    qase(430,
        it('Insert a new paragraph after numeric list', () => {
            draftingBadanNaskahPage.insertNewParagraph()
        })
    )

    qase(149,
        it('Check on preview page if user entered bullet list', () => {
            draftingBadanNaskahPage.checkPreviewTextBullet()
        })
    )

    qase(153,
        it('Insert a table', () => {
            draftingBadanNaskahPage.insertTable()
        })
    )

    qase(154,
        it.skip('Insert an image', () => {
            draftingBadanNaskahPage.insertImage()
        })
    )

    qase(200,
        it('Menutup form editing badan naskah', () => {
            draftingBadanNaskahPage.closeBadanNaskah()
        })
    )

    qase(584,
        it('Leave the field empty when submitting the form', () => {
            draftingBadanNaskahPage.leaveEmptyForm()
        })
    )

}) 