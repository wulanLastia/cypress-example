import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../support/pages/sidebar/menu/menu.cy"

let menuPage = new MenuPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.fixture('credentials_dev.json').then((data) => {
        user = data
    })
})

describe('Menu Negatif Skenario', () => {
    qase(412,
        it('Akses halaman konsep naskah setelah logout', () => {
            menuPage.navigateKonsepNaskahPage()
        })
    )

    qase(413,
        it('Akses halaman kotak masuk review naskah setelah logout', () => {
            menuPage.navigateKotakMasukReviewNaskahPage()
        })
    )

    qase(414,
        it('Akses halaman kotak masuk tindak lanjut setelah logout', () => {
            menuPage.navigateKotakMasukTindakLanjutPage()
        })
    )

    qase(415,
        it('Akses halaman kotak keluar review naskah setelah logout', () => {
            menuPage.navigateKotakKeluarReviewNaskahPage()
        })
    )

    qase(416,
        it('Akses halaman kotak keluar tindak lanjut setelah logout', () => {
            menuPage.navigateKotakKeluarTindakLanjutPage()
        })
    )
})