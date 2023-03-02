import { qase } from 'cypress-qase-reporter/dist/mocha'
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu.cy"

let menuPage = new MenuPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.fixture('credentials.json').then((data) => {
        user = data
    })
})

beforeEach(() => {
    loginPage.navigateLoginPage()
    loginPage.enterNip(user.nip)
    loginPage.clickBtnMasuk()
})

afterEach(() => {
    qase(411,
        loginPage.logout()
    )
})


describe('Menu Positif Skenario', () => {
    qase(1,
        it('Cek detail navbar', () => {
            menuPage.checkProfile()
        })
    )

    qase(2,
        it('Menyembunyikan menu', () => {
            menuPage.clickBtnHideMenu()
        })
    )

    qase(3,
        it('Menampilkan menu', () => {
            menuPage.clickBtnShowMenu()            
        })
    )

    qase(4,
        it('Cek Detail Sidebar', () => {
            menuPage.checkMenu()            
        })
    )

    qase(13,
        it('Akses halaman konsep naskah', () => {
            menuPage.goToKonsepNaskah()
        })
    )

    qase(15,
        it('Akses halaman kotak masuk review naskah', () => {
            menuPage.goToKotakMasukReviewNaskah()
        })
    )

    qase(14,
        it('Akses halaman kotak masuk tindak lanjut', () => {
            menuPage.goToKotakMasukTindakLanjut()
        })
    )

    qase(16,
        it('Akses halaman kotak keluar review naskah', () => {
            menuPage.goToKotakKeluarReviewNaskah()
        })
    )

    qase(284,
        it('Akses halaman kotak keluar tindak lanjut', () => {
            menuPage.goToKotakKeluarTindakLanjut()
        })
    )
})