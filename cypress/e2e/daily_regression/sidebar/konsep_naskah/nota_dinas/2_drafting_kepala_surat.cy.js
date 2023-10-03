import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../../support/pages/sidebar/menu/menu.cy"
import { DraftingKepalaSuratNotaDinasPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/nodin_drafting_kepala_surat.cy"
import { CreateNotaDinasPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/pgs_create_nota_dinas.cy"

let draftingKepalaSuratNotaDinasPage = new DraftingKepalaSuratNotaDinasPage()
let createNotaDinasPage = new CreateNotaDinasPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
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

// Start Tujuan Surat Negative Case
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
// End of Tujuan Surat Negative Case

    
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
            draftingKepalaSuratNotaDinasPage.addmoreTujuanLampiran1("Ridwan Kamil")            
        })
    )

    qase(724,
        it('Menutup form kepala naskah', () => {
            cy.wait(3000)
            draftingKepalaSuratNotaDinasPage.closeLampiranKepalaSurat()
            cy.wait(3000)
            menuPage.goToKotakMasukReviewNaskah()
        })
    )

})