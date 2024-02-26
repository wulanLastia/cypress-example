import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../../support/pages/auth/login.cy"
import { UploadSingleFilePage } from "../../../../../support/pages/sidebar/konsep_naskah/drafting_luar/pgs_upload_single_file.cy"

let uploadSingleFilePage = new UploadSingleFilePage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

before(() => {
    loginPage.loginViaV1(user.nip, user.password)
    loginPage.directLogin()
})

after(() => {
    qase(411,
        loginPage.logoutV2()
    )
})

describe('Drafting Luar - Test Case Upload Single File', { testIsolation: false }, () => {

    qase(2663,
        it('Mengakses halaman naskah single file', () => {
            uploadSingleFilePage.goToUploadSingleFileSuratBiasa()
        })
    )

    qase(2664,
        it('Cek kesesuaian jenis naskah', () => {
            uploadSingleFilePage.checkDetailJenisNaskah('Surat Biasa')
        })
    )

    qase(2701,
        it('Cek tombol kirim naskah jika data masih kosong', () => {
            uploadSingleFilePage.checkDetailButtonKirim()
        })
    )

    qase(2671,
        it('Cek tombol registrasi sebelum melakukan upload file', () => {
            uploadSingleFilePage.checkTabRegistrasi('Before')
        })
    )

    qase(2669,
        it('Cek validasi jika upload naskah selain format PDF', () => {
            uploadSingleFilePage.uploadSingleFile('negatif')
        })
    )

    qase(2733,
        it('Batal melakukan hapus file', () => {
            uploadSingleFilePage.batalDeleteFileUpload()
        })
    )

    qase(2721,
        it('Cek perubahan file jika melakukan update file naskah', () => {
            uploadSingleFilePage.uploadSingleFile('positif')
            uploadSingleFilePage.checkDataFileUpload()
        })
    )

    qase(2741,
        it('Cek nama file pada popup konfirmasi hapus file', () => {
            uploadSingleFilePage.checkDeleteFileUpload()
        })
    )

    qase(2715,
        it('Cek kesesuaian file ketika berhasil melakukan upload file', () => {
            uploadSingleFilePage.uploadSingleFile('positif')
            uploadSingleFilePage.checkDataFileUpload()
        })
    )

    qase(2672,
        it('Cek tombol registrasi setelah melakukan upload file', () => {
            uploadSingleFilePage.checkTabRegistrasi('After')
        })
    )

    qase(2665,
        it('Batal drafting setelah melakukan upload naskah', () => {
            uploadSingleFilePage.batalDrafting()
        })
    )

    qase(2666,
        it.skip('Batal drafting setelah melakukan pengisian data registrasi', () => { // Skip dulu karena berhubungan sama step selanjutnya
            uploadSingleFilePage.goToUploadSingleFileSuratBiasa()
            uploadSingleFilePage.batalDrafting()
        })
    )
})