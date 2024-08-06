import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"

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
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

describe('Login Negatif Skenario', () => {
    qase(252,
        it('Input NIP selain angka', () => {
            loginPage.loginViaV1(user.nip_abjad, user.password)
            loginPage.alertGagalLogin()
        })
    )

    qase(249,
        it('Login dengan NIP kurang dari 18 karakter', () => {
            loginPage.loginViaV1(user.nip_kurang, user.password)
            loginPage.alertGagalLogin()
        })
    )
})