import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { TabRegistrasiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tab_registrasi.cy"
import { UploadSingleFilePage } from "@pages/sidebar/konsep_naskah/drafting_luar/pgs_upload_single_file.cy"
import { TandatanganiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tandatangani.cy"
import { KotakMasukPage } from "@pages/sidebar/konsep_naskah/drafting_luar/kotak_masuk.cy"

let uploadSingleFilePage = new UploadSingleFilePage()
let tabRegistrasiPage = new TabRegistrasiPage()
let tandatanganiPage = new TandatanganiPage()
let kotakMasukPage = new KotakMasukPage()
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

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: true })
})

describe('Drafting Luar - Test Case List Kotak Masuk Tab TTE Naskah', { testIsolation: false }, () => {

    // Create sample data
    qase([4289, 3878, 3879, 3882, 3910, 3922, 4051, 4054, 4061, 4650, 4651, 4656, 3996, 4122, 4123, 4035, 3930, 4008, 4078, 4097, 4080],
        it('Upload dan registrasi naskah single file', () => {
            // Login
            loginPage.loginViaV1(user.nip_pemeriksa_2_1, user.password)
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

            tabRegistrasiPage.inputPerihal('Automation Drafting Luar - Kotak Masuk (SKP) ' + id, 'Automation Drafting Luar - Kotak Masuk (SKP) ' + id)
            tabRegistrasiPage.checkWarnaLabelUrgensi(data_temp.registrasi[7].urgensi_surat, data_temp.registrasi[3].index0)
            tabRegistrasiPage.inputSifat(data_temp.registrasi[8].sifat_surat1)

            // Tab Registrasi - Section Penandatangan
            tabRegistrasiPage.addMorePenandatangan()
            tabRegistrasiPage.inputPenandatanganDiriSendiri()
            tabRegistrasiPage.addMorePenandatangan()
            tabRegistrasiPage.inputPenandatanganAtasan(data_temp.registrasi[9].atasan2, data_temp.env[0].staging)

            // Upload file pengantar
            tabRegistrasiPage.uploadSuratPengantar(data_temp.upload[0].upload1)
            tabRegistrasiPage.checkDataFileUpload()

            // Melakukan TTE Naskah (Penandatangan Diri Sendiri)
            tandatanganiPage.tandatanganiNaskah()
            tandatanganiPage.checkInputDataRegistrasi()
            tandatanganiPage.tteNaskah()
            tandatanganiPage.submitTteNaskah(user.passphrase, data_temp.env[0].staging)
        })
    )

    // Begin test case list kotak masuk
    qase([97, 300, 238, 301, 239, 235, 234, 232],
        it('Test case list kotak masuk', () => {
            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_2_2, user.password)
            loginPage.directLogin()
            
            // Go To Kotak Masuk - TTE & Review 97
            kotakMasukPage.goToKotakMasukTTEReview()

            cy.wait(6000)

            // Cek kesesuaian data urgensi 300
            kotakMasukPage.checkListDataUrgensi()

            // Cek kesesuaian data jenis 238
            kotakMasukPage.checkListDataJenis()

            // Cek kesesuaian data sifat 301
            kotakMasukPage.checkListDataSifat()

            // Cek kesesuaian data perihal 239
            kotakMasukPage.checkListDataPerihal()

            // Cek fungsi tombol Selanjutnya 235
            kotakMasukPage.checkNextPageData()

            // Cek fungsi tombol Sebelumnya 234
            kotakMasukPage.checkPrevPageData()

            // Cek tombol Sebelumnya pada halaman pertama tabel 232
            kotakMasukPage.checkPrevPage()

            // Cek tombol Selanjutnya pada halaman terakhir tabel 233
            kotakMasukPage.checkNextPage()
        })
    )

    qase([236,3300],
        it.skip('Cek list halaman kotak masuk dengann status TTE di Ulang', () => {
            // Wait for 6 seconds
            cy.wait(10000)

            // Check status tte "TTE Ulang"
            kotakMasukPage.checkStatusNaskah(data_temp.registrasi[10].status1)
        })
    )
})