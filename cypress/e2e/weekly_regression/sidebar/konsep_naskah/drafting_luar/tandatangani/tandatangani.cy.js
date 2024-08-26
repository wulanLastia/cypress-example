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

describe('Drafting Luar - Test Case Tandatangani (Penandatangan Diri Sendiri)', { testIsolation: false }, () => {

    qase([4289, 3878, 3879, 3882, 3910, 3922, 4051, 4054, 4061, 4650, 4651, 4656, 3996, 4122, 4123, 4035, 3930, 4008],
        it('Upload dan registrasi naskah single file', () => {
            // Login 
            loginPage.loginViaV1(user.nip_konseptor_2, user.password)
            loginPage.directLogin()

            // Go To Konsep Naskah SKP
            uploadSingleFilePage.goToUploadSingleFileSkp()

            // Upload File
            uploadSingleFilePage.uploadSingleFile(data_temp.upload[0].upload1)
            uploadSingleFilePage.checkDataFileUpload()

            // Click tab registrasi
            tabRegistrasiPage.clickTabRegistrasi()

            // Tab Registrasi - Bank Nomor
            tabRegistrasiPage.inputPenomoran()
 
            // Tab Registrasi - Tujuan Surat
            tabRegistrasiPage.inputTujuanTembusanSurat()
            
            // Tab Registrasi - Section Identitas Surat
            const uuid = () => Cypress._.random(0, 1e6)
            const id = uuid()

            tabRegistrasiPage.inputPerihal('Automation Drafting Luar Penandatangan Diri Sendiri (SKP) ' + id, 'Automation Drafting Luar Penandatangan Diri Sendiri (SKP) ' + id)
            tabRegistrasiPage.checkWarnaLabelUrgensi(data_temp.registrasi[7].urgensi_surat, data_temp.registrasi[3].index0)
            tabRegistrasiPage.inputSifat(data_temp.registrasi[8].sifat_surat1)

            // Tab Registrasi - Section Penandatangan
            tabRegistrasiPage.addMorePenandatangan()
            tabRegistrasiPage.inputPenandatanganDiriSendiri()

            // Upload file pengantar
            tabRegistrasiPage.uploadSuratPengantar(data_temp.upload[0].upload1)
            tabRegistrasiPage.checkDataFileUpload()
        })
    )

    qase([4078, 4134],
        it('Cek kesesuaian popup tte naskah', () => {
            // Click btn tte naskah
            tandatanganiPage.tandatanganiNaskah()

            // Check popup
            tandatanganiPage.checkInputDataRegistrasi()
        })
    )

    qase([4097, 4149],
        it('Cek tombol tte naskah pada popup konfirmasi', () => {
            // Click btn tte naskah
            tandatanganiPage.tteNaskah()
        })
    )

    qase([4079, 4135],
        it('Mengosongkan passphrase dan klik button TTE naskah', () => {
            // Click btn tte naskah
            tandatanganiPage.confirmTteNaskah('negatif')
        })
    )

    qase([4085, 4141],
        it('Cek section passphrase TTE', () => {
            // Check input passphrase
            tandatanganiPage.checkInputPassphrase()
        })
    )

    qase([4080, 4136],
        it('Cek tombol periksa kembali', () => {
            // Click tombol periksa kembali
            tandatanganiPage.clickBtnPeriksaKembali()
        })
    )

    qase([4082, 4138],
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