/// <reference types="cypress"/>
import { qase } from 'cypress-qase-reporter/dist/mocha';
import { MenuPage } from "../../support/pageObjects/sidebar/sidebar_menu.cy"
import { BelumDireviewPage } from "../../support/pageObjects/sidebar/belum_direview.cy"
import { LoginPage } from "../../support/pageObjects/auth/auth_login.cy"

let menuPage = new MenuPage()
let belumDireviewPage = new BelumDireviewPage()
let loginPage = new LoginPage()
let userDetails

before(() => {
    cy.fixture('credentials.json').then((user) => {
        userDetails = user
    })
})

describe('Kotak Masuk (Belum Di-review', () => {
    qase(97,
        it('Akses menu kotak masuk (belum di-review)', () => {
            loginPage.loginSampleKonseptor(userDetails.username, userDetails.password)
            menuPage.checkProfile()
            belumDireviewPage.clickBtnMenuKotakMasukBelumDireview()
        })
    )

    qase(98,
        it('Cek detail halaman naskah kotak masuk belum di-review', () => {
            belumDireviewPage.clickBtnDetailKotakMasukBelumDireview()
        })
    )

    qase(99,
        it('Batal review naskah di kotak masuk', () => {
            belumDireviewPage.clickBack()
        })
    )

    qase(100,
        it('Mengembalikan naskah dari detail surat masuk belum direview', () => {
            belumDireviewPage.clickKembalikanNaskah()
        })
    )

    qase(101,
        it('Batal mengembalikan naskah dari detail surat masuk belum direview', () => {
            belumDireviewPage.clickBatalKembalikanNaskah()
        })
    )

    qase(102,
        it('Aksi setujui dan minta nomor pada detail naskah surat masuk belum di-review', () => {
            belumDireviewPage.clickSetujuiMintaNomor()
        })
    )

    qase(103,
        it('Aksi belum dan periksa kembali pada detail surat masuk belum di-review', () => {
            belumDireviewPage.clickPeriksaKembali()
        })
    )    
})