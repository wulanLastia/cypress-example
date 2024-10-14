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

describe('Drafting Luar - Test Case Detail Kotak Masuk', { testIsolation: false }, () => {

    // Create sample data
    qase([4289, 3878, 3879, 3882, 3910, 3922, 4051, 4054, 4061, 4650, 4651, 4656, 3996, 4122, 4123, 4035, 3930, 4008, 4078, 4097, 4080],
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
            tabRegistrasiPage.selectPenandatanganAtasNama()
            tabRegistrasiPage.inputPenandatanganAtasNama(data_temp.registrasi[9].atas_nama, data_temp.registrasi[9].atasan1, data_temp.env[0].staging)
            tabRegistrasiPage.addMorePenandatangan()
            tabRegistrasiPage.selectPenandatanganUntukBeliau()
            tabRegistrasiPage.inputPenandatanganUntukBeliau(data_temp.registrasi[9].untuk_beliau, data_temp.registrasi[9].atasan2, data_temp.env[0].staging)

            // Upload file pengantar
            tabRegistrasiPage.uploadSuratPengantar(data_temp.upload[0].upload1)
            tabRegistrasiPage.checkDataFileUpload()

            // Melakukan TTE Naskah (Penandatangan Diri Sendiri)
            tandatanganiPage.tandatanganiNaskah()
            tandatanganiPage.checkInputDataRegistrasi('2.5')
            tandatanganiPage.tteNaskah()
            tandatanganiPage.submitTteNaskah(user.passphrase, data_temp.env[0].staging)
        })
    )

    // Begin test case detail kotak masuk
    qase([3389, 3390, 3406, 3393, 3395, 3397, 3398, 3399, 3401, 5652, 5667, 3394],
        it('Detail kotak masuk', () => {
            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_2_1, user.password)
            loginPage.directLogin()
            
            // Go To Kotak Masuk - TTE & Review 3389
            kotakMasukPage.goToKotakMasukTTEReview()

            cy.wait(30000)

            // Cek status pada detail halaman detail kotak masuk review naskah 3390
            kotakMasukPage.checkNaskahKotakMasuk(data_temp.env[0].staging)
            kotakMasukPage.checkStatusdanDetailNaskah()

            // Cek tombol tandatangani jika penerima atasan 3406
            kotakMasukPage.checkBtnTte()

            // Cek detail data tab registrasi - jenis naskah 3395
            kotakMasukPage.checkDataJenisNaskah()

            // Cek detail data tab registrasi - urgensi 3397
            kotakMasukPage.checkDataUrgensi()

            // Cek detail data tab registrasi - perihal 3398
            kotakMasukPage.checkDataPerihal()

            // Cek detail data tab registrasi - sifat 3399
            kotakMasukPage.checkDataSifat()

            // Cek detail data tab registrasi - konseptor 3401 & penandatangan atas nama - untuk beliau 5652, 5667
            kotakMasukPage.checkDataPenandatangan('2.5')

            // Cek tombol kembali 3394
            kotakMasukPage.checkBtnKembali()
        })
    )
})