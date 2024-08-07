import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { TabRegistrasiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tab_registrasi.cy"
import { UploadSingleFilePage } from "@pages/sidebar/konsep_naskah/drafting_luar/pgs_upload_single_file.cy"
import { TandatanganiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tandatangani.cy"

let uploadSingleFilePage = new UploadSingleFilePage()
let tabRegistrasiPage = new TabRegistrasiPage()
let tandatanganiPage = new TandatanganiPage()
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

describe('Drafting Luar - Test Case Tandatangani (Penandatangan Diri Sendiri)', { testIsolation: false }, () => {

    qase([4289, 3878],
        it('Cek tab registrasi sebelum melakukan upload file', () => {
            // Go To Konsep Naskah Surat Biasa
            uploadSingleFilePage.goToUploadSingleFileSuratBiasa()

            // Cek tab registrasi
            uploadSingleFilePage.checkTabRegistrasi('Before')
        })
    )

    qase(3879,
        it('Cek tab registrasi setelah melakukan upload file', () => {
            // Upload File
            uploadSingleFilePage.uploadSingleFile('positif')
            uploadSingleFilePage.checkDataFileUpload()

            // Click tab registrasi
            tabRegistrasiPage.clickTabRegistrasi()
        })
    )

    qase(3882,
        it('Cek kesesuaian nomor urut yang tampil setelah user memilih dropdown bank nomor', () => {
            // Input nomor urut
            tabRegistrasiPage.inputNomorUrut('2')
        })
    )

    qase(3910,
        it('Search kode klasifikasi', () => {
            // Search Kode
            tabRegistrasiPage.searchKodeKlasifikasi('SK (Semua Klasifikasi)')
        })
    )

    qase(3922,
        it('Check on preview page after input unit pengolah', () => {
            // Input unit pengolah
            tabRegistrasiPage.inputUnitPengolah('PAD', 'PAD')
        })
    )

    qase([4051, 4054, 4061],
        it('Check on preview page after input tujuan', () => {
            // Distribusikan surat
            tabRegistrasiPage.activateToggleDistribusi()

            // Input tujuan from input field
            tabRegistrasiPage.inputTujuan('staging', '0', 'internal', 'Dra. Hj. I GUSTI AGUNG')

            // Add more tujuan
            tabRegistrasiPage.addMoreTujuan()

            // Input tujuan eksternal
            tabRegistrasiPage.inputTujuan('staging', '1', 'eksternal', 'Tujuan Eksternal')
        })
    )

    qase([4650, 4651, 4656],
        it('Check on preview page after select tembusan', () => {
            // Input tembusan from dropdown
            tabRegistrasiPage.inputTembusan('staging', '0', 'internal', 'LUDIA ROSEMA DEWI, S.Kom.')

            // Add more tembusan
            tabRegistrasiPage.addMoreTembusan()

            // Input tembusan from input field
            tabRegistrasiPage.inputTembusan('staging', '1', 'eksternal', 'Tembusan Eksternal 1')
        })
    )

    // PERIHAL //
    qase(3996,
        it('Check on preview page after input perihal', () => {
            const uuid = () => Cypress._.random(0, 1e6)
            const id = uuid()

            // Input perihal
            tabRegistrasiPage.inputPerihal('Automation Drafting Luar ' + id, 'Automation Drafting Luar ' + id)
        })
    )

    // KOLOM URGENSI //
    qase(4122,
        it('Cek dropdown pilihan amat segera', () => {
            tabRegistrasiPage.checkWarnaLabelUrgensi('Amat Segera', '0')
        })
    )

    // SIFAT SURAT //
    qase(4123,
        it('Cek dropdown pilihan sifat biasa', () => {
            // Input sifat
            tabRegistrasiPage.inputSifat('0')
        })
    )

    // PENANDATANGAN //
    qase(4035,
        it('Check button tambah penandatangan', () => {
            // Tambah penandatangan
            tabRegistrasiPage.addMorePenandatangan()
        })
    )

    qase(3930,
        it('Show user login info if user select penandatangan diri sendiri', () => {
            // Input penandatangan
            tabRegistrasiPage.inputPenandatanganDiriSendiri()
        })
    )

    qase(4008,
        it('Cek kesesuaian file ketika berhasil melakukan upload file', () => {
            // Upload file
            tabRegistrasiPage.uploadSuratPengantar('positif')
            tabRegistrasiPage.checkDataFileUpload()
        })
    )

    qase(4078,
        it('Cek kesesuaian popup tte naskah', () => {
            // Click btn tte naskah
            tandatanganiPage.tandatanganiNaskah()

            // Check popup
            tandatanganiPage.checkInputDataRegistrasi()
        })
    )

    qase(4097,
        it('Cek tombol tte naskah pada popup konfirmasi', () => {
            // Click btn tte naskah
            tandatanganiPage.tteNaskah()
        })
    )

    qase(4079,
        it('Mengosongkan passphrase dan klik button TTE naskah', () => {
            // Click btn tte naskah
            tandatanganiPage.confirmTteNaskah('negatif')
        })
    )

    qase(4085,
        it('Cek section passphrase TTE', () => {
            // Check input passphrase
            tandatanganiPage.checkInputPassphrase()
        })
    )

    qase(4080,
        it('Cek tombol periksa kembali', () => {
            // Click tombol periksa kembali
            tandatanganiPage.clickBtnPeriksaKembali()
        })
    )

    qase(4082,
        it('Cek jika berhasil tandatangani naskah', () => {
            // Click btn tte naskah
            tandatanganiPage.tandatanganiNaskah()

            // Click btn tte naskah
            tandatanganiPage.tteNaskah()

            // Confirm tte naskah
            tandatanganiPage.submitTteNaskah(user.passphrase, 'staging')
        })
    )
})