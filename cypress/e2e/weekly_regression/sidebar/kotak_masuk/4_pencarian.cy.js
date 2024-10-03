import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { MenuPage } from "@pages/sidebar/menu/menu.cy"
import { ListSuratReviewNaskahPage } from "@pages/sidebar/kotak_masuk/1_list_surat_review_naskah.cy"

let listSuratReviewNaskahPage = new ListSuratReviewNaskahPage()
let menuPage = new MenuPage()
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

beforeEach(() => {
    cy.intercept({ resourceType: /xhr/ }, { log: false })
})

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)

    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })
})

describe('Pencarian Naskah Kotak Masuk Skenario', { testIsolation: false }, () => {
    
    qase(97,
        it('Akses menu kotak masuk (Review naskah)', () => {
            loginPage.loginViaV1(user.nip_konseptor_1, user.password)
            loginPage.directLogin()
            menuPage.goToKotakMasukReviewNaskah()
        })
    )

    qase(204,
        it('Melakukan pencarian dengan kata kunci perihal yang tersedia pada data', () => {
            listSuratReviewNaskahPage.searchDokumen('Automation')
        })
    )

    qase(203,
        it('Cek aksi pencarian jika kata kunci kurang dari 3 karakter', () => {
            listSuratReviewNaskahPage.searchDokumen('Di')
        })
    )

    qase(209,
        it('Input script pada kolom pencarian', () => {
            listSuratReviewNaskahPage.searchDokumen('<script>alert("hai")</script>')
        })
    )

    qase(205,
        it('Melakukan pencarian dengan kata kunci yang tidak tersedia pada data', () => {
            listSuratReviewNaskahPage.searchDokumen('XX1234XX')
        })
    )
})