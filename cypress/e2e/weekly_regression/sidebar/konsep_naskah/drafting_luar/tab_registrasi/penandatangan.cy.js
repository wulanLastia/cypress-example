import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { TabRegistrasiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tab_registrasi.cy"
import { UploadSingleFilePage } from "@pages/sidebar/konsep_naskah/drafting_luar/pgs_upload_single_file.cy"

let uploadSingleFilePage = new UploadSingleFilePage()
let tabRegistrasiPage = new TabRegistrasiPage()
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

before(() => {
    loginPage.loginViaV1(user.nip_konseptor_2, user.password)
    loginPage.directLogin()
})

describe('Drafting Luar - Test Case Tab Registrasi Penandatangan', { testIsolation: false }, () => {

    qase([4289, 3878],
        it('Cek tab registrasi sebelum melakukan upload file', () => {
            // Go To Konsep Naskah Surat Biasa
            uploadSingleFilePage.goToUploadSingleFileSuratBiasa()

            // Cek tab registrasi
            uploadSingleFilePage.checkTabRegistrasi('Before')
        })
    )

    qase(3879,
        it('Cek tab registrasi setelah melakukan upload file', () => {
            // Upload File
            uploadSingleFilePage.uploadSingleFile(data_temp.upload[0].upload1)
            uploadSingleFilePage.checkDataFileUpload()

            // Click tab registrasi
            tabRegistrasiPage.clickTabRegistrasi()
        })
    )

    // PENANDATANGAN //
    qase(3927,
        it('Check penandatangan mode on dropdown list', () => {
            // Cek penandatangan mode
            tabRegistrasiPage.checkPenandatanganMode()
        })
    )

    qase(4403,
        it('Search penandatangan on dropdown list', () => {
            // Search penandatangan
            tabRegistrasiPage.searchPenandatangan(data_temp.registrasi[9].atasan1)
        })
    )

    qase(4526,
        it('Cancel tambah penandatangan', () => {
            // Cancel penandatangan
            tabRegistrasiPage.cancelPenandatangan()
        })
    )

    qase(3929,
        it('Leave the field empty when submitting the form', () => {
            // Cek tombol kirim
            tabRegistrasiPage.checkBtnSubmit()
        })
    )

    qase(4035,
        it('Check button tambah penandatangan', () => {
            // Tambah penandatangan
            tabRegistrasiPage.addMorePenandatangan()
        })
    )

    qase(3930,
        it('Check dropdown list if user select diri sendiri', () => {
            // Input penandatangan
            tabRegistrasiPage.inputPenandatanganDiriSendiri()
        })
    )

    qase(4036,
        it('Add another penandatangan after choose penandatangan diri sendiri', () => {
            // Tambah penandatangan
            tabRegistrasiPage.addMorePenandatangan()

            // Input penandatangan > 1
            tabRegistrasiPage.inputPenandatanganAtasan(data_temp.registrasi[9].atasan1, data_temp.env[0].staging)
        })
    )

    qase(3928,
        it('Check on preview page after select penandatangan', () => {
            // Assert Penandatangan Atasan 1
            tabRegistrasiPage.assertPenandatanganAtasan1(data_temp.registrasi[9].atasan1)
        })
    )

    qase(4402,
        it('Validate penandatangan cant be same', () => {
            // Tambah penandatangan
            tabRegistrasiPage.addMorePenandatangan()

            // Assertion validate same penandatangan
            tabRegistrasiPage.validateSamePenandatangan(data_temp.registrasi[9].atasan1, data_temp.env[0].staging)

            // Cancel penandatangan
            tabRegistrasiPage.cancelPenandatangan()
        })
    )

    qase(3942,
        it('Delete penandatangan', () => {
            // Delete penandatangan
            tabRegistrasiPage.deletePenandatangan(data_temp.registrasi[9].atasan1)
        })
    )

    qase(4041,
        it('Hide button tambah after choose 4 penandatangan', () => {
            // Tambah penandatangan 2
            tabRegistrasiPage.addMorePenandatangan()

            // Input penandatangan 2
            tabRegistrasiPage.inputPenandatanganAtasan(data_temp.registrasi[9].atasan1, data_temp.env[0].staging)

            // Tambah penandatangan 3
            tabRegistrasiPage.addMorePenandatangan()

            // Input penandatangan 3
            tabRegistrasiPage.inputPenandatanganAtasan(data_temp.registrasi[9].atasan2, data_temp.env[0].staging)

            // Tambah penandatangan 4
            tabRegistrasiPage.addMorePenandatangan()

            // Input penandatangan 4
            tabRegistrasiPage.inputPenandatanganAtasan(data_temp.registrasi[9].atasan3, data_temp.env[0].staging)

            // Assert penandatangan lebih dari 4
            tabRegistrasiPage.assertJumlahPenandatangan()
        })
    )

    // SURAT PENGANTAR //
    qase(4021,
        it('Cek nama file ketika user melakukan upload naskah', () => {
            // Check nama 
            tabRegistrasiPage.uploadSuratPengantar('negatif')
        })
    )

    qase([4020, 4023],
        it('Cek tampilan popup konfirmasi ketika melakukan hapus file', () => {
            // Check nama 
            tabRegistrasiPage.checkDeleteSuratPengantar()
        })
    )

    qase(4024,
        it('Cek nama file pada popup konfirmasi kembali ke halaman konsep naskah', () => {
            // Cek nama file
            tabRegistrasiPage.batalDeleteFile()
        })
    )

    qase(4008,
        it('Cek kesesuaian file ketika berhasil melakukan upload file', () => {
            // Delete not supported file
            tabRegistrasiPage.deleteFileSuratPengantar()

            // Upload file
            tabRegistrasiPage.uploadSuratPengantar('positif')
            tabRegistrasiPage.checkDataFileUpload()
        })
    )
})