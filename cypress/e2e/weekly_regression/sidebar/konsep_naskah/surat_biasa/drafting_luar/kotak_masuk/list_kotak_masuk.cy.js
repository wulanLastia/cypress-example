import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { TabRegistrasiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tab_registrasi.cy"
import { UploadSingleFilePage } from "@pages/sidebar/konsep_naskah/drafting_luar/pgs_upload_single_file.cy"
import { TandatanganiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tandatangani.cy"
import { KotakKeluarPage } from "@pages/sidebar/konsep_naskah/drafting_luar/kotak_keluar.cy"
import { KotakMasukPage } from "@pages/sidebar/konsep_naskah/drafting_luar/kotak_masuk.cy"

let uploadSingleFilePage = new UploadSingleFilePage()
let tabRegistrasiPage = new TabRegistrasiPage()
let tandatanganiPage = new TandatanganiPage()
let kotakKeluarPage = new KotakKeluarPage()
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

before(() => {
    loginPage.loginViaV1(user.nip_pemeriksa_2_1, user.password)
    loginPage.directLogin()
})

after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})

describe('Drafting Luar - Test Case List Kotak Masuk', { testIsolation: false }, () => {

    // Create sample data
    qase([2663, 2708, 2715, 2712, 2754, 2766, 2949, 2952, 2960, 2784, 2785, 2792, 2879, 2867, 2883, 2925, 2777, 2893, 2980, 3016, 2982],
        it('Upload dan registrasi naskah single file', () => {
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
            tabRegistrasiPage.activateToggleDistribusi()
            tabRegistrasiPage.inputTujuan(data_temp.env[0].staging, data_temp.registrasi[3].index0, data_temp.registrasi[4].input_internal, data_temp.registrasi[5].tujuan_internal1)
            tabRegistrasiPage.addMoreTujuan()
            tabRegistrasiPage.inputTujuan(data_temp.env[0].staging, data_temp.registrasi[3].index1, data_temp.registrasi[4].input_eksternal, data_temp.registrasi[5].tujuan_eksternal1)
            tabRegistrasiPage.inputTembusan(data_temp.env[0].staging, data_temp.registrasi[3].index0, data_temp.registrasi[4].input_internal, data_temp.registrasi[6].tembusan_internal2)
            tabRegistrasiPage.addMoreTembusan()
            tabRegistrasiPage.inputTembusan(data_temp.env[0].staging, data_temp.registrasi[3].index1, data_temp.registrasi[4].input_eksternal, data_temp.registrasi[6].tembusan_eksternal1)

            // Tab Registrasi - Section Identitas Surat
            const uuid = () => Cypress._.random(0, 1e6)
            const id = uuid()

            tabRegistrasiPage.inputPerihal('Automation Drafting Luar - Kotak Masuk (Surat Biasa) ' + id, 'Automation Drafting Luar - Kotak Masuk (Surat Biasa) ' + id)
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
            tandatanganiPage.submitTteNaskah('user.passphrase', data_temp.env[0].staging)
        })
    )

    // Begin test case kotak masuk
    qase(97,
        it('Akses menu kotak masuk tab TTE Naskah', () => {
            cy.wait(6000)
            
            // Go To Kotak Masuk - TTE & Review
            kotakMasukPage.goToKotakMasukTTEReview()
        })
    )

    qase([236,3300],
        it('Cek list halaman kotak masuk dengann status TTE di Ulang', () => {
            // Wait for 6 seconds
            cy.wait(10000)

            // Check status tte "TTE Ulang"
            kotakMasukPage.checkStatusNaskah(data_temp.registrasi[10].status1)
        })
    )

    qase(300,
        it('Cek kesesuaian data urgensi', () => {
            // Cek kesesuaian data urgensi
            kotakMasukPage.checkDataUrgensi()
        })
    )

    qase(238,
        it('Cek kesesuaian data jenis', () => {
            // Cek kesesuaian data jenis
            kotakMasukPage.checkDataJenis()
        })
    )

    qase(301,
        it('Cek kesesuaian data sifat', () => {
            // Cek kesesuaian data sifat
            kotakMasukPage.checkDataSifat()
        })
    )

    qase(239,
        it('Cek kesesuaian data perihal', () => {
            // Cek kesesuaian data perihal
            kotakMasukPage.checkDataPerihal()
        })
    )

    qase(235,
        it('Cek fungsi tombol Selanjutnya', () => {
            // Cek fungsi tombol Selanjutnya
            kotakMasukPage.checkNextPageData()
        })
    )

    qase(234,
        it('Cek fungsi tombol Sebelumnya', () => {
            // Cek fungsi tombol Sebelumnya
            kotakMasukPage.checkPrevPageData()
        })
    )

    qase(232,
        it('Cek tombol Sebelumnya pada halaman pertama tabel', () => {
            // Cek tombol Sebelumnya pada halaman pertama tabel
            kotakMasukPage.checkPrevPage()
        })
    )

    qase(233,
        it('Cek tombol Selanjutnya pada halaman terakhir tabel', () => {
            // Cek tombol Selanjutnya pada halaman terakhir tabel
            kotakMasukPage.checkNextPage()
        })
    )
})