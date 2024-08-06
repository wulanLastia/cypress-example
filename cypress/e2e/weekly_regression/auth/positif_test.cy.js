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

before(() => {
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

describe('Login Positif Skenario', () => {
    qase([78, 411],
        it('Login with username & password valid user SIDEBAR', () => {
            loginPage.loginViaV1(user.nip_konseptor_1, user.password)
            loginPage.directLogin()
            loginPage.logoutV2()
        })
    )
})