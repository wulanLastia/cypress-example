import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { MenuPage } from "@pages/sidebar/menu/menu.cy"
import { CreateSuratBiasaPage } from "@pages/sidebar/konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"
import { ListNaskahSuratBiasaPage } from "@pages/sidebar/konsep_naskah/drafting_luar/list_jenis_naskah.cy"

const { faker } = require('@faker-js/faker')
let menuPage = new MenuPage()
let loginPage = new LoginPage()
let createSuratBiasaPage = new CreateSuratBiasaPage()
let listNaskahSuratBiasaPage = new ListNaskahSuratBiasaPage()
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

    cy.fixture('non_cred/kepala_surat/create_data_surat_biasa.json').then((data) => {
        data_temp = data
    })
})

describe('Menu Negatif Skenario', { testIsolation: false }, () => {

    qase(412,
        it('Akses halaman konsep naskah setelah logout', () => {
            menuPage.navigateKonsepNaskahPage()
        })
    )

    qase(413,
        it('Akses halaman kotak masuk review naskah setelah logout', () => {
            menuPage.navigateKotakMasukReviewNaskahPage()
        })
    )

    qase(414,
        it('Akses halaman kotak masuk tindak lanjut setelah logout', () => {
            menuPage.navigateKotakMasukTindakLanjutPage()
        })
    )

    qase(415,
        it('Akses halaman kotak keluar review naskah setelah logout', () => {
            menuPage.navigateKotakKeluarReviewNaskahPage()
        })
    )

    qase(416,
        it('Akses halaman kotak keluar tindak lanjut setelah logout', () => {
            menuPage.navigateKotakKeluarTindakLanjutPage()
        })
    )

    qase(3467,
        it('Cek tampilan icon sertifikat elektronik jika SE tidak aktif', () => {
            // Login
            loginPage.loginViaV1(user.user_not_registered, user.password)
            loginPage.directLogin()

            menuPage.checkIconSE('Tidak Aktif')
        })
    )

    qase(3470,
        it('Cek tampilan icon sertifikat elektronik saat di hover jika SE tidak aktif', () => {
            menuPage.checkHoverIconSE('Tidak Aktif')
        })
    )

    qase(3475,
        it('Cek tampilan icon BSRE jika BSRE tidak aktif', () => {
            menuPage.checkIconBSRE('Tidak Aktif')
        })
    )

    qase(3477,
        it('Cek tampilan icon BSRE saat di hover jika BSRE tidak aktif', () => {
            menuPage.checkHoverIconBSRE('Tidak Aktif')

            cy.wait(6000)
            loginPage.logoutV2step2()
        })
    )

    qase([3471, 3472, 3481],
        it.skip('Cek tombol tandatangani jika SE tidak aktif dan BSRE aktif', () => {
            // Login
            loginPage.loginViaV1(user.user_se_not_active, user.password)
            loginPage.directLogin()

            // Isi data surat
            listNaskahSuratBiasaPage.goToKonsepNaskahSuratBiasa()
            createSuratBiasaPage.inputKakiSuratPenandatanganDiriSendiri(
                data_temp.kaki_surat[0].penandatangan_se_not_active)
            createSuratBiasaPage.inputKepalaSurat(
                data_temp.env[0].staging,
                data_temp.kepala_surat[7].tempat1,
                data_temp.kepala_surat[0].tujuan1,
                data_temp.kepala_surat[1].lokasi,
                data_temp.kepala_surat[2].kode_klasifikasi,
                data_temp.kepala_surat[3].unit_pengolah,
                data_temp.kepala_surat[4].sifat_surat,
                data_temp.kepala_surat[5].urgensi_surat,
                data_temp.kepala_surat[6].perihal8)
            createSuratBiasaPage.inputBadanNaskahSkenarioRegression(faker.lorem.paragraphs(13, '<br/>\n'))

            // Cek tombol tandatangani jika user SE tidak aktif 3471
            menuPage.checkBtnTandatangani('SE tidak aktif')

            // Cek hover tombol tandatangani jika user SE tidak aktif 3472, 3481
            menuPage.checkHoverBtnTandatangani('SE tidak aktif')

            cy.wait(6000)
            loginPage.logoutV2step2()
        })
    )

    qase([3478, 3479, 3483],
        it.skip('Cek tombol tandatangani jika SE aktif dan BSRE tidak aktif', () => {
            // Login
            loginPage.loginViaV1(user.user_bsre_not_active, user.password)
            loginPage.directLogin()

            // Isi data surat
            listNaskahSuratBiasaPage.goToKonsepNaskahSuratBiasa()
            createSuratBiasaPage.inputKakiSuratPenandatanganDiriSendiri(
                data_temp.kaki_surat[0].penandatangan_bsre_not_active)
            createSuratBiasaPage.inputKepalaSurat(
                data_temp.env[0].staging,
                data_temp.kepala_surat[7].tempat1,
                data_temp.kepala_surat[0].tujuan1,
                data_temp.kepala_surat[1].lokasi,
                data_temp.kepala_surat[2].kode_klasifikasi,
                data_temp.kepala_surat[3].unit_pengolah,
                data_temp.kepala_surat[4].sifat_surat,
                data_temp.kepala_surat[5].urgensi_surat,
                data_temp.kepala_surat[6].perihal8)
            createSuratBiasaPage.inputBadanNaskahSkenarioRegression(faker.lorem.paragraphs(13, '<br/>\n'))

            // Cek tombol tandatangani jika user SE tidak aktif 3471
            menuPage.checkBtnTandatangani('BSRE tidak aktif')

            // Cek hover tombol tandatangani jika user SE tidak aktif 3472, 3481
            menuPage.checkHoverBtnTandatangani('BSRE tidak aktif')

            cy.wait(6000)
            loginPage.logoutV2step2()
        })
    )
})