import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../../../../support/pages/auth/login.cy"
import { KotakKeluarPage } from "../../../../../../../support/pages/sidebar/konsep_naskah/drafting_luar/kotak_keluar.cy"

let kotakKeluarPage = new KotakKeluarPage()
let loginPage = new LoginPage()
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

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: true })
})

before(() => {
    loginPage.loginViaV1(user.nip, user.password)
    loginPage.directLogin()
})

/*after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})*/

describe('Drafting Luar - Test Case List Kotak Keluar', { testIsolation: false }, () => {

    // LIST KOTAK KELUAR
    qase(3062,
        it('Akses menu kotak keluar', () => {
            // Go To Kotak Keluar - TTE & Review
            kotakKeluarPage.goToKotakKeluarTTEReview()
        })
    )

    qase(3063,
        it('Cek detail halaman naskah kotak keluar review naskah', () => {
            // Check detail halaman
            kotakKeluarPage.checkDetailHalamanKotakKeluar()
        })
    )

    // KOLOM URGENSI
    qase([3117, 3118, 3119, 3120],
        it('Cek warna label urgensi', () => {
            // Go To Kotak Keluar - TTE & Review
            kotakKeluarPage.goToKotakKeluarTTEReview()

            // Cek warna label
            kotakKeluarPage.checkWarnaLabelUrgensi()
        })
    )

    // KOLOM STATUS
    qase([], // @TODO : Belum dilakukan penyesuaian di sisi test qase
        it('Cek warna label status', () => {
            // Cek kolom status
            kotakKeluarPage.checkWarnaLabelStatus()
        })
    )

    // PENCARIAN
    qase(3072,
        it('Cek aksi pencarian jika kata kunci kurang dari 3 karakter', () => {
            // Input pencarian
            kotakKeluarPage.searchDokumen('Dr')
        })
    )

    qase(3073,
        it('Melakukan pencarian dengan kata kunci perihal yang tersedia pada data', () => {
            // Input pencarian
            kotakKeluarPage.searchDokumen('Automation Drafting')
        })
    )

    qase(3074,
        it('Melakukan pencarian dengan kata kunci yang tidak tersedia pada data', () => {
            // Input pencarian
            kotakKeluarPage.searchDokumen('XXX')
        })
    )

    qase(3076,
        it('Input script pada kolom pencarian', () => {
            // Input pencarian
            kotakKeluarPage.searchDokumen('<script>alert("hai")</script>')
        })
    )
})