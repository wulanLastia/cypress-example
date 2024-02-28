import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../../../support/pages/auth/login.cy"
import { TabRegistrasiPage } from "../../../../../../support/pages/sidebar/konsep_naskah/drafting_luar/tab_registrasi.cy"
import { UploadSingleFilePage } from "../../../../../../support/pages/sidebar/konsep_naskah/drafting_luar/pgs_upload_single_file.cy"

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
    loginPage.loginViaV1(user.nip, user.password)
    loginPage.directLogin()
})

/*after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})*/

describe('Drafting Luar - Test Case Tab Registrasi Tujuan Surat', { testIsolation: false }, () => {

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

    qase(2762,
        it('Leave the field empty when submitting the form (Distribusi toggle on)', () => {
            // Distribusikan surat
            tabRegistrasiPage.activateToggleDistribusi()

            // Cek tombol kirim
            tabRegistrasiPage.checkBtnSubmit()
        })
    )

    qase(2959,
        it('Select tujuan from dropdown list', () => {
            // Input tujuan from dropdown
            tabRegistrasiPage.inputTujuan('staging', '0', 'internal', '')
        })
    )

    qase(2953,
        it('Delete tujuan', () => {
            // Delete tujuan
            tabRegistrasiPage.deleteTujuan()
        })
    )

    qase(2949,
        it('Check on preview page after input tujuan', () => {
            // Input tujuan from input field
            tabRegistrasiPage.inputTujuan('staging', '0', 'internal', 'Dra. Hj. I GUSTI AGUNG')
        })
    )

    qase(2952,
        it('Add tujuan', () => {
            // Add more tujuan
            tabRegistrasiPage.addMoreTujuan()
        })
    )

    qase(2960,
        it('Input free text', () => {
            // Input tujuan eksternal
            tabRegistrasiPage.inputTujuan('staging', '1', 'eksternal', 'Tujuan Eksternal')
        })
    )
})