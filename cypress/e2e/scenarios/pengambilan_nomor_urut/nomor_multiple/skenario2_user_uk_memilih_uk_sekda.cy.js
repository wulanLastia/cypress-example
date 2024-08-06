import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../support/pages/sidebar/menu/menu.cy"
import { PengambilanNomorUrutPage } from "../../../../support/pages/sidebar/pengambilan_nomor_urut/pengambilan_nomor_urut.cy"
import { GenerateNomorMultiplePage } from "../../../../support/pages/sidebar/pengambilan_nomor_urut/generate_nomor_multiple.cy"
import { ListRiwayatPage } from "../../../../support/pages/sidebar/pengambilan_nomor_urut/list_riwayat.cy"

let pengambilanNomorUrutPage = new PengambilanNomorUrutPage()
let generateNomorMultiplePage = new GenerateNomorMultiplePage()
let listRiwayatPage = new ListRiwayatPage()
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

afterEach(() => {
    cy.wait(3000)

    loginPage.logoutV2step2()
})

describe('Pengambilan nomor urut oleh user UK Dispusida memilih UK Setda', () => {

    qase([1006, 1109, 1009, 1684, 1686, 1687, 1688, 1689],
        it('Create nomor urut multiple', () => {
            // Login
            loginPage.loginViaV1(user.nip_uk, user.password)
            loginPage.directLogin()

            // Akses menu pengambilan nomor
            menuPage.goToPengambilanNomor()

            // Isi seluruh field form
            pengambilanNomorUrutPage.inputJenisNaskah(jenis_naskah.jenis_naskah1)
            pengambilanNomorUrutPage.inputUKUP(uk_up.uk_setda)
            pengambilanNomorUrutPage.inputJumlahPengambilan(jumlah_pengambilan.multiple_2)

            // Cek detail popup
            generateNomorMultiplePage.checkPopupPengambilanNomorMultiple(jenis_naskah.jenis_naskah1, uk_up.uk_setda, jumlah_pengambilan.multiple_2)

            // Dapatkan nomor urut
            generateNomorMultiplePage.checkPopupDapatkanNomorUrutMultiple()

            // Selesai mendapatkan nomor
            generateNomorMultiplePage.checkBtnSelesaiMendapatkanNomorMultiple()

            // Cek tombol aksi
            listRiwayatPage.checkBtnAksi()

            // Check tampilan badge status
            listRiwayatPage.checkTampilanStatusBelumRegistrasi()

            // Validasi pada list UK yang bersangkutan
            generateNomorMultiplePage.checkNomorUrutMultiple()
        })
    )

    qase(1703,
        it('Cek list bank nomor akun UK Setda setelah UK dinas lain (dispusipda) mengambil nomor multiple', () => {
            // Login
            loginPage.loginViaV1(user.nip_uk_setda, user.password)
            loginPage.directLogin()

            // Validasi data pada list UK yang mengambil diluar organisasinya
            listRiwayatPage.validasiNomorUrutDiluarOrgMultiple()
        })
    )

})
