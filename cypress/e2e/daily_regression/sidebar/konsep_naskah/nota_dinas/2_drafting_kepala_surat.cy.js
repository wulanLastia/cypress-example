import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../../support/pages/sidebar/menu/menu.cy"
import { DraftingKepalaSuratNotaDinasPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/nodin_drafting_kepala_surat.cy"
import { DraftingNotaDinasPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/pgs_drafting_nota_dinas.cy"
import { CreateNotaDinasPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/pgs_create_nota_dinas.cy"

let draftingKepalaSuratNotaDinasPage = new DraftingKepalaSuratNotaDinasPage()
let createNotaDinasPage = new CreateNotaDinasPage()
let draftingNotaDinasPage = new DraftingNotaDinasPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })
    cy.intercept({ resourceType: /xhr/ }, { log: false })
})

before(() => {
    loginPage.loginViaV1(user.nip, user.password)
    loginPage.directLogin()
    createNotaDinasPage.gotoNotaDinas()
})

after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})



describe('Drafting Kepala Surat Skenario', { testIsolation: false }, () => {
    qase(721,
        it('Akses form editing kepala surat', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat()
        })
    )

    qase([723, 725],
        it('Cek detail preview & form kepala naskah', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.checkDetailPreview()
        })
    )

    qase([722, 726],
        it('Cek radio button Kepala Surat', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.clickRButton1KepalaSurat()
        })
    )

    qase(739,
        it('Delete Tujuan', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTujuan("I Gusti Agung Kim Fajar")
            
            draftingKepalaSuratNotaDinasPage.addTujuan()
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTujuanField2("Ludia Rosema")

            draftingKepalaSuratNotaDinasPage.deleteField1TujuanSurat()
        })
    )
    
    qase([745, 746, 742, 735, 738],
        it('Cek tujuan kepala surat INTERNAL', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTujuan("I Gusti Agung Kim Fajar")
            
            draftingKepalaSuratNotaDinasPage.addTujuan()
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTujuanField2("Ludia Rosema")
            
            draftingKepalaSuratNotaDinasPage.addTujuan()
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTujuanField3("Zenal Mustopa")
            })
    )

    qase(725,
        it('Cek Tembusan Surat INTERNAL', () => {
            draftingKepalaSuratNotaDinasPage.inputTembusan("Raden Andhika")
            
            draftingKepalaSuratNotaDinasPage.addTembusan()
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTembusan2("Upar Suparno")
            })
    )

    qase(725,
        it('Cek Field Kode Klasifikasi', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputKodeKlasifikasi("SK (Semua Klasifikasi)")
        })
    )

    qase(725,
        it('Cek Field Unit Pengolah', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputUnitPengolah("PAD")
        })
    )

    qase(725,
        it('Cek Dropdown Sifat Surat', () => {
            cy.wait(10000)
            draftingKepalaSuratNotaDinasPage.validateSifatSurat("Penting")
        })
    )

    qase(725,
        it('Cek Dropdown Urgensi', () => {
            cy.wait(10000)
            draftingKepalaSuratNotaDinasPage.validateUrgensi("Amat Segera")
        })
    )

    qase([144, 735, 742],
        it('Cek Perihal Surat', () => {
            draftingKepalaSuratNotaDinasPage.inputPerihal("Tujuan Kepala Surat - Internal - Lampiran")
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.scrappingNamaJabatan()
            })
    )

    qase(724,
        it('Menutup form kepala naskah', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.closeKepalaSurat()
            cy.wait(3000)
        })
    )

    
})


describe('Drafting Lampiran Kepala Surat Skenario', { testIsolation: false }, () => {
    qase(721,
        it('Akses form editing kepala surat', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat()
        })
    )

    qase(723,
        it('Cek detail preview kepala naskah', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.checkDetailPreview()
        })
    )

    qase(725,
        it('Cek radio button Lampiran Kepala Surat', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.clickRButton2LampiranSurat()
        })
    )
    
    
    qase(725,
        it('Cek tujuan lampiran surat INTERNAL', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTujuanLampiran1("Staff Internal")

            cy.wait(3000)
        })
    )

    qase(725,
        it('Cek button Buat tujuan surat di lampiran', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.buttonBuatTujuanSuratDiLampiran()            
        })
    )

    qase(725,
        it('Cek tujuan pada Lampiran Kepala Surat', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.validateNamaJabatanLampiran()            
        })
    )

    qase(725,
        it('Cek tambah tujuan surat pada Lampiran Kepala Surat', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.addTujuanLampiranRegression("Ridwan Kamil")            
        })
    )

    qase(724,
        it('Menutup form lampiran kepala naskah', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.closeLampiranKepalaSurat()
            cy.wait(3000)
            menuPage.goToKotakMasukReviewNaskah()
            cy.wait(10000)


            loginPage.logoutV2step2()

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
            createNotaDinasPage.gotoNotaDinas()
        

            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat()
        })
    )


    // Start Tujuan Kepala Surat Negative Case (JS Scirpt)
    qase([305, 91, 839, 109, 122, 137],
        it('Input Tag Script', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTujuan("Test JS Script <script>alert('Executing JS')</script>")
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTembusan("Test JS Script <script>alert('Executing JS')</script>")
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputKodeKlasifikasi("SK (Semua Klasifikasi)")
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputUnitPengolah("Test JS Script <script>alert('Executing JS')</script>")
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.validateSifatSurat("Sangat Rahasia")
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.validateUrgensi("Amat Segera")
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputPerihal("Test JS Script <script>alert('Executing JS')</script>")
            cy.wait(3000)
            draftingNotaDinasPage.negativeKirimNaskah()
        })
    )
    // End of Tujuan Kepala Surat Negative Case (JS Scirpt)


    // Start Tujuan Kepala Surat Negative Case (HTML Scirpt)
    qase([306, 92, 840, 110, 123, 138],
        it('Input tag HTML', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTujuan("{selectall}{backspace}<blink>Hello World</blink>")
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTembusan("{selectall}{backspace}<blink>Hello World</blink>")
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputUnitPengolah("{selectall}{backspace}<blink>Hello World</blink>")
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputPerihal("{selectall}{backspace}<blink>Hello World</blink>")
            cy.wait(3000)
            draftingNotaDinasPage.negativeKirimNaskah()
        })
    )
    // End of Tujuan Kepala Surat Negative Case (HTML Scirpt)


    // Start Tujuan Kepala Surat Negative Case (Whitespace)
    qase([106, 845, 115, 119, 128, 131, 134, 143],
        it('Input only whitespace', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTujuan("{selectall}{backspace}{shift}{enter}")
            draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat() // for Trigerring Only and Remove Focused Element on Many Dropdown Data

            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTembusan("{selectall}{backspace}{shift}{enter}")
            draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat() // for Trigerring Only and Remove Focused Element on Many Dropdown Data

            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputKodeKlasifikasi("{selectall}{backspace}{shift}{enter}")
            draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat() // for Trigerring Only and Remove Focused Element on Many Dropdown Data

            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputUnitPengolah("{selectall}{backspace}{shift}{enter}")
            draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat() // for Trigerring Only and Remove Focused Element on Many Dropdown Data

            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.deleteSifatSurat()

            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.deleteUrgensi()

            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputPerihal("{shift}{enter}")
            draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat() // for Trigerring Only and Remove Focused Element on Many Dropdown Data

            cy.wait(3000)
            draftingNotaDinasPage.negativeKirimNaskah()            
        })
    )
    // End Tujuan Kepala Surat Negative Case (Whitespace)


    // Start Tujuan Kepala Surat Negative Case (XSS Scirpt)
    qase([305, 91, 839, 109, 122, 137],
        it('Input XSS Injection Script', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTujuan("{selectall}{backspace}'-prompt()-'")
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTembusan("{selectall}{backspace}'-prompt()-'")
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputUnitPengolah("{selectall}{backspace}'-prompt()-'")
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputPerihal("{selectall}{backspace}'-prompt()-'")
            cy.wait(3000)
            draftingNotaDinasPage.negativeKirimNaskah()
        })
    )
    // End of Tujuan Kepala Surat Negative Case (XSS Scirpt)

    
    // Start Tujuan Kepala Surat Negative Case (BLANK FIELD)
    qase([308, 94, 842, 112, 125, 140],
        it('Blank Field Kepala Surat', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTujuan("{selectall}{backspace}{esc}")
            draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat() // for Trigerring Only and Remove Focused Element on Many Dropdown Data

            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTembusan("{selectall}{backspace}{esc}")
            draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat() // for Trigerring Only and Remove Focused Element on Many Dropdown Data

            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputKodeKlasifikasi("{selectall}{backspace}{esc}")
            draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat() // for Trigerring Only and Remove Focused Element on Many Dropdown Data

            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputUnitPengolah("{selectall}{backspace}{esc}")
            draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat() // for Trigerring Only and Remove Focused Element on Many Dropdown Data

            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.deleteSifatSurat()

            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.deleteUrgensi()

            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.deletePerihal()
            draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat() // for Trigerring Only and Remove Focused Element on Many Dropdown Data

            cy.wait(3000)
            draftingNotaDinasPage.negativeKirimNaskah()            
        })
    )

    // End Tujuan Kepala Surat Negative Case (BLANK FIELD)





    // Start Tujuan Kepala Surat Negative Case (Long Text, Same Tujuan, Same Tembusan)
    qase(744,
        it('Check on preview if tujuan text is too long', () => {
            draftingKepalaSuratNotaDinasPage.inputTujuanLongText("But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or.")
        })
    )
    
    qase(740,
        it('Select same tujuan', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTujuan("I Gusti Agung Kim Fajar")
            
            draftingKepalaSuratNotaDinasPage.addTujuan()
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTujuanField2("I Gusti Agung Kim Fajar")

            draftingKepalaSuratNotaDinasPage.validateTujuanTidakBolehSama()
            cy.wait(3000)

            draftingKepalaSuratNotaDinasPage.deleteField1TujuanSurat()
        })
    )

    qase(743,
        it.skip('Memilih tujuan yang sama dengan tembusan', () => { // Issue ini belum di solve dari sisi product
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTujuan("I Gusti Agung Kim Fajar")

            draftingKepalaSuratNotaDinasPage.addTujuan()

            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTujuanField2("Ludia Rosema")

            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTembusan("I Gusti Agung Kim Fajar")

            draftingKepalaSuratNotaDinasPage.addTembusan()
            
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.inputTembusan2("Ludia Rosema")


            draftingKepalaSuratNotaDinasPage.validateTembusanTidakBolehSama()
        })
    )

// End of Tujuan Kepala Surat Negative Case (Long Text, Same Tujuan, Same Tembusan)

})
