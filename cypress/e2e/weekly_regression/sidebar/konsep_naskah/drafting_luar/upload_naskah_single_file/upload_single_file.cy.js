import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { UploadSingleFilePage } from "@pages/sidebar/konsep_naskah/drafting_luar/pgs_upload_single_file.cy"
import { TabRegistrasiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tab_registrasi.cy"

let loginPage = new LoginPage()
let uploadSingleFilePage = new UploadSingleFilePage()
let tabRegistrasiPage = new TabRegistrasiPage()
let user

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

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

before(() => {
    loginPage.loginViaV1(user.nip_konseptor_2, user.password)
    loginPage.directLogin()
})

describe('Drafting Luar - Test Case Upload Single File SKP', { testIsolation: false }, () => {

    qase(4289,
        it('Mengakses halaman naskah single file', () => {
            uploadSingleFilePage.goToUploadSingleFileSkp()
        })
    )

    qase(3863,
        it('Cek kesesuaian jenis naskah', () => {
            uploadSingleFilePage.checkDetailJenisNaskah('Sasaran Kinerja Pegawai (SKP)')
        })
    )

    qase(3873,
        it('Cek tombol kirim naskah jika data masih kosong', () => {
            uploadSingleFilePage.checkDetailButtonKirim()
        })
    )

    qase(3870,
        it('Cek tombol registrasi sebelum melakukan upload file', () => {
            uploadSingleFilePage.checkTabRegistrasi('Before')
        })
    )

    qase(3868,
        it('Cek validasi jika upload naskah selain format PDF', () => {
            uploadSingleFilePage.uploadSingleFile('negatif')
        })
    )

    qase(3899,
        it('Batal melakukan hapus file', () => {
            uploadSingleFilePage.batalDeleteFileUpload()
        })
    )

    qase(3891,
        it('Cek perubahan file jika melakukan update file naskah', () => {
            uploadSingleFilePage.uploadSingleFile('positif')
            uploadSingleFilePage.checkDataFileUpload()
        })
    )

    qase(3903,
        it('Cek nama file pada popup konfirmasi hapus file', () => {
            uploadSingleFilePage.checkDeleteFileUpload()
        })
    )

    qase(3885,
        it('Cek kesesuaian file ketika berhasil melakukan upload file', () => {
            uploadSingleFilePage.uploadSingleFile('positif')
            uploadSingleFilePage.checkDataFileUpload()
        })
    )

    qase(3871,
        it('Cek tombol registrasi setelah melakukan upload file', () => {
            uploadSingleFilePage.checkTabRegistrasi('After')
        })
    )

    qase(3864,
        it('Batal drafting setelah melakukan upload naskah', () => {
            uploadSingleFilePage.batalDrafting()
        })
    )

    qase([4289, 3871, 3996, 3865],
        it('Batal drafting setelah melakukan pengisian data registrasi', () => {
            // Go To Upload Naskah Single File SKP
            uploadSingleFilePage.goToUploadSingleFileSkp()

            // Upload File
            uploadSingleFilePage.uploadSingleFile('positif')
            uploadSingleFilePage.checkDataFileUpload()

            // Click tab registrasi
            tabRegistrasiPage.clickTabRegistrasi()

            // Batal drafting setelah melakukan pengisian data registrasi
            uploadSingleFilePage.batalDrafting()
        })
    )
})