/// <reference types="cypress"/>
import { qase } from 'cypress-qase-reporter/dist/mocha';
import { MenuPage } from "../../support/pageObjects/sidebar/sidebar_menu.cy"
import { LoginPage } from "../../support/pageObjects/auth/auth_login.cy"

let menuPage = new MenuPage()
let loginPage = new LoginPage()
let userDetails

before(() => {
    cy.fixture('credentials.json').then((user) => {
        userDetails = user
    })
})

describe('Menu Skenario', () => {
    qase(1,
        it('Cek detail navbar', () => {
            loginPage.loginSampleKonseptor(userDetails.username, userDetails.password)
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
    
    qase(12,
        it('Akses halaman dashboard', () => {
            menuPage.goToDashboard()
        })
    )

    qase(13,
        it('Akses halaman konsep naskah', () => {
            menuPage.goToKonsepNaskah()
        })
    )

    qase(14,
        it('Akses halaman tindak lanjut', () => {
            menuPage.goToTindakLanjut()
        })
    )

    qase(15,
        it('Akses halaman belum direview', () => {
            menuPage.goToBelumDireview()
        })
    )

    qase(16,
        it('Akses halaman kotak keluar', () => {
            menuPage.goToKotakKeluar()
        })
    )

    qase(17,
        it('Akses halaman tanda tangan', () => {
            menuPage.goToTandaTangan()
        })
    )
})