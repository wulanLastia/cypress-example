/// <reference types="cypress"/>
import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../support/pageObjects/auth/auth_login.cy"

let loginPage = new LoginPage()
let userDetails

before(() => {
    cy.fixture('credentials.json').then((user) => {
        userDetails = user
    })
})

describe('Login Skenario', () => {
    qase(79,
        it('Login', () => {
            loginPage.navigateLoginPage()
            loginPage.enterUsername(userDetails.username)
            loginPage.enterPassword(userDetails.password)
            loginPage.clickBtnLogin()
        })
    )
})