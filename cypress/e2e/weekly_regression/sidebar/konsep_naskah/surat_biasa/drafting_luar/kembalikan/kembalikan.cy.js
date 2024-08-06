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

after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})

describe('Drafting Luar - Skenario Surat Biasa', { testIsolation: false }, () => {

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
    qase([3389, 3390, 3649, 3659, 3665, 3705, 3709, 3650, 3711, 3712, 3713, 3714, 3715, 3716, 3717, 3718, 3663, 3647],
        it('Check Kembalikan Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_2_2, user.password)
            loginPage.directLogin()

            // Go To Kotak Masuk - TTE & Review 3389
            kotakMasukPage.goToKotakMasukTTEReview()

            // Cek status pada detail halaman detail kotak masuk review naskah 3390
            kotakMasukPage.checkNaskahKotakMasuk(data_temp.env[0].staging)
            kotakMasukPage.checkStatusdanDetailNaskah()

            // Cek tombol kembalikan pada detail naskah 3649
            kembalikanPage.checkPopupKembalikanNaskah()

            // Mengosongkan kolom perbaikan dan klik button kembalikan 3659
            kembalikanPage.checkBtnKembalikan()

            // Input tag html pada kolom point perbaikan 3665
            kembalikanPage.inputPoinPerbaikan(data_temp.kembalikan[0].perbaikan_negatif, data_temp.kembalikan[1].perbaikan_html, data_temp.kembalikan[1].assert_perbaikan_html)

            // Input tag script pada kolom point perbaikan 3705
            kembalikanPage.inputPoinPerbaikan(data_temp.kembalikan[0].perbaikan_negatif, data_temp.kembalikan[1].perbaikan_script, data_temp.kembalikan[1].assert_perbaikan_script)
        
            // Input link url pada kolom point perbaikan 3709
            kembalikanPage.inputPoinPerbaikan(data_temp.kembalikan[0].perbaikan_negatif, data_temp.kembalikan[1].perbaikan_url, data_temp.kembalikan[1].assert_perbaikan_url)
        
            // Cek kembalikan naskah berdasarkan checkbox "Perihal" 3650 
            kembalikanPage.inputPerbaikanPerihal()

            // Cek kembalikan naskah berdasarkan checkbox "Isi Naskah" 3711
            kembalikanPage.inputPerbaikanIsiNaskah()

            // Cek kembalikan naskah berdasarkan checkbox "Lampiran" 3712
            kembalikanPage.inputPerbaikanLampiran()

            // Cek kembalikan naskah berdasarkan checkbox "Tujuan" 3713
            kembalikanPage.inputPerbaikanTujuanNaskah()

            // Cek kembalikan naskah berdasarkan checkbox "Alamat Naskah" 3714
            kembalikanPage.inputPerbaikanAlamatNaskah()

            // Cek kembalikan naskah berdasarkan checkbox "Tembusan" 3715
            kembalikanPage.inputPerbaikanTembusan()

            // Cek kembalikan naskah berdasarkan checkbox "Urgensi" 3716
            kembalikanPage.inputPerbaikanUrgensiNaskah()

            // Cek kembalikan naskah berdasarkan checkbox "Sifat Naskah" 3717
            kembalikanPage.inputPerbaikanSifatNaskah()

            // Cek kembalikan naskah berdasarkan checkbox "Kode Klasifikasi" 3718 
            kembalikanPage.inputPerbaikanKodeKlasifikasi()

            // Check dan uncheck fungsi checkbox bagian perbaikan 3663
            kembalikanPage.uncheckPerbaikan()

            // Cek tombol batal pada popup kembalikan 3647
            kembalikanPage.batalKembalikan()
        })
    )
})