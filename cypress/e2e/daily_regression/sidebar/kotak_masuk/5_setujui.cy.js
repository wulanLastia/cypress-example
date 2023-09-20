import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { SetujuiPage } from "../../../../support/pages/sidebar/kotak_masuk/5_setujui.cy"

let setujuiPage = new SetujuiPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })
})

before(() => {
    loginPage.loginViaV1(user.nipPemeriksa, user.password)
    loginPage.directLogin()
})

describe('Setujui Naskah Skenario', { testIsolation: false }, () => {
    qase(358,
        it('Cek detail halaman detail kotak masuk review naskah dengan status belum direview', () => {
            setujuiPage.suratBelumDireview()
        })
    )

    qase(102,
        it('Aksi setujui untuk penomoran pada detail naskah surat masuk belum di - review', () => {
            setujuiPage.setujui()
        })
    )

}) 