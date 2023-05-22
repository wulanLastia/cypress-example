import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu/menu.cy"
import { KembalikanNaskahPage } from "../../../support/pages/sidebar/kotak_masuk/3_kembalikan_naskah.cy"

let kembalikanNaskahPage = new KembalikanNaskahPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

before(() => {
    cy.fixture('credentials.json').then((data) => {
        user = data
    })
})

before(() => {
    loginPage.loginViaV1(user.nipPemeriksa2, user.password)
    //cy.then(Cypress.session.clearCurrentSessionData)
    /*loginPage.navigateLoginPage()
    loginPage.enterNip(user.nip)
    loginPage.clickBtnMasuk()
    loginPage.closePopupLandingPage()*/
})

beforeEach(() => {
    loginPage.preserveAllCookiesOnce()
})

after(() => {
    qase(411,
        loginPage.logout()
    )
})

describe('Kembalikan Naskah Skenario', () => {

    qase(399,
        it('[Negative] Mengosongkan seluruh kolom informasi pengembalian dan klik button Kembalikan Naskah', () => {
            kembalikanNaskahPage.emptyField()
        })
    )

    qase(101,
        it('Batal mengembalikan naskah dari detail surat masuk belum direview', () => {
            kembalikanNaskahPage.batalKembalikanNaskah()
        })
    )

    qase(377,
        it('Cek tombol kembalikan', () => {
            kembalikanNaskahPage.checkHalamanInformasi()
        })
    )

    qase(402,
        it('Cek tombol periksa kembali', () => {
            kembalikanNaskahPage.checkBtnPeriksaKembali()
        })
    )

    qase(100,
        it('Mengembalikan naskah dari detail surat masuk belum direview', () => {
            kembalikanNaskahPage.kembalikanNaskah()
            cy.wait(3000)
            loginPage.closePopupLandingPage()
            cy.wait(5000)
            menuPage.clickBtnShowMenu()
        })
    )
}) 