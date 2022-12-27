/// <reference types="cypress"/>
import { qase } from 'cypress-qase-reporter/dist/mocha';
import { MenuPage } from "../../support/pageObjects/sidebar/sidebar_menu.cy"
import { PilihSuratPage } from "../../support/pageObjects/sidebar/pilih_surat.cy"
import { LoginPage } from "../../support/pageObjects/auth/auth_login.cy"

let menuPage = new MenuPage()
let pilihSuratPage = new PilihSuratPage()
let loginPage = new LoginPage()
let userDetails

before(() => {
    cy.fixture('credentials.json').then((user) => {
        userDetails = user
    })
})

describe('Pilih Surat', () => {
    qase(6,
        it('Cek nama pada profil', () => {
            loginPage.loginSampleKonseptor(userDetails.username, userDetails.password)
            menuPage.checkProfile()
        })
    )

    qase(18,
        it('Cek detail container buat naskah baru', () => {
            pilihSuratPage.goToKonsepNaskah()
        })
    )

    qase(70,
        it('Cek detail halaman drafting konsep naskah surat biasa', () => {
            pilihSuratPage.openSuratBiasa()
        })
    )

    qase(80,
        it('Kirim drafting naskah surat biasa', () => {
            pilihSuratPage.kirimNaskahSuratBiasa()
        })
    )

    qase(77,
        it('Melanjutkan drafting konsep naskah', () => {
            pilihSuratPage.openSuratBiasa()
            pilihSuratPage.lanjutDrafting()
        })
    )

    qase(76,
        it('Batal drafting konsep naskah', () => {
            pilihSuratPage.batalDrafting()
        })
    )

    qase(105,
        it('Hapus lampiran drafting surat biasa', () => {
            pilihSuratPage.openSuratBiasa()
            pilihSuratPage.hapusLampiran()
        })
    )

    qase(104,
        it('Tambah lampiran drafting surat biasa', () => {
            pilihSuratPage.tambahLampiran()
        })
    )
    
})