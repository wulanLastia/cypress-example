import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { MenuPage } from "@pages/sidebar/menu/menu.cy"
import { NaskahKeluarPage } from "@pages/sidebar/menu_uk_up/naskah_keluar/naskah_keluar.cy"

let loginPage = new LoginPage()
let menuPage = new MenuPage()
let naskahKeluarPage = new NaskahKeluarPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)

    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.intercept({ resourceType: /xhr/ }, { log: false })
})

describe('Menu UK dan UP - Filter Naskah Keluar UK', { testIsolation: false }, () => {

    qase(4838,
        it('Akses halaman naskah keluar', () => {
            // Login 
            loginPage.loginViaV1(user.user_uk_diskominfo, user.password)
            loginPage.directLogin()

            // Akses halaman naskah keluar
            menuPage.goToNaskahKeluar()
        })
    )

    qase([4951, 5590, 5591],
        it('Naskah Keluar UK - Filter Mode Distribusi', () => {
            // Select filter mode distribusi 4951
            naskahKeluarPage.checkModeDistribusi()

            // Select filter mode distribusi "Telah Terdistribusi" 5590
            naskahKeluarPage.selectModeDistribusi(1)

            // Select filter mode distribusi "Distribusi luar Sidebar" 5591
            naskahKeluarPage.selectModeDistribusi(2)

            // Select default "Semua"
            naskahKeluarPage.selectModeDistribusi(0)
        })
    )

    qase([5598, 5599, 5603, 5604, 5605, 5606, 5601],
        it('Naskah Keluar UK - Filter Urgensi', () => {
            // Select filter urgensi 5598
            naskahKeluarPage.checkFilterUrgensi()

            // Select checkbox urgensi biasa 5599
            naskahKeluarPage.selectUrgensi(1)
            naskahKeluarPage.clearFilterUrgensi()

            // Select checkbox urgensi penting 5603
            naskahKeluarPage.selectUrgensi(2)
            naskahKeluarPage.clearFilterUrgensi()

            // Select checkbox urgensi segera 5604
            naskahKeluarPage.selectUrgensi(3)
            naskahKeluarPage.clearFilterUrgensi()

            // Select checkbox urgensi amat segera 5605
            naskahKeluarPage.selectUrgensi(4)
            naskahKeluarPage.clearFilterUrgensi()

            // Select multiple checkbox 5606
            naskahKeluarPage.selectUrgensi(0)
            naskahKeluarPage.clearFilterUrgensi()

            // Close filter urgensi 5601
            naskahKeluarPage.closeFilterUrgensi()
        })
    )

    qase([5616, 5625, 5627, 5623, 5618],
        it('Naskah Keluar UK - Filter Jenis', () => {
            // Select filter jenis naskah 5616
            naskahKeluarPage.checkFilterJenis()

            // Search jenis naskah 5625
            naskahKeluarPage.searchJenisNaskah('Berita Acara')
            naskahKeluarPage.clearJenisNaskah()

            // Select checkbox urgensi penting 5627
            naskahKeluarPage.checkFilterJenis()
            naskahKeluarPage.selectJenisNaskah('Berita Acara', 2)
            naskahKeluarPage.clearJenisNaskah()

            // Select multiple checkbox jenis naskah 5623
            naskahKeluarPage.checkFilterJenis()
            naskahKeluarPage.selectJenisNaskah('Berita Acara', 2)
            naskahKeluarPage.selectJenisNaskah('Nota Dinas', 3)

            // Close filter urgensi 5618
            naskahKeluarPage.closeFilterJenisNaskah()
        })
    )
})