import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../../../../support/pages/auth/login.cy"
import { ListNaskahSuratBiasaPage } from "../../../../../../../support/pages/sidebar/konsep_naskah/drafting_luar/list_jenis_naskah.cy"

let listNaskahSuratBiasaPage = new ListNaskahSuratBiasaPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

before(() => {
    loginPage.loginViaV1(user.nip_konseptor_2, user.password)
    loginPage.directLogin()
})

after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})

describe('Drafting Luar - Test Case List Jenis Naskah', { testIsolation: false }, () => {

    qase(1825,
        it('Mengakses halaman konsep naskah', () => {
            listNaskahSuratBiasaPage.goToKonsepNaskahSuratBiasa()
            listNaskahSuratBiasaPage.batalDrafting()
        })
    )

    qase(1823,
        it('Scroll list semua template', () => {
            listNaskahSuratBiasaPage.scrollListDown()
            listNaskahSuratBiasaPage.scrollListUp()
        })
    )

    qase(1826,
        it('Cek kesesuaian button Buat Draft jika naskah termasuk drafting dalam', () => {
            listNaskahSuratBiasaPage.checkButtonBuatDraft()
        })
    )

    qase(2651,
        it('Cek kesesuaian flag Multifile jika naskah dapat melakukan upload multifile', () => {
            listNaskahSuratBiasaPage.checkFlagMultifile()
        })
    )

    qase(2652,
        it('Cek kesesuaian flag eMaterai jika naskah mengharuskan membubukan ematerai', () => {
            listNaskahSuratBiasaPage.checkFlagEmaterai()
        })
    )

    qase(2696,
        it('Cek redirect halaman buat naskah pada jenis naskah surat biasa', () => {
            listNaskahSuratBiasaPage.checkDirectSuratBiasa()
            listNaskahSuratBiasaPage.batalDrafting()
        })
    )

    qase(2695,
        it('Cek redirect halaman buat naskah pada jenis naskah nota dinas', () => {
            listNaskahSuratBiasaPage.checkDirectNotaDinas()
            listNaskahSuratBiasaPage.batalDraftingNotaDinas()
        })
    )

    qase(2676,
        it('Melakukan unduh template berdasarkan jenis naskah berita acara', () => {
            listNaskahSuratBiasaPage.downloadFile('BERITA_ACARA')
        })
    )

    qase(2674,
        it('Melakukan unduh template berdasarkan jenis naskah berita acara gubernur', () => {
            listNaskahSuratBiasaPage.downloadFile('BERITA_ACARA_GUBERNUR')
        })
    )

    qase(2675,
        it('Melakukan unduh template berdasarkan jenis naskah daftar hadir', () => {
            listNaskahSuratBiasaPage.downloadFile('DAFTAR_HADIR')
        })
    )

    qase(2684,
        it('Melakukan unduh template berdasarkan jenis naskah Laporan', () => {
            listNaskahSuratBiasaPage.downloadFile('LAPORAN')
        })
    )

    qase(2685,
        it('Melakukan unduh template berdasarkan jenis naskah Laporan Gubernur', () => {
            listNaskahSuratBiasaPage.downloadFile('LAPORAN_GUBERNUR')
        })
    )

    qase(2698,
        it('Melakukan unduh template berdasarkan jenis naskah pengumuman', () => {
            listNaskahSuratBiasaPage.downloadFile('PENGUMUMAN')
        })
    )

    qase(1828,
        it('Melakukan unduh template berdasarkan jenis naskah surat biasa', () => {
            listNaskahSuratBiasaPage.downloadFile('SURAT_BIASA')
        })
    )

    qase(2655,
        it('Melakukan unduh template berdasarkan jenis naskah surat izin', () => {
            listNaskahSuratBiasaPage.downloadFile('SURAT_IZIN')
        })
    )

    qase(2699,
        it('Melakukan unduh template berdasarkan jenis naskah surat rekomendasi', () => {
            listNaskahSuratBiasaPage.downloadFile('SURAT_REKOMENDASI')
        })
    )

    qase(2700,
        it('Melakukan unduh template berdasarkan jenis naskah telaah staff', () => {
            listNaskahSuratBiasaPage.downloadFile('TELAAHAN_STAF')
        })
    )
})