import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "@pages/auth/login.cy"

let loginPage = new LoginPage()
let user

Cypress.on('uncaught:in promise', (err, runnable) => {
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

describe('Login to Sidebar V2 - Siap JABAR', () => {
    qase([3827, 3829],
        it('Login with username & password valid user SIAP JABAR', () => {
            // Cek tombol login melalui SIAP JABAR 3827
            loginPage.loginSiapJabar()

            // Login with username & password valid user SIAP JABAR 3829
            loginPage.inputDataLoginSiap(user.user_siap, user.password_siap)
        })
    )
})