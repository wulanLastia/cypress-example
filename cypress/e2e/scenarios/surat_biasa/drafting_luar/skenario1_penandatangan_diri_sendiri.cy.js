import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { TabRegistrasiPage } from "../../../../support/pages/sidebar/konsep_naskah/drafting_luar/tab_registrasi.cy"
import { UploadSingleFilePage } from "../../../../support/pages/sidebar/konsep_naskah/drafting_luar/pgs_upload_single_file.cy"
import { TandatanganiPage } from "../../../../support/pages/sidebar/konsep_naskah/drafting_luar/tandatangani.cy"

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
    loginPage.loginViaV1(user.nip_konseptor_1, user.password)
    loginPage.directLogin()
})

after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})

describe('Drafting Luar - Test Case Tandatangani (Penandatangan Diri Sendiri)', { testIsolation: false }, () => {

    qase([2663, 2708, 2715],
        it('Upload naskah single file', () => {
            // Go To Konsep Naskah Surat Biasa
            uploadSingleFilePage.goToUploadSingleFileSuratBiasa()

            // Upload File
            uploadSingleFilePage.uploadSingleFile('positif')
            uploadSingleFilePage.checkDataFileUpload()

            // Click tab registrasi
            tabRegistrasiPage.clickTabRegistrasi()
        })
    )

    qase([2712, 2754, 2766],
        it('Tab Registrasi - Section Bank Nomor', () => {
            // Input nomor urut
            tabRegistrasiPage.inputNomorUrut()

            // Search Kode
            tabRegistrasiPage.searchKodeKlasifikasi('SK (Semua Klasifikasi)')

            // Input unit pengolah
            tabRegistrasiPage.inputUnitPengolah('PAD', 'PAD')
        })
    )

    qase([2949, 2952, 2960, 2784, 2785, 2792],
        it('Tab Registrasi - Section Tujuan Surat', () => {
            // Distribusikan surat
            tabRegistrasiPage.activateToggleDistribusi()

            // Input tujuan from input field
            tabRegistrasiPage.inputTujuan('staging', '0', 'internal', 'Dra. Hj. I GUSTI AGUNG')

            // Add more tujuan
            tabRegistrasiPage.addMoreTujuan()

            // Input tujuan eksternal
            tabRegistrasiPage.inputTujuan('staging', '1', 'eksternal', 'Tujuan Eksternal')

            // Input tembusan from dropdown
            tabRegistrasiPage.inputTembusan('staging', '0', 'internal', 'LUDIA ROSEMA DEWI, S.Kom.')

            // Add more tembusan
            tabRegistrasiPage.addMoreTembusan()

            // Input tembusan from input field
            tabRegistrasiPage.inputTembusan('staging', '1', 'eksternal', 'Tembusan Eksternal 1')
        })
    )

    qase([2879, 2867, 2883],
        it('Tab Registrasi - Section Identitas Surat', () => {
            const uuid = () => Cypress._.random(0, 1e6)
            const id = uuid()

            // Input perihal
            tabRegistrasiPage.inputPerihal('Automation Drafting Luar ' + id, 'Automation Drafting Luar ' + id)

            // Input Urgensi
            tabRegistrasiPage.checkWarnaLabelUrgensi('Amat Segera', '0')

            // Input perihal
            tabRegistrasiPage.inputSifat('0')
        })
    )

    qase([2925, 2777, 2893],
        it('Tab Registrasi - Section Penandatangan', () => {
            // Tambah penandatangan
            tabRegistrasiPage.addMorePenandatangan()

            // Input penandatangan
            tabRegistrasiPage.inputPenandatanganDiriSendiri()

            // Upload file
            tabRegistrasiPage.uploadSuratPengantar('positif')
            tabRegistrasiPage.checkDataFileUpload()
        })
    )

    qase([2980, 3016, 2982],
        it('Melakukan TTE Naskah', () => {
            // Click btn tte naskah
            tandatanganiPage.tandatanganiNaskah()

            // Check popup
            tandatanganiPage.checkInputDataRegistrasi()

            // Click btn tte naskah
            tandatanganiPage.tteNaskah()

            // Confirm tte naskah
            tandatanganiPage.submitTteNaskah(user.passphrase)
        })
    )
})