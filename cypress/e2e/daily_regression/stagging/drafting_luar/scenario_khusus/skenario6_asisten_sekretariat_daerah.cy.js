import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { TabRegistrasiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tab_registrasi.cy"
import { UploadSingleFilePage } from "@pages/sidebar/konsep_naskah/drafting_luar/pgs_upload_single_file.cy"
import { TandatanganiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tandatangani.cy"
import { KotakKeluarPage } from "@pages/sidebar/konsep_naskah/drafting_luar/kotak_keluar.cy"
import { HistoriPage } from "@pages/sidebar/konsep_naskah/drafting_luar/histori.cy"

let uploadSingleFilePage = new UploadSingleFilePage()
let tabRegistrasiPage = new TabRegistrasiPage()
let tandatanganiPage = new TandatanganiPage()
let kotakKeluarPage = new KotakKeluarPage()
let historiPage = new HistoriPage()
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

describe('Drafting Luar - Skenario Asisten Sekretariat Daerah', { testIsolation: false }, () => {

    qase([79, 4289, 3885, 3879, 3884, 4229, 4054, 4061, 3996, 4122, 4126, 3930, 4008, 4134, 4141, 4138],
        it('Upload dan registrasi naskah single file', () => {
            // Login 79
            loginPage.loginViaV1(user.nip_konseptor_2, user.password)
            loginPage.directLogin()

            // Go To Konsep Naskah Berita Daerah 4289
            uploadSingleFilePage.goToUploadSingleFileBeritaDaerah()

            // Upload File 3885
            uploadSingleFilePage.uploadSingleFile(data_temp.upload[0].upload1)
            uploadSingleFilePage.checkDataFileUpload()

            // Click tab registrasi 3879
            tabRegistrasiPage.clickTabRegistrasi()

            // Tab Registrasi - Bank Nomor 3884
            tabRegistrasiPage.inputPenomoran()
 
            // Tab Registrasi - Tujuan Surat Asisten Sekretariat Daerah 4229, 4054, 4061
            tabRegistrasiPage.inputTujuanTembusan()
            tabRegistrasiPage.selectLintasDinas()
            tabRegistrasiPage.inputTujuan(data_temp.env[0].staging, data_temp.registrasi[3].index0, data_temp.registrasi[4].input_internal, data_temp.registrasi[5].tujuan_asisten_sekda1)
            tabRegistrasiPage.addMoreTujuan()
            tabRegistrasiPage.inputTujuan(data_temp.env[0].staging, data_temp.registrasi[3].index1, data_temp.registrasi[4].input_internal, data_temp.registrasi[5].tujuan_asisten_sekda2)
            tabRegistrasiPage.addMoreTujuan()
            tabRegistrasiPage.inputTujuan(data_temp.env[0].staging, data_temp.registrasi[3].index2, data_temp.registrasi[4].input_internal, data_temp.registrasi[5].tujuan_asisten_sekda3)
            tabRegistrasiPage.simpanTujuanTembusan()

            // Tab Registrasi - Section Identitas Surat 3996, 4122, 4126
            const uuid = () => Cypress._.random(0, 1e6)
            const id = uuid()

            tabRegistrasiPage.inputPerihal('Testing Skenario E2E Tujuan Asisten Sekretariat Daerah ' + id, 'Testing Skenario E2E Tujuan Asisten Sekretariat Daerah ' + id)
            tabRegistrasiPage.checkWarnaLabelUrgensi(data_temp.registrasi[7].urgensi_surat, data_temp.registrasi[3].index0)
            tabRegistrasiPage.inputSifat(data_temp.registrasi[8].sifat_surat3)

            // Tab Registrasi - Section Penandatangan 3930
            tabRegistrasiPage.addMorePenandatangan()
            tabRegistrasiPage.inputPenandatanganDiriSendiri()

            // Upload file pengantar 4008
            tabRegistrasiPage.uploadSuratPengantar(data_temp.upload[0].upload1)
            tabRegistrasiPage.checkDataFileUpload()

            // Melakukan TTE Naskah (Penandatangan Diri Sendiri) 4134, 4141, 4138
            tandatanganiPage.tandatanganiNaskah()
            tandatanganiPage.checkInputDataRegistrasi()
            tandatanganiPage.tteNaskah()
            tandatanganiPage.submitTteNaskah(user.passphrase, data_temp.env[0].staging)

            // Check Naskah Di Kotak Keluar 3064
            cy.wait(3000)
            kotakKeluarPage.checkNaskahKotakKeluar(data_temp.env[0].staging)
            kotakKeluarPage.checkDetailStatus()
        })
    )
})