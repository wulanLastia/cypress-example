import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../support/pages/sidebar/menu/menu.cy"
import { PengambilanNomorUrutPage } from "../../../../support/pages/sidebar/pengambilan_nomor_urut/pengambilan_nomor_urut.cy"
import { GenerateNomorMultiplePage } from "../../../../support/pages/sidebar/pengambilan_nomor_urut/generate_nomor_multiple.cy"

let pengambilanNomorUrutPage = new PengambilanNomorUrutPage()
let generateNomorMultiple = new GenerateNomorMultiplePage()
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

describe('Generate Nomor Multiple', { testIsolation: false }, () => {

    qase([1006, 1009, 1684],
        it('Cek pop up detail konfirmasi pemesanan nomor urut multiple', () => {
            // Akses menu pengambilan nomor
            menuPage.goToPengambilanNomor()

            // Isi seluruh field form
            pengambilanNomorUrutPage.inputJenisNaskah(jenis_naskah.jenis_naskah1)
            pengambilanNomorUrutPage.inputUKUP(uk_up.uk_kadispusipda)
            pengambilanNomorUrutPage.inputJumlahPengambilan(jumlah_pengambilan.multiple_2)

            // Cek popup
            generateNomorMultiple.checkPopupPengambilanNomorMultiple(jenis_naskah.jenis_naskah1, uk_up.uk_kadispusipda, jumlah_pengambilan.multiple_2)
        })
    )

    qase(1688,
        it('Cek fungsi tombol Batal', () => {
            generateNomorMultiple.batalMengambilNomorUrut()
        })
    )

    qase(1686,
        it('Cek fungsi tombol Dapatkan nomor urut', () => {
            // Isi seluruh field form
            pengambilanNomorUrutPage.inputJenisNaskah(jenis_naskah.jenis_naskah1)
            pengambilanNomorUrutPage.inputUKUP(uk_up.uk_kadispusipda)
            pengambilanNomorUrutPage.inputJumlahPengambilan(jumlah_pengambilan.multiple_2)

            // Cek popup
            generateNomorMultiple.checkPopupPengambilanNomorMultiple(jenis_naskah.jenis_naskah1, uk_up.uk_kadispusipda, jumlah_pengambilan.multiple_2)

            // Cek popup berhasil dapatkan nomor urut multiple
            generateNomorMultiple.checkPopupDapatkanNomorUrutMultiple()
        })
    )

    qase(1687,
        it('Cek fungsi tombol Selesai', () => {
            generateNomorMultiple.checkBtnSelesaiMendapatkanNomorMultiple()
        })
    )

    qase(1689,
        it('Cek kesesuaian nomor urut', () => {
            generateNomorMultiple.checkNomorUrutMultiple()
        })
    )

})