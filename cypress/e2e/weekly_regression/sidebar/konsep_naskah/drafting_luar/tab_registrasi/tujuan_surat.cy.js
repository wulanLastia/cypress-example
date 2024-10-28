import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { TabRegistrasiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tab_registrasi.cy"
import { UploadSingleFilePage } from "@pages/sidebar/konsep_naskah/drafting_luar/pgs_upload_single_file.cy"

let uploadSingleFilePage = new UploadSingleFilePage()
let tabRegistrasiPage = new TabRegistrasiPage()
let loginPage = new LoginPage()
let user
let data_temp

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

    cy.fixture('non_cred/drafting_luar/master_data/create_data.json').then((data) => {
        data_temp = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

before(() => {
    loginPage.loginViaV1(user.nip_konseptor_2, user.password)
    loginPage.directLogin()
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
            uploadSingleFilePage.uploadSingleFile(data_temp.upload[0].upload1)
            uploadSingleFilePage.checkDataFileUpload()

            // Click tab registrasi
            tabRegistrasiPage.clickTabRegistrasi()
        })
    )

    // LINTAS DINAS - KEPADA YTH //
    qase(4047,
        it('Leave the field empty when submitting the form', () => {
            // Cek tombol kirim
            tabRegistrasiPage.checkBtnSubmit()
        })
    )

    qase(4227,
        it('Click tambah daftar tujuan & tembusan', () => {
            // Tambah daftar tujuan & tembusan
            tabRegistrasiPage.inputTujuanTembusan()
        })
    )

    qase(4229,
        it('Select tujuan/tembusan lintas dinas', () => {
            // Add tujuan Lintas Dinas
            tabRegistrasiPage.selectLintasDinas()
        })
    )

    qase(4060,
        it('Select tujuan from dropdown list', () => {
            // Input tujuan from dropdown
            tabRegistrasiPage.inputTujuan(data_temp.env[0].staging, data_temp.registrasi[3].index0, data_temp.registrasi[4].input_internal, '')
        })
    )

    qase(4051,
        it('Check on preview page after input tujuan', () => {
            // Assertion after input tujuan
            tabRegistrasiPage.assertInputTujuan()
        })
    )

    qase(4055,
        it('Delete tujuan', () => {
            // Delete tujuan
            tabRegistrasiPage.deleteTujuan(data_temp.registrasi[5].tujuan_internal1)
        })
    )

    // TEMBUSAN //
    qase(4650,
        it('Check on preview page after select tembusan', () => {
            // Input tembusan from dropdown
            tabRegistrasiPage.inputTembusan(data_temp.env[0].staging, data_temp.registrasi[3].index0, data_temp.registrasi[4].input_internal, '')
        })
    )

    qase(4656,
        it('Check on preview page after input tembusan', () => {
            // Input tembusan from input field
            tabRegistrasiPage.inputTembusan(data_temp.env[0].staging, data_temp.registrasi[3].index0, data_temp.registrasi[4].input_internal, data_temp.registrasi[6].tembusan_eksternal3)
        })
    )

    qase(4651,
        it('Add tembusan', () => {
            // Add more tembusan
            tabRegistrasiPage.addMoreTembusan()
        })
    )

    qase(4652,
        it('Delete tembusan', () => {
            // Delete tembusan
            tabRegistrasiPage.deleteTembusan(data_temp.registrasi[6].tembusan_internal1)
        })
    )

    qase(3952,
        it('Leave the field empty when submitting the form', () => {
            // Cancel input tujuan tembusan
            tabRegistrasiPage.batalTujuanTembusan()

            // Cek tombol kirim
            tabRegistrasiPage.checkBtnSubmit()
        })
    )
    
    qase(4231,
        it('Select tujuan/tembusan tidak didistribusikan', () => {
            // Tambah daftar tujuan & tembusan
            tabRegistrasiPage.inputTujuanTembusan()

            // Select tujuan/tembusan tidak didistribusikan
            tabRegistrasiPage.selectTidakDidistribusikan()
        })
    )

    qase(4061,
        it('Input free text', () => {
            // Input tujuan from input field
            tabRegistrasiPage.inputTujuanTidakDidistribusikan([data_temp.registrasi[5].tujuan_internal1], [])
        })
    )
})