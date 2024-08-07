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

describe('Drafting Luar - Test Case Tab Registrasi Tujuan Surat', { testIsolation: false }, () => {

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

    // KEPADA YTH //
    qase(3918,
        it('Leave the field empty when submitting the form (Distribusi toggle on)', () => {
            // Distribusikan surat
            tabRegistrasiPage.activateToggleDistribusi()

            // Cek tombol kirim
            tabRegistrasiPage.checkBtnSubmit()
        })
    )

    qase(4060,
        it('Select tujuan from dropdown list', () => {
            // Input tujuan from dropdown
            tabRegistrasiPage.inputTujuan('staging', '0', 'internal', '')
        })
    )

    qase(4055,
        it('Delete tujuan', () => {
            // Delete tujuan
            tabRegistrasiPage.deleteTujuan()
        })
    )

    qase(4051,
        it('Check on preview page after input tujuan', () => {
            // Input tujuan from input field
            tabRegistrasiPage.inputTujuan('staging', '0', 'internal', 'Dra. Hj. I GUSTI AGUNG')
        })
    )

    qase(4054,
        it('Add tujuan', () => {
            // Add more tujuan
            tabRegistrasiPage.addMoreTujuan()
        })
    )

    qase(4061,
        it('Input free text', () => {
            // Input tujuan eksternal
            tabRegistrasiPage.inputTujuan('staging', '1', 'eksternal', 'Tujuan Eksternal')
        })
    )

    // TEMBUSAN //
    qase(3952,
        it('Leave the field empty when submitting the form', () => {
            // Cek tombol kirim
            tabRegistrasiPage.checkBtnSubmit()
        })
    )

    qase(4650,
        it('Check on preview page after select tembusan', () => {
            // Input tembusan from dropdown
            tabRegistrasiPage.inputTembusan('staging', '0', 'internal', '')
        })
    )

    qase(4651,
        it('Add tembusan', () => {
            // Add more tembusan
            tabRegistrasiPage.addMoreTembusan()
        })
    )

    qase(4656,
        it('Check on preview page after input tembusan', () => {
            // Input tembusan from input field
            tabRegistrasiPage.inputTembusan('staging', '1', 'eksternal', 'Tembusan Eksternal 1')
        })
    )

    qase(4652,
        it('Delete tembusan', () => {
            // Delete tembusan
            tabRegistrasiPage.deleteTembusan()
        })
    )
})