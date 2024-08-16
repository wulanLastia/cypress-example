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
            loginPage.loginViaV1(user.user_uk_disdik, user.password)
            loginPage.directLogin()

            // Akses halaman naskah keluar
            menuPage.goToNaskahKeluar()
        })
    )

    qase([4951, 5596],
        it('Naskah Keluar UK - Filter Mode Distribusi', () => {
            // Select filter mode distribusi 4951
            naskahKeluarPage.checkModeDistribusi()

            // Select filter mode distribusi when data not available on list 5596
            naskahKeluarPage.selectModeDistribusi(1)
        })
    )

    qase([5598, 5602],
        it('Naskah Keluar UK - Filter Urgensi', () => {
            // Select filter urgensi 5598
            naskahKeluarPage.checkFilterUrgensi()

            // Select filter urgensi when data not available on list 5599
            naskahKeluarPage.selectUrgensi(1)
            naskahKeluarPage.closeFilterUrgensi()
        })
    )

    qase([5616, 5619],
        it('Naskah Keluar UK - Filter Jenis', () => {
            // Select filter jenis naskah 5616
            naskahKeluarPage.checkFilterJenis()

            // Select filter jenis naskah when data not available on list 5619
            naskahKeluarPage.searchJenisNaskah('Surat Perintah')
        })
    )
})