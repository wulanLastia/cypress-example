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

before(() => {
    loginPage.loginViaV1(user.nip_konseptor_1, user.password)
    loginPage.directLogin()
})

describe('Menu Positif Skenario', { testIsolation: false }, () => {

    qase(1,
        it('Cek detail navbar', () => {
            menuPage.checkProfile('Vita Putri Utami, S.Sos., M.I.Kom', 'Arsiparis Ahli Muda')
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
            menuPage.goToKotakMasukReviewNaskah()
        })
    )

    qase(15,
        it('Akses halaman kotak masuk review naskah', () => {
            menuPage.goToKotakMasukReviewNaskah()
        })
    )

    qase(14,
        it.skip('Akses halaman kotak masuk tindak lanjut', () => {
            menuPage.goToKotakMasukTindakLanjut()
        })
    )

    qase(16,
        it('Akses halaman kotak keluar review naskah', () => {
            menuPage.goToKotakKeluarReviewNaskah()
        })
    )

    qase(284,
        it.skip('Akses halaman kotak keluar tindak lanjut', () => {
            menuPage.goToKotakKeluarTindakLanjut()
        })
    )

    qase(622,
        it.skip('Akses Sidebar V1 ketika user tidak login di Sidebar V1', () => {
            menuPage.goToSidebarV1()
            loginPage.navigateLoginPageV2()
        })
    )

    qase(3466,
        it('Cek tampilan icon sertifikat elektronik jika SE aktif', () => {
            menuPage.checkIconSE('Aktif')
        })
    )

    qase(3468,
        it('Cek tampilan icon sertifikat elektronik saat di hover jika SE aktif', () => {
            menuPage.checkHoverIconSE('Aktif')
        })
    )

    qase(3474,
        it('Cek tampilan icon BSRE jika BSRE aktif', () => {
            menuPage.checkIconBSRE('Aktif')
        })
    )

    qase(3476,
        it('Cek tampilan icon BSRE saat di hover jika BSRE aktif', () => {
            menuPage.checkHoverIconBSRE('Aktif')
        })
    )
    
})