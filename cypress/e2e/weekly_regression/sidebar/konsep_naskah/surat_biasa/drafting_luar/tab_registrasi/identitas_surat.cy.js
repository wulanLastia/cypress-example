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

describe('Drafting Luar - Test Case Tab Registrasi Identitas Surat', { testIsolation: false }, () => {

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

    qase([2949, 2952, 2960],
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
    qase(2875,
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

    qase(2873,
        it('Input tag html', () => {
            // Input tag html
            tabRegistrasiPage.inputPerihal('<html>Hello Word</html>', '<html>Hello Word</html>')
        })
    )

    qase(2879,
        it('Check on preview page after input perihal', () => {
            const uuid = () => Cypress._.random(0, 1e6)
            const id = uuid()

            // Input perihal
            tabRegistrasiPage.inputPerihal('Drafting Luar ' + id, 'Drafting Luar ' + id)
        })
    )

    // KOLOM URGENSI //
    qase(2867,
        it('Cek warna label urgensi amat segera', () => {
            tabRegistrasiPage.checkWarnaLabelUrgensi('Amat Segera', '0')
        })
    )

    qase(2869,
        it('Cek warna label urgensi penting', () => {
            tabRegistrasiPage.checkWarnaLabelUrgensi('Penting', '2')
        })
    )

    qase(2870,
        it('Cek warna label urgensi biasa', () => {
            tabRegistrasiPage.checkWarnaLabelUrgensi('Biasa', '1')
        })
    )

    qase(2868,
        it('Cek warna label urgensi segera', () => {
            tabRegistrasiPage.checkWarnaLabelUrgensi('Segera', '3')
        })
    )

    // SIFAT SURAT //
    qase(2882,
        it('Tidak memilih sifat ketika submit form', () => {
            // Cek tombol kirim
            tabRegistrasiPage.checkBtnSubmit()
        })
    )

    qase(2883,
        it('Cek preview setelah memilih sifat', () => {
            // Input perihal
            tabRegistrasiPage.inputSifat('0')
        })
    )
})