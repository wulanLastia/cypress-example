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

describe('Drafting Luar - Tab Perbaikan Naskah', () => {

    qase([2663, 2708, 2715, 2712, 2754, 2766, 2949, 2952, 2960, 2784, 2785, 2792, 2879, 2867, 2883, 2925, 2777, 2893, 2980, 3016, 2982],
        it('Upload dan registrasi naskah single file', () => {
            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_2_1, user.password)
            loginPage.directLogin()

            // Go To Konsep Naskah Surat Biasa
            uploadSingleFilePage.goToUploadSingleFileSuratBiasa()

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

            tabRegistrasiPage.inputPerihal('Automation Drafting Luar Kembalikan (Surat Biasa) ' + id, 'Automation Drafting Luar Kembalikan (Surat Biasa) ' + id)
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

    qase([3389, 3390, 3649, 3650, 3711, 3712, 3713, 3714, 3715, 3716, 3717, 3718, 3848, 3846],
        it('Kembalikan Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_2_2, user.password)
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

            // Check Naskah Di Kotak Keluar
            kotakKeluarPage.checkNaskahKotakKeluar(data_temp.env[0].staging)
        })
    )

    qase([3389, 3738, 3740, 3741, 3721, 3730, 3731, 3732, 3733, 3734, 3735, 3736, 3737],
        it('Cek Tab Perbaikan', () => {
            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_2_1, user.password)
            loginPage.directLogin()

            // Go To Kotak Masuk - TTE & Review 3389
            kotakMasukPage.goToKotakMasukTTEReview()
            kotakMasukPage.goToPerbaikiNaskah()

            // Cek value poin perbaikan naskah berdasarkan inputan poin perbaikan 3738
            perbaikiPage.checkPoinPerbaikan()

            // Cek kesesuaian nama dan jabatan pemeriksa naskah 3740, 3741
            perbaikiPage.checkDataPemeriksa()

            // Cek value kembalikan naskah berdasarkan checkbox "Perihal" 3721
            perbaikiPage.checkInputPerbaikanPerihal()

            // Cek value kembalikan naskah berdasarkan checkbox "Isi Naskah" 3730
            perbaikiPage.checkInputPerbaikanIsiNaskah()

            // Cek value kembalikan naskah berdasarkan checkbox "Lampiran" 3731
            perbaikiPage.checkInputPerbaikanLampiran()

            // Cek value kembalikan naskah berdasarkan checkbox "Tujuan" 3732
            perbaikiPage.checkInputPerbaikanTujuan()

            // Cek value kembalikan naskah berdasarkan checkbox "Alamat Naskah" 3733
            perbaikiPage.checkInputPerbaikanAlamatNaskah()

            // Cek value kembalikan naskah berdasarkan checkbox "Tembusan" 3734
            perbaikiPage.checkInputPerbaikanTembusan()

            // Cek value kembalikan naskah berdasarkan checkbox "Urgensi" 3735
            perbaikiPage.checkInputPerbaikanUrgensi()

            // Cek value kembalikan naskah berdasarkan checkbox "Sifat Naskah" 3736
            perbaikiPage.checkInputPerbaikanSifatNaskah()

            // Cek value kembalikan naskah berdasarkan checkbox "Kode Klasifikasi" 3737
            perbaikiPage.checkInputPerbaikanKodeKlasifikasi()
        })
    )
})