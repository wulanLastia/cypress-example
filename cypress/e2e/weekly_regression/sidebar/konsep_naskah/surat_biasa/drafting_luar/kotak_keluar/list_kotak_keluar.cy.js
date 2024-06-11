import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { KotakKeluarPage } from "@pages/sidebar/konsep_naskah/drafting_luar/kotak_keluar.cy"
import { UploadSingleFilePage } from "@pages/sidebar/konsep_naskah/drafting_luar/pgs_upload_single_file.cy"
import { TabRegistrasiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tab_registrasi.cy"
import { TandatanganiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tandatangani.cy"

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

before(() => {
    loginPage.loginViaV1(user.nip_pemeriksa_2_1, user.password)
    loginPage.directLogin()
})

after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})

describe('Drafting Luar - Test Case List Kotak Keluar', { testIsolation: false }, () => {

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
            tabRegistrasiPage.inputTujuanTembusanSurat()

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
            tandatanganiPage.submitTteNaskah(user.passphrase, data_temp.env[0].staging)
        })
    )

    // Begin test case kotak keluar
    qase(3062,
        it('Akses menu kotak keluar', () => {
            // Go To Kotak Keluar - TTE & Review
            kotakKeluarPage.goToKotakKeluarTTEReview()
        })
    )

    qase(3063,
        it('Cek detail halaman naskah kotak keluar review naskah', () => {
            // Check detail halaman
            kotakKeluarPage.checkDetailHalamanKotakKeluar()
        })
    )

    qase(3065,
        it('Cek kesesuaian data jenis', () => {
            // Cek kesesuaian data jenis
            kotakKeluarPage.checkDataJenis()
        })
    )

    qase(3066,
        it('Cek kesesuaian data perihal', () => {
            // Cek kesesuaian data perihal
            kotakKeluarPage.checkDataPerihal()
        })
    )

    qase(3069,
        it('Cek kesesuaian data urgensi', () => {
            // Cek kesesuaian data urgensi
            kotakKeluarPage.checkDataUrgensi()
        })
    )

    qase(3070,
        it('Cek kesesuaian data sifat', () => {
            // Cek kesesuaian data sifat
            kotakKeluarPage.checkDataSifat()
        })
    )

    qase(3128,
        it('Cek kesesuaian data nomor naskah', () => {
            // Cek kesesuaian data nomor naskah
            kotakKeluarPage.checkDataNomorNaskah()
        })
    )

    // Kolom urgensi
    qase([3117, 3118, 3119, 3120],
        it('Cek warna label urgensi', () => {
            // Cek warna label
            kotakKeluarPage.checkWarnaLabelUrgensi()
        })
    )

    // Kolom status
    qase([], // @TODO : Belum dilakukan penyesuaian di sisi test qase
        it('Cek warna label status', () => {
            // Cek kolom status
            kotakKeluarPage.checkWarnaLabelStatus()
        })
    )

    // Pencarian
    qase(3072,
        it('Cek aksi pencarian jika kata kunci kurang dari 3 karakter', () => {
            // Input pencarian
            kotakKeluarPage.searchDokumen('Dr')
        })
    )

    qase(3073,
        it('Melakukan pencarian dengan kata kunci perihal yang tersedia pada data', () => {
            // Input pencarian
            kotakKeluarPage.searchDokumen('Automation Drafting')
        })
    )

    qase(3074,
        it('Melakukan pencarian dengan kata kunci yang tidak tersedia pada data', () => {
            // Input pencarian
            kotakKeluarPage.searchDokumen('XXX')
        })
    )

    qase(3076,
        it('Input script pada kolom pencarian', () => {
            // Input pencarian
            kotakKeluarPage.searchDokumen('<script>alert("hai")</script>')
        })
    )
})