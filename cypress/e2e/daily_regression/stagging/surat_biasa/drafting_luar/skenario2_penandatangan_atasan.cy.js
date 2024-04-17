import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../../support/pages/auth/login.cy"
import { TabRegistrasiPage } from "../../../../../support/pages/sidebar/konsep_naskah/drafting_luar/tab_registrasi.cy"
import { UploadSingleFilePage } from "../../../../../support/pages/sidebar/konsep_naskah/drafting_luar/pgs_upload_single_file.cy"
import { TandatanganiPage } from "../../../../../support/pages/sidebar/konsep_naskah/drafting_luar/tandatangani.cy"
import { KotakKeluarPage } from "../../../../../support/pages/sidebar/konsep_naskah/drafting_luar/kotak_keluar.cy"
import { KotakMasukPage } from "../../../../../support/pages/sidebar/konsep_naskah/drafting_luar/kotak_masuk.cy"

let uploadSingleFilePage = new UploadSingleFilePage()
let tabRegistrasiPage = new TabRegistrasiPage()
let tandatanganiPage = new TandatanganiPage()
let kotakKeluarPage = new KotakKeluarPage()
let kotakMasukPage = new KotakMasukPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})

describe('Drafting Luar - Skenario Penandatangan Atasan', { testIsolation: false }, () => {

    qase([2663, 2708, 2715, 2712, 2754, 2766, 2949, 2952, 2960, 2784, 2785, 2792, 2879, 2867, 2883, 2925, 2777, 2893, 2980, 3016, 2982],
        it('Upload dan registrasi naskah single file', () => {
            // Login 
            loginPage.loginViaV1(user.nip_konseptor_2, user.password)
            loginPage.directLogin()

            // Go To Konsep Naskah Sasaran Kinerja Pegawai (SKP)
            uploadSingleFilePage.goToUploadSingleFileSkp()

            // Upload File
            uploadSingleFilePage.uploadSingleFile('positif')
            uploadSingleFilePage.checkDataFileUpload()

            // Click tab registrasi
            tabRegistrasiPage.clickTabRegistrasi()

            // Tab Registrasi - Bank Nomor
            tabRegistrasiPage.inputNomorUrut('2')
            tabRegistrasiPage.searchKodeKlasifikasi('SK (Semua Klasifikasi)')
            tabRegistrasiPage.inputUnitPengolah('PAD', 'PAD')

            // Tab Registrasi - Tujuan Surat
            tabRegistrasiPage.activateToggleDistribusi()
            tabRegistrasiPage.inputTujuan('staging', '0', 'internal', 'Dr. IKA MARDIAH, M.Si.')
            tabRegistrasiPage.addMoreTujuan()
            tabRegistrasiPage.inputTujuan('staging', '1', 'eksternal', 'Tujuan Eksternal')
            tabRegistrasiPage.inputTembusan('staging', '0', 'internal', 'RIZKI HUSTINIASARI, S.T., M.T.')
            tabRegistrasiPage.addMoreTembusan()
            tabRegistrasiPage.inputTembusan('staging', '1', 'eksternal', 'Tembusan Eksternal 1')

            // Tab Registrasi - Section Identitas Surat
            const uuid = () => Cypress._.random(0, 1e6)
            const id = uuid()

            tabRegistrasiPage.inputPerihal('Automation Drafting Luar ' + id, 'Automation Drafting Luar ' + id)
            tabRegistrasiPage.checkWarnaLabelUrgensi('Amat Segera', '0')
            tabRegistrasiPage.inputSifat('1')

            // Tab Registrasi - Section Penandatangan
            tabRegistrasiPage.addMorePenandatangan()
            tabRegistrasiPage.inputPenandatanganDiriSendiri()
            tabRegistrasiPage.addMorePenandatangan()
            tabRegistrasiPage.inputPenandatanganAtasan('RIZKI HUSTINIASARI, S.T., M.T.', 'staging')

            // Upload file pengantar
            tabRegistrasiPage.uploadSuratPengantar('positif')
            tabRegistrasiPage.checkDataFileUpload()

            // Melakukan TTE Naskah (Penandatangan Diri Sendiri)
            tandatanganiPage.tandatanganiNaskah()
            tandatanganiPage.checkInputDataRegistrasi()
            tandatanganiPage.tteNaskah()
            tandatanganiPage.submitTteNaskah(user.passphrase, 'staging')

            // Check Naskah Di Kotak Keluar
            kotakKeluarPage.goToKotakKeluarTTEReview()
            kotakKeluarPage.checkNaskahKotakKeluar()
        })
    )

    qase([],
        it('Tandatangani Naskah Penandatangan Atasan', () => {
            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_2_1, user.password)
            loginPage.directLogin()

            // Tandatangani Naskah
            kotakMasukPage.goToKotakMasukTTEReview()
            kotakMasukPage.checkNaskahKotakMasuk()

            // Melakukan TTE Naskah (Penandatangan Atasan)
            tandatanganiPage.tandatanganiNaskahAtasan()
            tandatanganiPage.tteNaskahAtasan()
            tandatanganiPage.submitTteNaskah(user.passphrase, 'staging')
        })
    )
})