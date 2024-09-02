import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { TabRegistrasiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tab_registrasi.cy"
import { UploadSingleFilePage } from "@pages/sidebar/konsep_naskah/drafting_luar/pgs_upload_single_file.cy"
import { TandatanganiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tandatangani.cy"
import { KembalikanPage } from "@pages/sidebar/konsep_naskah/drafting_luar/kembalikan.cy"
import { KotakMasukPage } from "@pages/sidebar/konsep_naskah/drafting_luar/kotak_masuk.cy"

let uploadSingleFilePage = new UploadSingleFilePage()
let tabRegistrasiPage = new TabRegistrasiPage()
let tandatanganiPage = new TandatanganiPage()
let kembalikanPage = new KembalikanPage()
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

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

describe('Drafting Luar - Skenario Surat Biasa', { testIsolation: false }, () => {

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

            tabRegistrasiPage.inputPerihal('Automation Drafting Luar Kembalikan (Surat Biasa) ' + id, 'Automation Drafting Luar Kembalikan (Surat Biasa) ' + id)
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

    // Begin test case kembalikan naskah
    qase([3389, 3390, 4194, 4196, 4199, 4200, 4202, 4195, 4204, 4205, 4206, 4207, 4208, 4209, 4210, 4211, 4198, 4193],
        it('Check Kembalikan Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_2_2, user.password)
            loginPage.directLogin()

            // Go To Kotak Masuk - TTE & Review 3389
            kotakMasukPage.goToKotakMasukTTEReview()

            // Cek status pada detail halaman detail kotak masuk review naskah 3390
            kotakMasukPage.checkNaskahKotakMasuk(data_temp.env[0].staging)
            kotakMasukPage.checkStatusdanDetailNaskah()

            // Cek tombol kembalikan pada detail naskah 4194
            kembalikanPage.checkPopupKembalikanNaskah()

            // Mengosongkan kolom perbaikan dan klik button kembalikan 4196
            kembalikanPage.checkBtnKembalikan()

            // Input tag html pada kolom point perbaikan 4199
            kembalikanPage.inputPoinPerbaikan(data_temp.kembalikan[0].perbaikan_negatif, data_temp.kembalikan[1].perbaikan_html, data_temp.kembalikan[1].assert_perbaikan_html)

            // Input tag script pada kolom point perbaikan 4200
            kembalikanPage.inputPoinPerbaikan(data_temp.kembalikan[0].perbaikan_negatif, data_temp.kembalikan[1].perbaikan_script, data_temp.kembalikan[1].assert_perbaikan_script)
        
            // Input link url pada kolom point perbaikan 4202
            kembalikanPage.inputPoinPerbaikan(data_temp.kembalikan[0].perbaikan_negatif, data_temp.kembalikan[1].perbaikan_url, data_temp.kembalikan[1].assert_perbaikan_url)
        
            // Cek kembalikan naskah berdasarkan checkbox "Perihal" 4195 
            kembalikanPage.inputPerbaikanPerihal()

            // Cek kembalikan naskah berdasarkan checkbox "Isi Naskah" 4204
            kembalikanPage.inputPerbaikanIsiNaskah()

            // Cek kembalikan naskah berdasarkan checkbox "Lampiran" 4205
            kembalikanPage.inputPerbaikanLampiran()

            // Cek kembalikan naskah berdasarkan checkbox "Tujuan" 4206
            kembalikanPage.inputPerbaikanTujuanNaskah()

            // Cek kembalikan naskah berdasarkan checkbox "Alamat Naskah" 4207
            kembalikanPage.inputPerbaikanAlamatNaskah()

            // Cek kembalikan naskah berdasarkan checkbox "Tembusan" 4208
            kembalikanPage.inputPerbaikanTembusan()

            // Cek kembalikan naskah berdasarkan checkbox "Urgensi" 4209
            kembalikanPage.inputPerbaikanUrgensiNaskah()

            // Cek kembalikan naskah berdasarkan checkbox "Sifat Naskah" 4210
            kembalikanPage.inputPerbaikanSifatNaskah()

            // Cek kembalikan naskah berdasarkan checkbox "Kode Klasifikasi" 4211 
            kembalikanPage.inputPerbaikanKodeKlasifikasi()

            // Check dan uncheck fungsi checkbox bagian perbaikan 4198
            kembalikanPage.uncheckPerbaikan()

            // Cek tombol batal pada popup kembalikan 4193
            kembalikanPage.batalKembalikan()
        })
    )
})