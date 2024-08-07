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

describe('Drafting Luar - Test Case Tab Registrasi Identitas Surat', { testIsolation: false }, () => {

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

    qase([4051, 4054, 4061],
        it('Check on preview page after input tujuan', () => {
            // Distribusikan surat
            tabRegistrasiPage.activateToggleDistribusi()

            // Input tujuan from input field
            tabRegistrasiPage.inputTujuan('staging', '0', 'internal', 'Dra. Hj. I GUSTI AGUNG')

            // Add more tujuan
            tabRegistrasiPage.addMoreTujuan()

            // Input tujuan from input field
            tabRegistrasiPage.inputTujuan('staging', '1', 'internal', 'LUDIA ROSEMA DEWI, S.Kom.')

            // Add more tujuan
            tabRegistrasiPage.addMoreTujuan()

            // Input tujuan eksternal
            tabRegistrasiPage.inputTujuan('staging', '2', 'eksternal', 'Tujuan Eksternal 1')

            // Add more tujuan
            tabRegistrasiPage.addMoreTujuan()

            // Input tujuan eksternal
            tabRegistrasiPage.inputTujuan('staging', '3', 'eksternal', 'Tujuan Eksternal 1')
        })
    )

    // PERIHAL //
    qase(3992,
        it('Leave the field empty when submitting the form', () => {
            // Cek tombol kirim
            tabRegistrasiPage.checkBtnSubmit()
        })
    )

    qase(2872,
        it('Input tag script', () => {
            // Input tag script
            tabRegistrasiPage.inputPerihal('<script>alert("hai")</script>', '<script>alert("hai")</script>')
        })
    )

    qase(3990,
        it('Input tag html', () => {
            // Input tag html
            tabRegistrasiPage.inputPerihal('<html>Hello Word</html>', '<html>Hello Word</html>')
        })
    )

    qase(3996,
        it('Check on preview page after input perihal', () => {
            const uuid = () => Cypress._.random(0, 1e6)
            const id = uuid()

            // Input perihal
            tabRegistrasiPage.inputPerihal('Drafting Luar ' + id, 'Drafting Luar ' + id)
        })
    )

    // KOLOM URGENSI //
    qase(4122,
        it('Cek warna label urgensi amat segera', () => {
            tabRegistrasiPage.checkWarnaLabelUrgensi('Amat Segera', '0')
        })
    )

    qase(4129,
        it('Cek warna label urgensi penting', () => {
            tabRegistrasiPage.checkWarnaLabelUrgensi('Penting', '2')
        })
    )

    qase(4130,
        it('Cek warna label urgensi biasa', () => {
            tabRegistrasiPage.checkWarnaLabelUrgensi('Biasa', '1')
        })
    )

    qase(4128,
        it('Cek warna label urgensi segera', () => {
            tabRegistrasiPage.checkWarnaLabelUrgensi('Segera', '3')
        })
    )

    // SIFAT SURAT //
    qase(3998,
        it('Tidak memilih sifat ketika submit form', () => {
            // Cek tombol kirim
            tabRegistrasiPage.checkBtnSubmit()
        })
    )

    qase(4123,
        it('Cek preview setelah memilih sifat', () => {
            // Input perihal
            tabRegistrasiPage.inputSifat('0')
        })
    )
})