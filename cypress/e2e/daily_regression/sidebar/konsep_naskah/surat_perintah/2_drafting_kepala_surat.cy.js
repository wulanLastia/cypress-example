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
let testKepalaPositive
let testKepalaNegative


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
    cy.intercept({ resourceType: /xhr/ }, { log: false })
})

before(() => {
    cy.fixture('non_cred/surat_perintah/kepala_surat/negative/kepala_surat_super_negative.json').then((data) => {
        testKepalaNegative = data
    })
})

before(() => {
    cy.fixture('non_cred/surat_perintah/kepala_surat/positive/kepala_surat_super_positive.json').then((data) => {
        testKepalaPositive = data
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
            draftingKepalaSuratPerintahPage.inputKodeKlasifikasi(testKepalaPositive.Kepala_Surat[0].Kode_Klasifikasi)
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
            draftingKepalaSuratPerintahPage.inputUnitPengolah(testKepalaPositive.Kepala_Surat[1].Unit_Pengolah)
        })
    )

    qase(1469,
        it('Check on preview page if unit pengolah text is too long (typing method)', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputUnitPengolahLongText("{selectall}{backspace}" + testKepalaNegative.TextTooLong[0].Unit_Pengolah)
        })
    )

    qase(1469,
        it.skip('Check on preview page if unit pengolah text is too long (copy-paste method)', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.pasteUnitPengolahLongText(testKepalaNegative.TextTooLong[0].Unit_Pengolah)
        })
    ) // Remove skip when it's already fixed

    qase(1739,
        it('Cek Dropdown Urgensi', () => {
            cy.wait(10000)
            draftingKepalaSuratPerintahPage.validateUrgensi(testKepalaPositive.Kepala_Surat[2].Urgensi_Nota_Dinas)
        })
    )

    qase([144, 735, 742],
        it('Cek Perihal Surat', () => {
            draftingKepalaSuratPerintahPage.inputPerihal(testKepalaPositive.Kepala_Surat[3].Perihal)
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
        it('Input table on Dasar Field', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputTableOnDasar()
            draftingKepalaSuratPerintahPage.clearDasarField()
        })
    )

    qase(721,
        it('Input Text Bold on Dasar Field', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputBoldTextOnDasar(testKepalaPositive.Dasar[0].Dasar_Bold)
            draftingKepalaSuratPerintahPage.clearDasarField()
        })
    )

    qase(721,
        it('Input Text Italic on Dasar Field', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputItalicTextOnDasar(testKepalaPositive.Dasar[1].Dasar_Italic)
            draftingKepalaSuratPerintahPage.clearDasarField()
        })
    )

})


describe('[Negative] Drafting Kepala Surat Skenario', { testIsolation: false }, () => {
    qase(1423,
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

    // Start Kepala Surat Negative Case (Input Long Text)
    qase(1466,
        it('Input more than 50 characters', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputKodeKlasifikasi(testKepalaPositive.Kepala_Surat[0].Kode_Klasifikasi)
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputUnitPengolah(testKepalaNegative.TextTooLong[0].Unit_Pengolah)
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.validateUrgensi(testKepalaPositive.Kepala_Surat[2].Urgensi_Nota_Dinas)
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputPerihal(testKepalaNegative.TextTooLong[1].Perihal)
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputFreeTextOnDasar(testKepalaNegative.TextTooLong[2].Dasar_Free_Text)
            cy.wait(3000)
            // draftingSuratPerintahPage.negativeKirimNaskah() // Kirim Naskah Sedang di Develop
        })
    )
    // End of Kepala Surat Negative Case (Input Long Text)


    // Start Kepala Surat Negative Case (JS Scirpt)
    qase(1461,
        it('Input Tag Script', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputUnitPengolah("{selectall}{backspace}" + testKepalaNegative.TagScript[0].Unit_Pengolah)
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputPerihal("{selectall}{backspace}" + testKepalaNegative.TagScript[1].Perihal)
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputFreeTextOnDasar("{selectall}{backspace}" + testKepalaNegative.TagScript[2].Dasar_Free_Text)
            cy.wait(3000)
            // draftingSuratPerintahPage.negativeKirimNaskah() // Kirim Naskah Sedang di Develop
        })
    )
    // End of Kepala Surat Negative Case (JS Scirpt)


    // Start Kepala Surat Negative Case (HTML Scirpt)
    qase(1462,
        it('Input tag HTML', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputUnitPengolah("{selectall}{backspace}" + testKepalaNegative.TagHTML[0].Unit_Pengolah)
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputPerihal("{selectall}{backspace}" + testKepalaNegative.TagHTML[1].Perihal)
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputFreeTextOnDasar("{selectall}{backspace}" + testKepalaNegative.TagHTML[2].Dasar_Free_Text)
            cy.wait(3000)
            // draftingSuratPerintahPage.negativeKirimNaskah() // Kirim Naskah Sedang di Develop
        })
    )
    // End of Kepala Surat Negative Case (HTML Scirpt)


    // Start Kepala Surat Negative Case (Whitespace)
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
            draftingKepalaSuratPerintahPage.inputPerihal("{selectall}{backspace}{shift}{enter}")
            draftingKepalaSuratPerintahPage.aksesFormEditingKepalaSurat() // for Trigerring Only and Remove Focused Element on Many Dropdown Data

            cy.wait(3000)
            // draftingSuratPerintahPage.negativeKirimNaskah() // Kirim Naskah Sedang di Develop           
        })
    )
    // End Kepala Surat Negative Case (Whitespace)


    // Start Kepala Surat Negative Case (XSS Scirpt)
    qase(1461,
        it('Input XSS Injection Script', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputUnitPengolah("{selectall}{backspace}" + testKepalaNegative.XSSInjection[0].Unit_Pengolah)
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputPerihal("{selectall}{backspace}" + testKepalaNegative.XSSInjection[1].Perihal)
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputFreeTextOnDasar("{selectall}{backspace}" + testKepalaNegative.XSSInjection[2].Dasar_Free_Text)
            cy.wait(3000)
            // draftingSuratPerintahPage.negativeKirimNaskah() // Kirim Naskah Sedang di Develop
        })
    )
    // End of Kepala Surat Negative Case (XSS Scirpt)


    // Start Kepala Surat Negative Case (URL)
    qase(1463,
        it('Input URL', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputUnitPengolah("{selectall}{backspace}" + testKepalaNegative.URLFormat[0].Unit_Pengolah)
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputPerihal("{selectall}{backspace}" + testKepalaNegative.URLFormat[1].Perihal)
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputFreeTextOnDasar("{selectall}{backspace}" + testKepalaNegative.URLFormat[2].Dasar_Free_Text)
            cy.wait(3000)
            // draftingSuratPerintahPage.negativeKirimNaskah() // Kirim Naskah Sedang di Develop
        })
    )
    // End of Kepala Surat Negative Case (URL)


     // Start Kepala Surat Negative Case (Emoji)
    qase(1460,
        it('Input Emoji', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputUnitPengolah("{selectall}{backspace}" + testKepalaNegative.EmojiFormat[0].Unit_Pengolah)
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputPerihal("{selectall}{backspace}" + testKepalaNegative.EmojiFormat[1].Perihal)
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputFreeTextOnDasar("{selectall}{backspace}" + testKepalaNegative.EmojiFormat[2].Dasar_Free_Text)
            cy.wait(3000)
            // draftingSuratPerintahPage.negativeKirimNaskah() // Kirim Naskah Sedang di Develop
        })
    )
    // End of Kepala Surat Negative Case (Emoji)


    // Start Kepala Surat Negative Case (whitespace at the beginning and at the end of the input)
    qase(1465,
        it('Input whitespace at the beginning and at the end of the input', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputKodeKlasifikasi("{selectall}{backspace}{shift}{enter}" + testKepalaPositive.Kepala_Surat[0].Kode_Klasifikasi + "{shift}{enter}")
            draftingKepalaSuratPerintahPage.aksesFormEditingKepalaSurat() // for Trigerring Only and Remove Focused Element on Many Dropdown Data

            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputUnitPengolah("{selectall}{backspace}{shift}{enter}" + testKepalaNegative.XSSInjection[0].Unit_Pengolah + "{shift}{enter}")
            draftingKepalaSuratPerintahPage.aksesFormEditingKepalaSurat() // for Trigerring Only and Remove Focused Element on Many Dropdown Data

            cy.wait(3000)
            draftingKepalaSuratPerintahPage.deleteUrgensi()

            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputPerihal("{selectall}{backspace}{shift}{enter}" + testKepalaNegative.XSSInjection[1].Perihal + "{shift}{enter}")
            draftingKepalaSuratPerintahPage.aksesFormEditingKepalaSurat() // for Trigerring Only and Remove Focused Element on Many Dropdown Data

            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputWhitespaceOnTextInDasar("{selectall}{backspace}{shift}{enter}" + testKepalaNegative.XSSInjection[1].Perihal + "{enter}{enter}" + testKepalaNegative.TextTooLong[2].Dasar_Free_Text + "{shift}{enter}")
            draftingKepalaSuratPerintahPage.aksesFormEditingKepalaSurat() // for Trigerring Only and Remove Focused Element on Many Dropdown Data
            cy.wait(3000)
            // draftingSuratPerintahPage.negativeKirimNaskah() // Kirim Naskah Sedang di Develop           
        })
    )

    // End Kepala Surat Negative Case (whitespace at the beginning and at the end of the input)

    
    // Start Kepala Surat Negative Case (BLANK FIELD)
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
    // End Kepala Surat Negative Case (BLANK FIELD)




})
