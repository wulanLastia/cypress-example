import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../../support/pages/sidebar/menu/menu.cy"
import { DraftingKepalaSuratPerintahPage } from "../../../../../support/pages/sidebar/konsep_naskah/surat_perintah/super_drafting_kepala_surat.cy"
import { DraftingSuratPerintahPage } from "../../../../../support/pages/sidebar/konsep_naskah/surat_perintah/pgs_drafting_surat_perintah.cy"

let draftingKepalaSuratPerintahPage = new DraftingKepalaSuratPerintahPage()
let draftingSuratPerintahPage = new DraftingSuratPerintahPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user
let testKepalaNegative


before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })
    cy.intercept({ resourceType: /xhr/ }, { log: false })
})

before(() => {
    cy.fixture('non_cred/surat_perintah/kepala_surat/negative/kepala_surat_super_negative.json').then((data) => {
        testKepalaNegative = data;
    })
})

before(() => {
    loginPage.loginViaV1(user.nip, user.password)

    
    loginPage.directLogin()
    cy.wait(1000)
    draftingSuratPerintahPage.gotoKonsepNaskahSuratPerintah()

    cy.wait(3999)
})

after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})



describe('Drafting Kepala Surat Skenario', { testIsolation: false }, () => {
    qase(1423,
        it('Akses form editing kepala surat', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.aksesFormEditingKepalaSurat()
        })
    )

    qase([1424, 1426],
        it('Cek detail preview & form kepala naskah', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.checkDetailPreview()
        })
    )

    qase([1457, 1459],
        it('Cek Field Kode Klasifikasi', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputKodeKlasifikasi("SK (Semua Klasifikasi)")
        })
    )

    qase(1458,
        it('Batal memilih kode klasifikasi surat', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.deleteKlasifikasi()
        })
    )

    qase(1737,
        it('Cek Field Unit Pengolah', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputUnitPengolah("PAD")
        })
    )

    qase(1469,
        it('Check on preview page if unit pengolah text is too long (typing method)', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputUnitPengolahLongText("{selectall}{backspace}" + testKepalaNegative.Kepala_Surat[1].Unit_Pengolah)
        })
    )

    qase(1469,
        it.skip('Check on preview page if unit pengolah text is too long (copy-paste method)', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.pasteUnitPengolahLongText(testKepalaNegative.Kepala_Surat[1].Unit_Pengolah)
        })
    ) // Remove skip when it's already fixed

    qase(1739,
        it('Cek Dropdown Urgensi', () => {
            cy.wait(10000)
            draftingKepalaSuratPerintahPage.validateUrgensi("Amat Segera")
        })
    )

    qase([144, 735, 742],
        it('Cek Perihal Surat', () => {
            draftingKepalaSuratPerintahPage.inputPerihal("Tujuan Kepala Surat - Internal - Lampiran")
            cy.wait(3000)
            })
    )

    qase(1425,
        it('Menutup form kepala naskah', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.closeKepalaSurat()
            cy.wait(3000)
        })
    )

    
})


describe('Free Text on Dasar Field', { testIsolation: false }, () => {
    qase(721,
        it('Akses field Dasar', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputTableOnDasar()
            draftingKepalaSuratPerintahPage.clearDasarField()
        })
    )

})


describe('[Negative] Drafting Kepala Surat Skenario', { testIsolation: false }, () => {
    qase(721,
        it('Akses form editing kepala surat', () => {
            // Clear Cache & Login
            cy.then(Cypress.session.clearCurrentSessionData)

            loginPage.loginViaV1(user.nip, user.password)
            loginPage.directLogin()
            draftingSuratPerintahPage.gotoKonsepNaskahSuratPerintah()
        

            cy.wait(3000)
            draftingKepalaSuratPerintahPage.aksesFormEditingKepalaSurat()
        })
    )


    // Start Tujuan Kepala Surat Negative Case (JS Scirpt)
    qase(1461,
        it('Input Tag Script', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputKodeKlasifikasi("SK (Semua Klasifikasi)")
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputUnitPengolah("Test JS Script <script>alert('Executing JS')</script>")
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.validateUrgensi("Amat Segera")
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputPerihal("Test JS Script <script>alert('Executing JS')</script>")
            cy.wait(3000)
            // draftingSuratPerintahPage.negativeKirimNaskah() // Kirim Naskah Sedang di Develop
        })
    )
    // End of Tujuan Kepala Surat Negative Case (JS Scirpt)


    // Start Tujuan Kepala Surat Negative Case (HTML Scirpt)
    qase(1462,
        it('Input tag HTML', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputUnitPengolah("{selectall}{backspace}<blink>Hello World</blink>")
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputPerihal("{selectall}{backspace}<blink>Hello World</blink>")
            cy.wait(3000)
            // draftingSuratPerintahPage.negativeKirimNaskah() // Kirim Naskah Sedang di Develop
        })
    )
    // End of Tujuan Kepala Surat Negative Case (HTML Scirpt)


    // Start Tujuan Kepala Surat Negative Case (Whitespace)
    qase(1467,
        it('Input only whitespace', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputKodeKlasifikasi("{selectall}{backspace}{shift}{enter}")
            draftingKepalaSuratPerintahPage.aksesFormEditingKepalaSurat() // for Trigerring Only and Remove Focused Element on Many Dropdown Data

            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputUnitPengolah("{selectall}{backspace}{shift}{enter}")
            draftingKepalaSuratPerintahPage.aksesFormEditingKepalaSurat() // for Trigerring Only and Remove Focused Element on Many Dropdown Data

            cy.wait(3000)
            draftingKepalaSuratPerintahPage.deleteUrgensi()

            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputPerihal("{shift}{enter}")
            draftingKepalaSuratPerintahPage.aksesFormEditingKepalaSurat() // for Trigerring Only and Remove Focused Element on Many Dropdown Data

            cy.wait(3000)
            // draftingSuratPerintahPage.negativeKirimNaskah() // Kirim Naskah Sedang di Develop           
        })
    )
    // End Tujuan Kepala Surat Negative Case (Whitespace)


    // Start Tujuan Kepala Surat Negative Case (XSS Scirpt)
    qase([305, 91, 839, 109, 122, 137],
        it('Input XSS Injection Script', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputUnitPengolah("{selectall}{backspace}'-prompt()-'")
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputPerihal("{selectall}{backspace}'-prompt()-'")
            cy.wait(3000)
            // draftingSuratPerintahPage.negativeKirimNaskah() // Kirim Naskah Sedang di Develop
        })
    )
    // End of Tujuan Kepala Surat Negative Case (XSS Scirpt)

    
    // Start Tujuan Kepala Surat Negative Case (BLANK FIELD)
    qase(1464,
        it('Blank Field Kepala Surat', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputKodeKlasifikasi("{selectall}{backspace}{esc}")
            draftingKepalaSuratPerintahPage.aksesFormEditingKepalaSurat() // for Trigerring Only and Remove Focused Element on Many Dropdown Data

            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputUnitPengolah("{selectall}{backspace}{esc}")
            draftingKepalaSuratPerintahPage.aksesFormEditingKepalaSurat() // for Trigerring Only and Remove Focused Element on Many Dropdown Data

            cy.wait(3000)
            draftingKepalaSuratPerintahPage.deleteUrgensi()

            cy.wait(3000)
            draftingKepalaSuratPerintahPage.deletePerihal()
            draftingKepalaSuratPerintahPage.aksesFormEditingKepalaSurat() // for Trigerring Only and Remove Focused Element on Many Dropdown Data

            cy.wait(3000)
            // draftingSuratPerintahPage.negativeKirimNaskah() // Kirim Naskah Sedang di Develop           
        })
    )

    // End Tujuan Kepala Surat Negative Case (BLANK FIELD)

})
