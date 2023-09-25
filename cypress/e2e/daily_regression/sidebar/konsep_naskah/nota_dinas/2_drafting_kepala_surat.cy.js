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
            draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat()
        })
    )

    qase(723,
        it('Cek detail preview kepala naskah', () => {
            draftingKepalaSuratNotaDinasPage.checkDetailPreview()
        })
    )

    qase(725,
        it('Cek radio button Kepala Surat', () => {
            draftingKepalaSuratNotaDinasPage.clickRButton1KepalaSurat()
        })
    )

    qase(725,
        it('Cek tujuan kepala surat INTERNAL', () => {
            draftingKepalaSuratNotaDinasPage.inputTujuan("I Gusti Agung Kim Fajar")
            
            draftingKepalaSuratNotaDinasPage.addTujuan()
            draftingKepalaSuratNotaDinasPage.inputTujuanField2("Ludia Rosema")
            
            draftingKepalaSuratNotaDinasPage.addTujuan()
            draftingKepalaSuratNotaDinasPage.inputTujuanField3("Zenal Mustopa")
            })
    )

    qase(725,
        it('Cek Tembusan Surat INTERNAL', () => {
            draftingKepalaSuratNotaDinasPage.inputTembusan("Raden Andhika")
            
            draftingKepalaSuratNotaDinasPage.addTembusan()
            draftingKepalaSuratNotaDinasPage.inputTembusan2("Upar Suparno")
            })
    )

    qase(725,
        it('Cek Field Kode Klasifikasi', () => {
            draftingKepalaSuratNotaDinasPage.inputKodeKlasifikasi("SK (Semua Klasifikasi)")
        })
    )

    qase(725,
        it('Cek Field Unit Pengolah', () => {
            draftingKepalaSuratNotaDinasPage.inputUnitPengolah("PAD")
        })
    )

    qase(725,
        it('Cek Dropdown Sifat Surat', () => {
            draftingKepalaSuratNotaDinasPage.validateSifatSurat("Penting")
        })
    )

    qase(725,
        it('Cek Dropdown Urgensi', () => {
            draftingKepalaSuratNotaDinasPage.validateUrgensi("Amat Segera")
        })
    )

    qase(725,
        it('Cek Perihal Surat', () => {
            draftingKepalaSuratNotaDinasPage.inputPerihal("Tujuan Kepala Surat - Internal - Lampiran")
            draftingKepalaSuratNotaDinasPage.scrappingNamaJabatan()
            })
    )

    
})


describe('Drafting Lampiran Kepala Surat Skenario', { testIsolation: false }, () => {
    qase(721,
        it('Akses form editing kepala surat', () => {
            draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat()
        })
    )

    qase(723,
        it('Cek detail preview kepala naskah', () => {
            draftingKepalaSuratNotaDinasPage.checkDetailPreview()
        })
    )

    qase(725,
        it('Cek radio button Lampiran Kepala Surat', () => {
            draftingKepalaSuratNotaDinasPage.clickRButton2LampiranSurat()
        })
    )
    
    
    qase(725,
        it('Cek tujuan lampiran surat INTERNAL', () => {
            draftingKepalaSuratNotaDinasPage.inputTujuanLampiran1("Staff Internal")

            cy.wait(3000)
        })
    )

    qase(725,
        it('Cek button Buat tujuan surat di lampiran', () => {
            draftingKepalaSuratNotaDinasPage.buttonBuatTujuanSuratDiLampiran()            
        })
    )

    qase(725,
        it('Cek tujuan pada Lampiran Kepala Surat', () => {
            draftingKepalaSuratNotaDinasPage.validateNamaJabatanLampiran()            
        })
    )

    qase(725,
        it('Cek tambah tujuan surat pada Lampiran Kepala Surat', () => {
            draftingKepalaSuratNotaDinasPage.addmoreTujuanLampiran1("Ridwan Kamil")            
        })
    )

    qase(724,
        it('Menutup form kepala naskah', () => {
            draftingKepalaSuratNotaDinasPage.closeLampiranKepalaSurat()
            
            menuPage.goToKotakMasukReviewNaskah()
        })
    )

})