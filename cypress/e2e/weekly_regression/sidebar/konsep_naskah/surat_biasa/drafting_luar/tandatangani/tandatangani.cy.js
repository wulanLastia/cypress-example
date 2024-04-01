import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../../../../support/pages/auth/login.cy"
import { TabRegistrasiPage } from "../../../../../../../support/pages/sidebar/konsep_naskah/drafting_luar/tab_registrasi.cy"
import { UploadSingleFilePage } from "../../../../../../../support/pages/sidebar/konsep_naskah/drafting_luar/pgs_upload_single_file.cy"
import { TandatanganiPage } from "../../../../../../../support/pages/sidebar/konsep_naskah/drafting_luar/tandatangani.cy"

let uploadSingleFilePage = new UploadSingleFilePage()
let tabRegistrasiPage = new TabRegistrasiPage()
let tandatanganiPage = new TandatanganiPage()
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

describe('Drafting Luar - Test Case Tandatangani (Penandatangan Diri Sendiri)', { testIsolation: false }, () => {

    qase([2663, 2708],
        it('Cek tab registrasi sebelum melakukan upload file', () => {
            // Go To Konsep Naskah Surat Biasa
            uploadSingleFilePage.goToUploadSingleFileSuratBiasa()

            // Cek tab registrasi
            uploadSingleFilePage.checkTabRegistrasi('Before')
        })
    )

    qase(2715,
        it('Cek tab registrasi setelah melakukan upload file', () => {
            // Upload File
            uploadSingleFilePage.uploadSingleFile('positif')
            uploadSingleFilePage.checkDataFileUpload()

            // Click tab registrasi
            tabRegistrasiPage.clickTabRegistrasi()
        })
    )

    qase(2712,
        it('Cek kesesuaian nomor urut yang tampil setelah user memilih dropdown bank nomor', () => {
            // Input nomor urut
            tabRegistrasiPage.inputNomorUrut('2')
        })
    )

    qase(2754,
        it('Search kode klasifikasi', () => {
            // Search Kode
            tabRegistrasiPage.searchKodeKlasifikasi('SK (Semua Klasifikasi)')
        })
    )

    qase(2766,
        it('Check on preview page after input unit pengolah', () => {
            // Input unit pengolah
            tabRegistrasiPage.inputUnitPengolah('PAD', 'PAD')
        })
    )

    qase([2949, 2952, 2960],
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

    qase([2784, 2785, 2792],
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
    qase(2879,
        it('Check on preview page after input perihal', () => {
            const uuid = () => Cypress._.random(0, 1e6)
            const id = uuid()

            // Input perihal
            tabRegistrasiPage.inputPerihal('Automation Drafting Luar ' + id, 'Automation Drafting Luar ' + id)
        })
    )

    // KOLOM URGENSI //
    qase(2867,
        it('Cek warna label urgensi amat segera', () => {
            tabRegistrasiPage.checkWarnaLabelUrgensi('Amat Segera', '0')
        })
    )

    // SIFAT SURAT //
    qase(2883,
        it('Cek preview setelah memilih sifat', () => {
            // Input perihal
            tabRegistrasiPage.inputSifat('0')
        })
    )

    // PENANDATANGAN //
    qase(2925,
        it('Check button tambah penandatangan', () => {
            // Tambah penandatangan
            tabRegistrasiPage.addMorePenandatangan()
        })
    )

    qase(2777,
        it('Check dropdown list if user select diri sendiri', () => {
            // Input penandatangan
            tabRegistrasiPage.inputPenandatanganDiriSendiri()
        })
    )

    qase(2893,
        it('Cek kesesuaian file ketika berhasil melakukan upload file', () => {
            // Upload file
            tabRegistrasiPage.uploadSuratPengantar('positif')
            tabRegistrasiPage.checkDataFileUpload()
        })
    )

    qase(2980,
        it('Cek kesesuaian popup tte naskah', () => {
            // Click btn tte naskah
            tandatanganiPage.tandatanganiNaskah()

            // Check popup
            tandatanganiPage.checkInputDataRegistrasi()
        })
    )

    qase(3016,
        it('Cek tombol tte naskah pada popup konfirmasi', () => {
            // Click btn tte naskah
            tandatanganiPage.tteNaskah()
        })
    )

    qase(3016,
        it('Mengosongkan passphrase dan klik button TTE naskah', () => {
            // Click btn tte naskah
            tandatanganiPage.confirmTteNaskah('negatif')
        })
    )

    qase(3016,
        it('Mengosongkan passphrase dan klik button TTE naskah', () => {
            // Click btn tte naskah
            tandatanganiPage.confirmTteNaskah('negatif')
        })
    )

    qase(2992,
        it('Cek section passphrase TTE', () => {
            // Check input passphrase
            tandatanganiPage.checkInputPassphrase()
        })
    )

    qase(2982,
        it('Cek tombol periksa kembali', () => {
            // Click tombol periksa kembali
            tandatanganiPage.clickBtnPeriksaKembali()
        })
    )

    qase(2982,
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