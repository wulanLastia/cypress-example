import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { TabRegistrasiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tab_registrasi.cy"
import { UploadSingleFilePage } from "@pages/sidebar/konsep_naskah/drafting_luar/pgs_upload_single_file.cy"
import { TandatanganiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tandatangani.cy"
import { KotakKeluarPage } from "@pages/sidebar/konsep_naskah/drafting_luar/kotak_keluar.cy"
import { KotakMasukPage } from "@pages/sidebar/konsep_naskah/drafting_luar/kotak_masuk.cy"
import { KembalikanPage } from "@pages/sidebar/konsep_naskah/drafting_luar/kembalikan.cy"
import { PerbaikiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/perbaiki.cy"

let uploadSingleFilePage = new UploadSingleFilePage()
let tabRegistrasiPage = new TabRegistrasiPage()
let tandatanganiPage = new TandatanganiPage()
let kotakKeluarPage = new KotakKeluarPage()
let kotakMasukPage = new KotakMasukPage()
let kembalikanPage = new KembalikanPage()
let perbaikiPage = new PerbaikiPage()
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

describe('Drafting Luar - Create, Kembalikan Naskah', () => {

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

            tabRegistrasiPage.inputPerihal('Automation Drafting Luar Kembalikan (SKP) ' + id, 'Automation Drafting Luar Kembalikan (SKP) ' + id)
            tabRegistrasiPage.checkWarnaLabelUrgensi(data_temp.registrasi[7].urgensi_surat, data_temp.registrasi[3].index0)
            tabRegistrasiPage.inputSifat(data_temp.registrasi[8].sifat_surat1)

            // Tab Registrasi - Section Penandatangan
            tabRegistrasiPage.addMorePenandatangan()
            tabRegistrasiPage.inputPenandatanganAtasan(data_temp.registrasi[9].atasan2, data_temp.env[0].staging)

            // Upload file pengantar
            tabRegistrasiPage.uploadSuratPengantar(data_temp.upload[0].upload1)
            tabRegistrasiPage.checkDataFileUpload()

            // Mengirimkan naskah ke penandatangan
            tandatanganiPage.kirimNaskah()

            // Wait until process finish
            cy.wait(6000)
        })
    )

    qase([3389, 3390, 4194, 4195, 4204, 4205, 4206, 4207, 4208, 4209, 4210, 4211],
        it('Kembalikan Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_2_2, user.password)
            loginPage.directLogin()

            // Go To Kotak Masuk - TTE & Review 3389
            kotakMasukPage.goToKotakMasukTTEReview()

            // Cek status pada detail halaman detail kotak masuk review naskah 3390
            kotakMasukPage.checkNaskahKotakMasuk(data_temp.env[0].staging)

            // Cek tombol kembalikan pada detail naskah 4194
            kembalikanPage.checkPopupKembalikanNaskah()

            // Input poin perbaikan
            kembalikanPage.inputPoinPerbaikan(data_temp.kembalikan[0].perbaikan_positif, data_temp.kembalikan[1].input_perbaikan, null)

            // Input bagian perbaikan 4195, 4204, 4205, 4206, 4207, 4208, 4209, 4210, 4211
            kembalikanPage.inputPerbaikanPerihal()
            kembalikanPage.inputPerbaikanIsiNaskah()
            kembalikanPage.inputPerbaikanLampiran()
            kembalikanPage.inputPerbaikanTujuanNaskah()
            kembalikanPage.inputPerbaikanAlamatNaskah()
            kembalikanPage.inputPerbaikanTembusan()
            kembalikanPage.inputPerbaikanUrgensiNaskah()
            kembalikanPage.inputPerbaikanSifatNaskah()
            kembalikanPage.inputPerbaikanKodeKlasifikasi()

            // Click btn kembalikan naskah
            kembalikanPage.confirmKembalikanNaskah()

            // Check Naskah Di Kotak Keluar
            kotakKeluarPage.checkNaskahKotakKeluar(data_temp.env[0].staging)
        })
    )
})

describe('Drafting Luar - Perbaiki Naskah', { testIsolation: false }, () => {

    qase([3389, 4213, 4212],
        it('Perbaiki', () => {
            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_2_1, user.password)
            loginPage.directLogin()

            // Go To Kotak Masuk - TTE & Review 3389
            kotakMasukPage.goToKotakMasukTTEReview()
            cy.wait(6000)
            kotakMasukPage.goToPerbaikiNaskah(data_temp.env[0].staging)
            cy.wait(6000)

            // Cek tombol perbaiki pada detail naskah 4213
            perbaikiPage.checkBtnPerbaiki()

            // Cek tombol kembali pada detail data perbaiki naskah 4212
            perbaikiPage.checkBtnKembali()

            cy.wait(3000)
        })
    )

    qase([4223, 4225, 4226, 4214, 4215, 4216, 4217, 4218, 4219, 4220, 4221, 4222],
        it('Tab Perbaikan', () => {
            // Cek value poin perbaikan naskah berdasarkan inputan poin perbaikan 4223
            perbaikiPage.checkPoinPerbaikan()

            // Cek kesesuaian nama dan jabatan pemeriksa naskah 4225, 4226
            perbaikiPage.checkDataPemeriksa()

            // Cek value kembalikan naskah berdasarkan checkbox "Perihal" 4214
            perbaikiPage.checkInputPerbaikanPerihal()

            // Cek value kembalikan naskah berdasarkan checkbox "Isi Naskah" 4215
            perbaikiPage.checkInputPerbaikanIsiNaskah()

            // Cek value kembalikan naskah berdasarkan checkbox "Lampiran" 4216
            perbaikiPage.checkInputPerbaikanLampiran()

            // Cek value kembalikan naskah berdasarkan checkbox "Tujuan" 4217
            perbaikiPage.checkInputPerbaikanTujuan()

            // Cek value kembalikan naskah berdasarkan checkbox "Alamat Naskah" 4218
            perbaikiPage.checkInputPerbaikanAlamatNaskah()

            // Cek value kembalikan naskah berdasarkan checkbox "Tembusan" 4219
            perbaikiPage.checkInputPerbaikanTembusan()

            // Cek value kembalikan naskah berdasarkan checkbox "Urgensi" 4220
            perbaikiPage.checkInputPerbaikanUrgensi()

            // Cek value kembalikan naskah berdasarkan checkbox "Sifat Naskah" 4221
            perbaikiPage.checkInputPerbaikanSifatNaskah()

            // Cek value kembalikan naskah berdasarkan checkbox "Kode Klasifikasi" 4222
            perbaikiPage.checkInputPerbaikanKodeKlasifikasi()

            cy.wait(3000)
        })
    )

    qase([3862, 4295, 4308, 4305, 4320, 4316],
        it('Tab Daftar File', () => {
            // Mengakses halaman perbaiki naskah tab daftar file 3862
            perbaikiPage.aksesTabDaftarFile()

            // Cek validasi jika upload naskah selain format PDF 4295
            perbaikiPage.checkUpdatePerbaikanFile(data_temp.upload[0].upload2)

            // Cek perubahan file jika melakukan update file naskah 4308, 4305
            perbaikiPage.checkUpdatePerbaikanFile(data_temp.upload[0].upload1)

            // Cek nama file pada popup konfirmasi hapus file 4320
            perbaikiPage.checkDeletePerbaikanFileUpload()

            // Batal melakukan hapus file 4316
            perbaikiPage.batalDeletePerbaikanFileUpload()
        })
    )

    qase([4213, 4356, 4361, 4362, 4363, 4359],
        it('Tab Registrasi', () => {
            // Mengakses tab registrasi 4356
            perbaikiPage.aksesTabRegistrasi()

            // Mengupdate section identitas surat - perihal 4361
            perbaikiPage.inputPerbaikanPerihal(' Perbaiki')

            // Mengupdate section identitas surat - urgensi 4362
            perbaikiPage.inputPerbaikanUrgensi(data_temp.registrasi[7].urgensi_surat_last, data_temp.registrasi[3].index3)

            // Mengupdate section identitas surat - sifat surat 4363
            perbaikiPage.inputPerbaikanSifat(data_temp.registrasi[8].sifat_surat2)

            // Mengupdate section surat pengantar 4359
            perbaikiPage.uploadPerbaikanSuratPengantar(data_temp.upload[0].upload1)
        })
    )
})