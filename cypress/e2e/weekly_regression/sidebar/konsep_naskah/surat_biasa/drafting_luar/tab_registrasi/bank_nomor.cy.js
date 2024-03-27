import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../../../../support/pages/auth/login.cy"
import { TabRegistrasiPage } from "../../../../../../../support/pages/sidebar/konsep_naskah/drafting_luar/tab_registrasi.cy"
import { UploadSingleFilePage } from "../../../../../../../support/pages/sidebar/konsep_naskah/drafting_luar/pgs_upload_single_file.cy"

let uploadSingleFilePage = new UploadSingleFilePage()
let tabRegistrasiPage = new TabRegistrasiPage()
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

describe('Drafting Luar - Test Case Tab Registrasi Bank Nomor', { testIsolation: false }, () => {

    qase([2663, 2708],
        it('Cek tab registrasi sebelum melakukan upload file', () => {
            // Go To Konsep Naskah Surat Biasa
            uploadSingleFilePage.goToUploadSingleFileSuratBiasa()

            // Cek tab registrasi
            uploadSingleFilePage.checkTabRegistrasi('Before')
        })
    )

    qase([2715, 2709],
        it('Cek tab registrasi setelah melakukan upload file', () => {
            // Upload File
            uploadSingleFilePage.uploadSingleFile('positif')
            uploadSingleFilePage.checkDataFileUpload()

            // Cek tab registrasi
            uploadSingleFilePage.checkTabRegistrasi('After')
        })
    )

    qase(2713,
        it('Cek field nomor urut jika user belum memilih dropdown bank nomor', () => {
            // Click tab registrasi
            tabRegistrasiPage.clickTabRegistrasi()

            // Cek field nomor urut
            tabRegistrasiPage.checkFieldNomorUrut('none')
        })
    )

    qase(2714,
        it('Cek field nomor urut jika user memilih bank nomor "lainnya"', () => {
            // Cek field nomor urut 
            tabRegistrasiPage.checkFieldNomorUrut('lainnya')
        })
    )

    qase(2712,
        it('Cek kesesuaian nomor urut yang tampil setelah user memilih dropdown bank nomor', () => {
            // Input nomor urut
            tabRegistrasiPage.inputNomorUrut('2')
        })
    )

    qase(2751,
        it('Tidak memilih kode klasifikasi ketika submit form', () => {
            // Cek tombol kirim
            tabRegistrasiPage.checkBtnSubmit()
        })
    )

    qase(2754,
        it('Search kode klasifikasi', () => {
            // Search Kode
            tabRegistrasiPage.searchKodeKlasifikasi('SK (Semua Klasifikasi)')
        })
    )

    qase(2753,
        it('Batal memilih kode klasifikasi surat', () => {
            // Batal memilih kode
            tabRegistrasiPage.batalKodeKlasifikasi()
        })
    )

    qase([2754, 2752],
        it('Cek preview setelah memilih kode klasifikasi', () => {
            // Search Kode
            tabRegistrasiPage.searchKodeKlasifikasi('SK (Semua Klasifikasi)')

            // Cek hasil pemilihan kode
            tabRegistrasiPage.checkKodeKlasifikasi('SK (Semua Klasifikasi)')
        })
    )

    qase(2762,
        it('Leave the field empty when submitting the form', () => {
            // Cek tombol kirim
            tabRegistrasiPage.checkBtnSubmit()
        })
    )

    qase(2759,
        it('Input tag script', () => {
            // Input tag script
            tabRegistrasiPage.inputUnitPengolah('<script>alert("hai")</script>', 'scriptalerthaiscript')
        })
    )

    qase(2760,
        it('Input tag html', () => {
            // Input tag html
            tabRegistrasiPage.inputUnitPengolah('<html>Hello Word</html>', 'htmlHello Wordhtml')
        })
    )

    qase(2766,
        it('Check on preview page after input unit pengolah', () => {
            // Input unit pengolah
            tabRegistrasiPage.inputUnitPengolah('PAD', 'PAD')
        })
    )

})