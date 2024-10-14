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

describe('Pengecekan Kolom Urgensi', { testIsolation: false }, () => {
    
    qase(97,
        it('Akses menu kotak masuk (Review naskah)', () => {
            loginPage.loginViaV1(user.nip_konseptor_1, user.password)
            loginPage.directLogin()
            menuPage.goToKotakMasukReviewNaskah()
        })
    )

    qase([228, 229, 330, 331],
        it('Cek warna label urgensi', () => {
            listSuratReviewNaskahPage.checkWarnaLabelUrgensi()
        })
    )
})