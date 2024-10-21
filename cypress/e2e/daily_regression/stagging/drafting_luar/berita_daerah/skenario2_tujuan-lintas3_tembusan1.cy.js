import { qase } from 'cypress-qase-reporter/mocha';
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

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

describe('Drafting Luar - Skenario Tujuan Lintas Dinas(3) Tembusan(1)', { testIsolation: false }, () => {

    qase([4289, 3878, 3879, 3882, 3910, 3922, 4051, 4054, 4061, 4650, 4651, 4656, 3996, 4122, 4123, 4035, 3930, 4008, 4078, 4097, 4080],
        it('Upload dan registrasi naskah single file', () => {
            // Login 
            loginPage.loginViaV1(user.nip_konseptor_2, user.password)
            loginPage.directLogin()

            // Go To Konsep Naskah SKP
            uploadSingleFilePage.goToUploadSingleFileBeritaDaerah()

            // Upload File
            uploadSingleFilePage.uploadSingleFile(data_temp.upload[0].upload1)
            uploadSingleFilePage.checkDataFileUpload()

            // Click tab registrasi
            tabRegistrasiPage.clickTabRegistrasi()

            // Tab Registrasi - Bank Nomor
            tabRegistrasiPage.inputPenomoran()

            // Tab Registrasi - Tujuan Surat
            tabRegistrasiPage.inputTujuanTembusan()
            tabRegistrasiPage.selectLintasDinas()
            tabRegistrasiPage.inputTujuan(data_temp.env[0].staging, data_temp.registrasi[3].index0, data_temp.registrasi[4].input_internal, data_temp.registrasi[5].tujuan_sekda1)
            tabRegistrasiPage.addMoreTujuan()
            tabRegistrasiPage.inputTujuan(data_temp.env[0].staging, data_temp.registrasi[3].index1, data_temp.registrasi[4].input_internal, data_temp.registrasi[5].tujuan_kepala_dinas1)
            tabRegistrasiPage.addMoreTujuan()
            tabRegistrasiPage.inputTujuan(data_temp.env[0].staging, data_temp.registrasi[3].index2, data_temp.registrasi[4].input_internal, data_temp.registrasi[5].tujuan_kepala_dinas2)
            tabRegistrasiPage.inputTembusan(data_temp.env[0].staging, data_temp.registrasi[3].index0, data_temp.registrasi[4].input_internal, data_temp.registrasi[6].tembusan_eksternal2)
            tabRegistrasiPage.simpanTujuanTembusan()

            // Tab Registrasi - Section Identitas Surat
            const uuid = () => Cypress._.random(0, 1e6)
            const id = uuid()

            tabRegistrasiPage.inputPerihal('Automation Drafting Luar - Tujuan Lintas Dinas(3) Tembusan(1) ' + id, 'Automation Drafting Luar - Tujuan Lintas Dinas(3) Tembusan(1) ' + id)
            tabRegistrasiPage.checkWarnaLabelUrgensi(data_temp.registrasi[7].urgensi_surat, data_temp.registrasi[3].index0)
            tabRegistrasiPage.inputSifat(data_temp.registrasi[8].sifat_surat1)

            // Tab Registrasi - Section Penandatangan
            tabRegistrasiPage.addMorePenandatangan()
            tabRegistrasiPage.inputPenandatanganAtasan(data_temp.registrasi[9].atasan1, data_temp.env[0].staging)
            tabRegistrasiPage.addMorePenandatangan()
            tabRegistrasiPage.inputPenandatanganAtasan(data_temp.registrasi[9].atasan2, data_temp.env[0].staging)

            // Upload file pengantar
            tabRegistrasiPage.uploadSuratPengantar(data_temp.upload[0].upload1)
            tabRegistrasiPage.checkDataFileUpload()

            // Melakukan Kirim Naskah 
            tandatanganiPage.kirimNaskah()

            // Check Naskah Di Kotak Keluar
            kotakKeluarPage.checkNaskahKotakKeluar(data_temp.env[0].staging)
        })
    )

    qase([3307],
        it('Tandatangani Naskah Penandatangan Atasan 1', () => {
            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_2_1, user.password)
            loginPage.directLogin()

            // Tandatangani Naskah
            kotakMasukPage.goToKotakMasukTTEReview()
            kotakMasukPage.checkNaskahKotakMasuk(data_temp.env[0].staging)

            // Melakukan TTE Naskah (Penandatangan Atasan)
            tandatanganiPage.tandatanganiNaskahAtasan()
            tandatanganiPage.tteNaskahAtasan()
            tandatanganiPage.submitTteNaskah(user.passphrase, data_temp.env[0].staging)
        })
    )

    qase([3307],
        it('Tandatangani Naskah Penandatangan Atasan 2', () => {
            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_2_2, user.password)
            loginPage.directLogin()

            // Tandatangani Naskah
            kotakMasukPage.goToKotakMasukTTEReview()
            kotakMasukPage.checkNaskahKotakMasuk(data_temp.env[0].staging)

            // Melakukan TTE Naskah (Penandatangan Atasan)
            tandatanganiPage.tandatanganiNaskahAtasan()
            tandatanganiPage.tteNaskahAtasan()
            tandatanganiPage.submitTteNaskah(user.passphrase, data_temp.env[0].staging)
        })
    )
})