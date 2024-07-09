import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { DraftingKonsepNaskahPage } from "@pages/sidebar/konsep_naskah/surat_biasa/pgs_drafting_surat_biasa.cy"

let draftingKonsepNaskahPage = new DraftingKonsepNaskahPage()
let loginPage = new LoginPage()
let user

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
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

before(() => {
    loginPage.loginViaV1(user.nip_konseptor_1, user.password)
    loginPage.directLogin()
})

after(() => {
    qase(411,
        loginPage.logoutV2()
    )
})

describe('Drafting Konsep Naskah Skenario', { testIsolation: false }, () => {
    qase(70,
        it('Cek detail halaman drafting konsep naskah surat biasa', () => {
            draftingKonsepNaskahPage.checkDetail()
        })
    )

    qase(76,
        it('Batal drafting konsep naskah', () => {
            draftingKonsepNaskahPage.batalDrafting()
        })
    )

    qase(77,
        it('Melanjutkan drafting konsep naskah', () => {
            draftingKonsepNaskahPage.lanjutkanDrafting()
        })
    )
})