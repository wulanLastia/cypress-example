import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { TabRegistrasiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tab_registrasi.cy"
import { UploadSingleFilePage } from "@pages/sidebar/konsep_naskah/drafting_luar/pgs_upload_single_file.cy"
import { TandatanganiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tandatangani.cy"
import { KotakKeluarPage } from "@pages/sidebar/konsep_naskah/drafting_luar/kotak_keluar.cy"

let uploadSingleFilePage = new UploadSingleFilePage()
let tabRegistrasiPage = new TabRegistrasiPage()
let tandatanganiPage = new TandatanganiPage()
let kotakKeluarPage = new KotakKeluarPage()
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

after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})

describe('Drafting Luar - Test Case Detail Kotak Keluar', { testIsolation: false }, () => {

    // Create sample data
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

            tabRegistrasiPage.inputPerihal('Automation Drafting Luar - Kotak Keluar (Surat Biasa) ' + id, 'Automation Drafting Luar - Kotak Keluar (Surat Biasa) ' + id)
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

            cy.wait(3000)
        })
    )

    // Begin test case detail kotak keluar
    qase(3205,
        it('Akses halaman kotak keluar TTE dan Review', () => {
            // Akses halaman kotak keluar TTE dan Review
            kotakKeluarPage.goToKotakKeluarTTEReview()

            // Akses detail naskah kotak keluar
            kotakKeluarPage.checkNaskahKotakKeluar(data_temp.env[0].staging)
        })
    )

    qase(3206,
        it('Cek detail halaman detail kotak keluar review naskah', () => {
            // Cek detail halaman detail kotak keluar review naskah
            kotakKeluarPage.checkDetailNaskah()
        })
    )

    qase(3252,
        it('Cek detail data tab registrasi - jenis naskah', () => {
            // Cek detail data tab registrasi - jenis naskah
            kotakKeluarPage.checkDataJenisNaskah()
        })
    )

    qase(3253,
        it('Cek detail data tab registrasi - nomor naskah', () => {
            // Cek detail data tab registrasi - nomor naskah
            kotakKeluarPage.checkDataNomorNaskah()
        })
    )

    qase(3254,
        it('Cek detail data tab registrasi - urgensi', () => {
            // Cek detail data tab registrasi - urgensi
            kotakKeluarPage.checkDataUrgensi()
        })
    )

    qase(3255,
        it('Cek detail data tab registrasi - perihal', () => {
            // Cek detail data tab registrasi - perihal
            kotakKeluarPage.checkDataPerihal()
        })
    )

    qase(3256,
        it('Cek detail data tab registrasi - sifat', () => {
            // Cek detail data tab registrasi - sifat
            kotakKeluarPage.checkDataSifat()
        })
    )

    qase(3257,
        it('Cek detail data tab registrasi - penerima', () => {
            // Cek detail data tab registrasi - penerima
            kotakKeluarPage.checkDataPenerima()
        })
    )

    qase(3258,
        it('Cek detail data tab registrasi - penandatangan', () => {
            // Cek detail data tab registrasi - penandatangan
            kotakKeluarPage.checkDataPenandatangan()
        })
    )

    qase(3220,
        it('Cek tombol kembali', () => {
            // Cek tombol kembali
            kotakKeluarPage.checkBtnKembali()
        })
    )
})