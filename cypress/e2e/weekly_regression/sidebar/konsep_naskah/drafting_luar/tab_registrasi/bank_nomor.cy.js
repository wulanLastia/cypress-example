import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { TabRegistrasiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tab_registrasi.cy"
import { UploadSingleFilePage } from "@pages/sidebar/konsep_naskah/drafting_luar/pgs_upload_single_file.cy"

let uploadSingleFilePage = new UploadSingleFilePage()
let tabRegistrasiPage = new TabRegistrasiPage()
let loginPage = new LoginPage()
let user

Cypress.on('uncaught:exception', (err, runnable) => {
    // Jika terdapat error 'uncaught:exception' pada Headless Mode
    if (err.message.includes('postMessage')) {
        return false; // return false digunakan untuk skip error pada Headless Mode
    }

    // throw error untuk exceptions lain bila terdapat error lainnya selain 'uncaught:exception'
    throw err;
});

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

    qase([4289, 3878],
        it('Cek tab registrasi sebelum melakukan upload file', () => {
            // Go To Konsep Naskah Surat Biasa
            uploadSingleFilePage.goToUploadSingleFileSuratBiasa()

            // Cek tab registrasi
            uploadSingleFilePage.checkTabRegistrasi('Before')
        })
    )

    qase([3879, 3879],
        it('Cek tab registrasi setelah melakukan upload file', () => {
            // Upload File
            uploadSingleFilePage.uploadSingleFile('positif')
            uploadSingleFilePage.checkDataFileUpload()

            // Cek tab registrasi
            uploadSingleFilePage.checkTabRegistrasi('After')
        })
    )

    qase(3883,
        it('Cek field nomor urut jika user belum memilih dropdown bank nomor', () => {
            // Click tab registrasi
            tabRegistrasiPage.clickTabRegistrasi()

            // Cek field nomor urut
            tabRegistrasiPage.checkFieldNomorUrut('none')
        })
    )

    qase(3884,
        it('Cek field nomor urut jika user memilih bank nomor "lainnya"', () => {
            // Cek field nomor urut 
            tabRegistrasiPage.checkFieldNomorUrut('lainnya')
        })
    )

    qase(3882,
        it('Cek kesesuaian nomor urut yang tampil setelah user memilih dropdown bank nomor', () => {
            // Input nomor urut
            tabRegistrasiPage.inputNomorUrut('2')
        })
    )

    qase(3907,
        it('Tidak memilih kode klasifikasi ketika submit form', () => {
            // Cek tombol kirim
            tabRegistrasiPage.checkBtnSubmit()
        })
    )

    qase(3910,
        it('Search kode klasifikasi', () => {
            // Search Kode
            tabRegistrasiPage.searchKodeKlasifikasi('SK (Semua Klasifikasi)')
        })
    )

    qase(3909,
        it('Batal memilih kode klasifikasi surat', () => {
            // Batal memilih kode
            tabRegistrasiPage.batalKodeKlasifikasi()
        })
    )

    qase([3910, 3908],
        it('Cek preview setelah memilih kode klasifikasi', () => {
            // Search Kode
            tabRegistrasiPage.searchKodeKlasifikasi('SK (Semua Klasifikasi)')

            // Cek hasil pemilihan kode
            tabRegistrasiPage.checkKodeKlasifikasi('SK (Semua Klasifikasi)')
        })
    )

    qase(3918,
        it('Leave the field empty when submitting the form', () => {
            // Cek tombol kirim
            tabRegistrasiPage.checkBtnSubmit()
        })
    )

    qase(3989,
        it('Input tag script', () => {
            // Input tag script
            tabRegistrasiPage.inputUnitPengolah('<script>alert("hai")</script>', 'scriptalerthaiscript')
        })
    )

    qase(3916,
        it('Input tag html', () => {
            // Input tag html
            tabRegistrasiPage.inputUnitPengolah('<html>Hello Word</html>', 'htmlHello Wordhtml')
        })
    )

    qase(3922,
        it('Check on preview page after input unit pengolah', () => {
            // Input unit pengolah
            tabRegistrasiPage.inputUnitPengolah('PAD', 'PAD')
        })
    )

})