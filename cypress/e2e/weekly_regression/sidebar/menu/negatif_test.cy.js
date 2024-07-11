import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { MenuPage } from "@pages/sidebar/menu/menu.cy"

let menuPage = new MenuPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })
})

describe('Menu Negatif Skenario', { testIsolation: false }, () => {

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

    qase(3467,
        it('Cek tampilan icon sertifikat elektronik jika SE tidak aktif', () => {
            // Login
            loginPage.loginViaV1(user.user_not_registered, user.password)
            loginPage.directLogin()

            menuPage.checkIconSE('Tidak Aktif')
        })
    )

    qase(3470,
        it('Cek tampilan icon sertifikat elektronik saat di hover jika SE tidak aktif', () => {
            menuPage.checkHoverIconSE('Tidak Aktif')
        })
    )

    // TODO : Di uncomment di card selanjutnya
    // qase(3475,
    //     it('Cek tampilan icon BSRE jika BSRE tidak aktif', () => {
    //         menuPage.checkIconBSRE('Tidak Aktif')
    //     })
    // )

    // qase(3477,
    //     it('Cek tampilan icon BSRE saat di hover jika BSRE tidak aktif', () => {
    //         menuPage.checkHoverIconBSRE('Tidak Aktif')
    //     })
    // )

})