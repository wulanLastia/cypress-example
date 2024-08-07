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

afterEach(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})

describe('Drafting Luar - Skenario SKP', { testIsolation: false }, () => {

    qase([4289, 3878, 3879, 3882, 3910, 3922, 4051, 4054, 4061, 4650, 4651, 4656, 3996, 4122, 4123, 4035, 3930, 4008, 4078, 4097, 4080],
        it('Upload dan registrasi naskah single file', () => {
            // Login 
            loginPage.loginViaV1(user.nip_konseptor_2, user.password)
            loginPage.directLogin()

            // Go To Konsep Naskah Sasaran Kinerja Pegawai (SKP)
            uploadSingleFilePage.goToUploadSingleFileSkp()

            // Upload File
            uploadSingleFilePage.uploadSingleFile(data_temp.upload[0].upload1)
            uploadSingleFilePage.checkDataFileUpload()

            // Click tab registrasi
            tabRegistrasiPage.clickTabRegistrasi()

            // Tab Registrasi - Bank Nomor
            tabRegistrasiPage.inputNomorUrut(data_temp.registrasi[0].bank_nomor_lainnya)
            tabRegistrasiPage.searchKodeKlasifikasi(data_temp.registrasi[1].kode_klasifikasi)
            tabRegistrasiPage.inputUnitPengolah(data_temp.registrasi[2].unit_pengolah, data_temp.registrasi[2].unit_pengolah)

            // Tab Registrasi - Tujuan Surat
            tabRegistrasiPage.inputTujuanTembusanSurat()

            // Tab Registrasi - Section Identitas Surat
            const uuid = () => Cypress._.random(0, 1e6)
            const id = uuid()

            tabRegistrasiPage.inputPerihal('Automation Drafting Luar (SKP) ' + id, 'Automation Drafting Luar (SKP) ' + id)
            tabRegistrasiPage.checkWarnaLabelUrgensi(data_temp.registrasi[7].urgensi_surat, data_temp.registrasi[3].index0)
            tabRegistrasiPage.inputSifat(data_temp.registrasi[8].sifat_surat1)

            // Tab Registrasi - Section Penandatangan
            tabRegistrasiPage.addMorePenandatangan()
            tabRegistrasiPage.inputPenandatanganDiriSendiri()
            tabRegistrasiPage.addMorePenandatangan()
            tabRegistrasiPage.inputPenandatanganAtasan(data_temp.registrasi[9].atasan1, data_temp.env[0].staging)

            // Upload file pengantar
            tabRegistrasiPage.uploadSuratPengantar(data_temp.upload[0].upload1)
            tabRegistrasiPage.checkDataFileUpload()

            // Melakukan TTE Naskah (Penandatangan Diri Sendiri)
            tandatanganiPage.tandatanganiNaskah()
            tandatanganiPage.checkInputDataRegistrasi()
            tandatanganiPage.tteNaskah()
            tandatanganiPage.submitTteNaskah(user.passphrase, data_temp.env[0].staging)

            // Check Naskah Di Kotak Keluar
            kotakKeluarPage.goToKotakKeluarTTEReview()
            kotakKeluarPage.checkNaskahKotakKeluar(data_temp.env[0].staging)
        })
    )

    qase([3389, 3390, 3649, 3650, 3711, 3712, 3713, 3714, 3715, 3716, 3717, 3718],
        it('Kembalikan Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_2_1, user.password)
            loginPage.directLogin()

            // Go To Kotak Masuk - TTE & Review 3389
            kotakMasukPage.goToKotakMasukTTEReview()

            // Cek status pada detail halaman detail kotak masuk review naskah 3390
            kotakMasukPage.checkNaskahKotakMasuk(data_temp.env[0].staging)

            // Cek tombol kembalikan pada detail naskah 3649
            kembalikanPage.checkPopupKembalikanNaskah()

            // Input poin perbaikan
            kembalikanPage.inputPoinPerbaikan(data_temp.kembalikan[0].perbaikan_positif, data_temp.kembalikan[1].input_perbaikan, null)

            // Input bagian perbaikan 3650, 3711, 3712, 3713, 3714, 3715, 3716, 3717, 3718 
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

            // Check status naskah di kotak keluar
            kotakKeluarPage.checkNaskahDikembalikan(data_temp.env[0].staging)
        })
    )

    qase([3389, 3738, 3862],
        it('Cek Tab Perbaikan', () => {
            // Login 
            loginPage.loginViaV1(user.nip_konseptor_2, user.password)
            loginPage.directLogin()

            // Go To Kotak Masuk - TTE & Review 3389
            kotakMasukPage.goToKotakMasukTTEReview()
            kotakMasukPage.goToPerbaikiNaskah()

            // Mengakses halaman perbaiki naskah tab daftar file 3862
            perbaikiPage.aksesTabDaftarFile()
        })
    )

    // @TODO = Dibuka setelah step perbaiki selesai
    // qase([],
    //     it('Tandatangani Naskah Penandatangan Atasan', () => {
    //         // Login 
    //         loginPage.loginViaV1(user.nip_pemeriksa_2_1, user.password)
    //         loginPage.directLogin()

    //         // Tandatangani Naskah
    //         kotakMasukPage.goToKotakMasukTTEReview()
    //         kotakMasukPage.checkNaskahKotakMasuk(data_temp.env[0].staging)

    //         // Melakukan TTE Naskah (Penandatangan Atasan)
    //         tandatanganiPage.tandatanganiNaskahAtasan()
    //         tandatanganiPage.tteNaskahAtasan()
    //         tandatanganiPage.submitTteNaskah(user.passphrase, data_temp.env[0].staging)
    //     })
    // )
})