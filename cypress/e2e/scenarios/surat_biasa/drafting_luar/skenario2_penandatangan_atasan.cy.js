import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { TabRegistrasiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tab_registrasi.cy"
import { UploadSingleFilePage } from "@pages/sidebar/konsep_naskah/drafting_luar/pgs_upload_single_file.cy"
import { TandatanganiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tandatangani.cy"
import { KotakKeluarPage } from "@pages/sidebar/konsep_naskah/drafting_luar/kotak_keluar.cy"
import { KotakMasukPage } from "@pages/sidebar/konsep_naskah/drafting_luar/kotak_masuk.cy"
import { HistoriPage } from "@pages/sidebar/konsep_naskah/drafting_luar/histori.cy"

let uploadSingleFilePage = new UploadSingleFilePage()
let tabRegistrasiPage = new TabRegistrasiPage()
let tandatanganiPage = new TandatanganiPage()
let kotakKeluarPage = new KotakKeluarPage()
let kotakMasukPage = new KotakMasukPage()
let historiPage = new HistoriPage()
let loginPage = new LoginPage()
let user
let data_temp

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

describe('Drafting Luar - Skenario Penandatangan Atasan', { testIsolation: false }, () => {

    qase([4289, 3878, 3879, 3882, 3910, 3922, 4051, 4054, 4061, 4650, 4651, 4656, 3996, 4122, 4123, 4035, 3930, 4008, 4078, 4097, 4080, 3228, 3250, 3306],
        it('Upload dan registrasi naskah single file', () => {
            // Login 
            loginPage.loginViaV1(user.nip_konseptor_2, user.password)
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

            tabRegistrasiPage.inputPerihal('Automation Drafting Luar (Surat Biasa) ' + id, 'Automation Drafting Luar (Surat Biasa) ' + id)
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

            // Check Naskah Di Kotak Keluar
            kotakKeluarPage.goToKotakKeluarTTEReview()
            kotakKeluarPage.checkNaskahKotakKeluar(data_temp.env[0].staging)

            // Check Histori Di Detail Kotak Keluar 3228, 3250, 3306
            historiPage.goToHistori()
            historiPage.checkHistoryPenandatanganDiriSendiri()
            historiPage.checkHistoriPenandatanganBefore()
        })
    )

    qase([3307],
        it('Tandatangani Naskah Penandatangan Atasan', () => {
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
})