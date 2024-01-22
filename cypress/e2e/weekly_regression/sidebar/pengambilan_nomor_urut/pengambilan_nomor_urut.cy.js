import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../support/pages/sidebar/menu/menu.cy"
import { PengambilanNomorUrutPage } from "../../../../support/pages/sidebar/pengambilan_nomor_urut/pengambilan_nomor_urut.cy"

let pengambilanNomorUrutPage = new PengambilanNomorUrutPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user
let jenis_naskah
let uk_up
let jumlah_pengambilan

beforeEach(() => {
    cy.intercept({ resourceType: /xhr/ }, { log: false })
})

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)

    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.fixture('non_cred/penomoran/jenis_naskah.json').then((data) => {
        jenis_naskah = data
    })

    cy.fixture('non_cred/penomoran/uk_up.json').then((data) => {
        uk_up = data
    })

    cy.fixture('non_cred/penomoran/jumlah_pengambilan.json').then((data) => {
        jumlah_pengambilan = data
    })

    
})

before(() => {
    loginPage.loginViaV1(user.nip, user.password)
    loginPage.directLogin()
})

after(() => {
    loginPage.logoutV2step2()
})

describe('Pengambilan Nomor Urut (Drafting Luar)', { testIsolation: false }, () => {

    qase(1006,
        it('Akses halaman Pengambilan Nomor', () => {
            menuPage.goToPengambilanNomor()
        })
    )

    qase(1007,
        it('Cek detail form ambil nomor', () => {
            pengambilanNomorUrutPage.checkForm()
        })
    )

    qase(1008,
        it('Cek tombol ambil nomor jika belum mengisi field kategori jenis naskah', () => {
            pengambilanNomorUrutPage.checkBtnAmbilNomorBeforeJenisNaskah()
        })
    )

    qase(1010,
        it('Cek tombol ambil nomor jika belum mengisi field UK/UP', () => {
            pengambilanNomorUrutPage.checkBtnAmbilNomorBeforeUKUP()
        })
    )

    qase(1011,
        it('Cek field UK/UP jika belum mengisi field kategori jenis naskah', () => {
            pengambilanNomorUrutPage.checkFilterUKUPBeforeJenisNaskah()
        })
    )

    qase(1105,
        it('Cek dropdown list kategori jenis naskah jika role user biasa', () => {
            pengambilanNomorUrutPage.checkFilterJenisNaskahUserBiasa()
        })
    )

    qase(1109,
        it('Cek tombol ambil nomor jika sudah mengisi seluruh field', () => {
            pengambilanNomorUrutPage.inputJenisNaskah(jenis_naskah.jenis_naskah1)
            pengambilanNomorUrutPage.inputUKUP(uk_up.uk_kadispusipda)
            pengambilanNomorUrutPage.checkBtnAmbilNomor('enable')
        })
    )

    qase(1675,
        it('[Negative] Mengosongkan field  jumlah pengambilan', () => {
            // Isi seluruh field form
            pengambilanNomorUrutPage.inputJenisNaskah(jenis_naskah.jenis_naskah1)

            // Cek field
            pengambilanNomorUrutPage.validateJumlahPengambilan(jumlah_pengambilan.kosong)
        })
    )

    qase(1676,
        it('[Negative] Mengisikan field jumlah pengambilan 0', () => {
            // Cek field
            pengambilanNomorUrutPage.validateJumlahPengambilan(jumlah_pengambilan.kurang_dari)
        })
    )

    qase(1677,
        it('[Negative] Mengisikan field jumlah pengambilan > 50', () => {
            // Cek field
            pengambilanNomorUrutPage.validateJumlahPengambilan(jumlah_pengambilan.lebih_dari)
        })
    )

    qase(1678,
        it('Cek field jumlah pengambilan jika dropdown jenis surat dinas', () => {
            // Isi seluruh field form
            pengambilanNomorUrutPage.inputJenisNaskah(jenis_naskah.jenis_naskah1)

            // Cek field
            pengambilanNomorUrutPage.checkFieldJumlahPengambilan()
        })
    )

    qase(1679,
        it('Cek field jumlah pengambilan jika dropdown jenis nota dinas', () => {
            // Isi seluruh field form
            pengambilanNomorUrutPage.inputJenisNaskah(jenis_naskah.jenis_naskah2)

            // Cek field
            pengambilanNomorUrutPage.checkFieldJumlahPengambilan()
        })
    )
})
