import { DraftingNotaDinasPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/pgs_drafting_nota_dinas.cy"
import { DraftingKopSuratNotaDinasPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/nodin_drafting_kop_surat.cy"
import { DraftingKepalaSuratNotaDinasPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/nodin_drafting_kepala_surat.cy"
import { DraftingLampiranSuratPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/nodin_drafting_lampiran_surat.cy"
import { DraftingBadanNaskahPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/nodin_drafting_badan_surat.cy.js"
import { DraftingKakiSuratPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/nodin_drafting_kaki_surat.cy.js"


const draftingNotaDinasPage = new DraftingNotaDinasPage()
const draftingKopSuratNotaDinasPage = new DraftingKopSuratNotaDinasPage()
const draftingKepalaSuratNotaDinasPage = new DraftingKepalaSuratNotaDinasPage()
const draftingLampiranSuratPage = new DraftingLampiranSuratPage()
const draftingBadanNaskahPage = new DraftingBadanNaskahPage()
const draftingKakiSuratPage = new DraftingKakiSuratPage()

export class CreateNotaDinasPage {

    gotoNotaDinas() {
        draftingNotaDinasPage.goToKonsepNaskahNotaDinas()
    }
    
    createKopSurat() {
        draftingKopSuratNotaDinasPage.aksesFormEditingKopSurat()
        draftingKopSuratNotaDinasPage.checkDetail()
        draftingKopSuratNotaDinasPage.checkPreviewDefault()
        draftingKopSuratNotaDinasPage.checkPreviewSekda()
        draftingKopSuratNotaDinasPage.checkPreviewDinas()
        draftingKopSuratNotaDinasPage.checkPreviewUPTD()
        draftingKopSuratNotaDinasPage.clickPreviewDinas()
        draftingKopSuratNotaDinasPage.closeKopSurat()
    }

    createKopSuratPROD() {
        draftingKopSuratNotaDinasPage.aksesFormEditingKopSurat()
        draftingKopSuratNotaDinasPage.checkDetail()
        draftingKopSuratNotaDinasPage.checkPreviewDefaultPROD()
        draftingKopSuratNotaDinasPage.clickPreviewDinas()
        draftingKopSuratNotaDinasPage.closeKopSurat()
    }

    createKepalaSurat() {
        draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat()

        // Pilih Penempatan Daftar Tujuan Surat
        draftingKepalaSuratNotaDinasPage.clickRButton1KepalaSurat()
        // Input Tujuan Surat INTERNAL            
        draftingKepalaSuratNotaDinasPage.inputTujuan("I Gusti Agung Kim Fajar")
        draftingKepalaSuratNotaDinasPage.addTujuan()
        draftingKepalaSuratNotaDinasPage.inputTujuanField2("Ludia Rosema")
        draftingKepalaSuratNotaDinasPage.addTujuan()
        draftingKepalaSuratNotaDinasPage.inputTujuanField3("Zenal Mustopa")
        // Input Tembusan Surat INTERNAL
        draftingKepalaSuratNotaDinasPage.inputTembusan("Raden Andhika")
        draftingKepalaSuratNotaDinasPage.addTembusan()
        draftingKepalaSuratNotaDinasPage.inputTembusan2("Upar Suparno")
        // Field Kode Klasifikasi
        draftingKepalaSuratNotaDinasPage.inputKodeKlasifikasi("SK (Semua Klasifikasi)")
        // Field Unit Pengolah
        draftingKepalaSuratNotaDinasPage.inputUnitPengolah("PAD")
        // Field Tanggal Penomoran
        // draftingKepalaSuratNotaDinasPage.validateTanggal() // Bila di shutdown di unleash bisa dimatikan dulu assertion ini
        // Dropdown Sifat Surat
        cy.wait(10000)
        draftingKepalaSuratNotaDinasPage.validateSifatSurat("Penting")
        // Dropdown Urgensi
        cy.wait(10000)
        draftingKepalaSuratNotaDinasPage.validateUrgensi("Amat Segera")
        // Field Perihal
        cy.wait(10000)
        draftingKepalaSuratNotaDinasPage.inputPerihal("Tujuan Kepala Surat - Internal - Lampiran")
        draftingKepalaSuratNotaDinasPage.closeKepalaSurat()
    }

    createLampiranKepalaSurat() {
        draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat()

        // Pilih Penempatan Daftar Tujuan Surat
        draftingKepalaSuratNotaDinasPage.clickRButton2LampiranSurat()
        // Input Tujuan Lampiran Surat INTERNAL            
        cy.wait(3000)
        draftingKepalaSuratNotaDinasPage.inputTujuanLampiran1("Staff Internal DISPUSIPDA")
        // Input Tembusan Surat INTERNAL
        cy.wait(3000)
        draftingKepalaSuratNotaDinasPage.inputTembusan("Raden Andhika")
        draftingKepalaSuratNotaDinasPage.addTembusan()
        draftingKepalaSuratNotaDinasPage.inputTembusan2("Upar Suparno")
        // Field Kode Klasifikasi
        draftingKepalaSuratNotaDinasPage.inputKodeKlasifikasi("SK (Semua Klasifikasi)")
        // Field Unit Pengolah
        draftingKepalaSuratNotaDinasPage.inputUnitPengolah("PAD")
        // Field Tanggal Penomoran
        // draftingKepalaSuratNotaDinasPage.validateTanggal() // Bila di shutdown di unleash bisa dimatikan dulu assertion ini
        // Dropdown Sifat Surat
        draftingKepalaSuratNotaDinasPage.validateSifatSurat("Penting")
        // Dropdown Urgensi
        draftingKepalaSuratNotaDinasPage.validateUrgensi("Amat Segera")
        // Field Perihal
        draftingKepalaSuratNotaDinasPage.inputPerihal("Tujuan Kepala Surat Lampiran - Internal - Lampiran")
        // Direct to Lampiran Kepala Internal Page
        cy.wait(3000)
        draftingKepalaSuratNotaDinasPage.buttonBuatTujuanSuratDiLampiran()
        // Input Tujuan Surat INTERNAL in Lampiran
        cy.wait(3000)
        draftingKepalaSuratNotaDinasPage.checkDetailPreviewLampiran()
        cy.wait(3000)
        draftingKepalaSuratNotaDinasPage.inputNamaLampiran1("I Gusti Agung Kim Fajar")
        draftingKepalaSuratNotaDinasPage.addLampiranKepala()
        cy.wait(3000)
        draftingKepalaSuratNotaDinasPage.inputNamaLampiran2("Ludia Rosema")
        draftingKepalaSuratNotaDinasPage.addLampiranKepala()
        cy.wait(3000)
        draftingKepalaSuratNotaDinasPage.inputNamaLampiran3("Zenal Mustopa")
        cy.wait(3000)
        draftingKepalaSuratNotaDinasPage.closeLampiranKepalaSurat()
    }

    createKepalaSuratPROD() {
        draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat()

        // Pilih Penempatan Daftar Tujuan Surat
        draftingKepalaSuratNotaDinasPage.clickRButton1KepalaSurat()
        // Input Tujuan Surat INTERNAL            
        draftingKepalaSuratNotaDinasPage.inputTujuan("SMOKE TEST 1 Dra. Hj. I GUSTI AGUNG")
        // Input Tembusan Surat INTERNAL
        draftingKepalaSuratNotaDinasPage.inputTembusan("SMOKE TEST Raden Andhika")
        draftingKepalaSuratNotaDinasPage.addTembusan()
        draftingKepalaSuratNotaDinasPage.inputTembusan2("SMOKE TEST Upar Suparno")
        // Field Kode Klasifikasi
        draftingKepalaSuratNotaDinasPage.inputKodeKlasifikasi("SK (Semua Klasifikasi)")
        // Field Unit Pengolah
        draftingKepalaSuratNotaDinasPage.inputUnitPengolah("PAD")
        // Field Tanggal Penomoran
        // draftingKepalaSuratNotaDinasPage.validateTanggal() // Bila di shutdown di unleash bisa dimatikan dulu assertion ini
        // Dropdown Sifat Surat
        draftingKepalaSuratNotaDinasPage.validateSifatSurat("Penting")
        // Dropdown Urgensi
        draftingKepalaSuratNotaDinasPage.validateUrgensi("Amat Segera")
        // Field Perihal
        draftingKepalaSuratNotaDinasPage.inputPerihal("Tujuan Kepala Surat - Internal - Lampiran")
        draftingKepalaSuratNotaDinasPage.closeKepalaSurat()
    }

    createLampiranKepalaSuratPROD() {
        draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat()

        // Pilih Penempatan Daftar Tujuan Surat
        draftingKepalaSuratNotaDinasPage.clickRButton2LampiranSurat()
        // Input Tujuan Lampiran Surat INTERNAL            
        cy.wait(3000)
        draftingKepalaSuratNotaDinasPage.inputTujuanLampiran1("Staff Internal DISPUSIPDA")
        // Input Tembusan Surat INTERNAL
        cy.wait(3000)
        draftingKepalaSuratNotaDinasPage.inputTembusan("SMOKE TEST Raden Andhika")
        draftingKepalaSuratNotaDinasPage.addTembusan()
        draftingKepalaSuratNotaDinasPage.inputTembusan2("SMOKE TEST Upar Suparno")
        // Field Kode Klasifikasi
        draftingKepalaSuratNotaDinasPage.inputKodeKlasifikasi("SK (Semua Klasifikasi)")
        // Field Unit Pengolah
        draftingKepalaSuratNotaDinasPage.inputUnitPengolah("PAD")
        // Field Tanggal Penomoran
        // draftingKepalaSuratNotaDinasPage.validateTanggal() // Bila di shutdown di unleash bisa dimatikan dulu assertion ini
        // Dropdown Sifat Surat
        draftingKepalaSuratNotaDinasPage.validateSifatSurat("Penting")
        // Dropdown Urgensi
        draftingKepalaSuratNotaDinasPage.validateUrgensi("Amat Segera")
        // Field Perihal
        draftingKepalaSuratNotaDinasPage.inputPerihal("Tujuan Kepala Surat Lampiran - Internal - Lampiran")
        // Direct to Lampiran Kepala Internal Page
        cy.wait(3000)
        draftingKepalaSuratNotaDinasPage.buttonBuatTujuanSuratDiLampiran()
        // Input Tujuan Surat INTERNAL in Lampiran
        cy.wait(3000)
        draftingKepalaSuratNotaDinasPage.checkDetailPreviewLampiran()
        cy.wait(3000)
        draftingKepalaSuratNotaDinasPage.inputNamaLampiran1("SMOKE TEST I Gusti Agung Kim Fajar")
        draftingKepalaSuratNotaDinasPage.addLampiranKepala()
        cy.wait(3000)
        draftingKepalaSuratNotaDinasPage.inputNamaLampiran2("SMOKE TEST Dr. IKA MARDIAH")
        draftingKepalaSuratNotaDinasPage.addLampiranKepala()
        cy.wait(3000)
        draftingKepalaSuratNotaDinasPage.inputNamaLampiran3("SMOKE TEST Rizki Hustiniasari")
        cy.wait(3000)
        draftingKepalaSuratNotaDinasPage.closeLampiranKepalaSurat()
    }

    createLampiranSurat1() {
        cy.wait(3000)
        draftingLampiranSuratPage.aksesFormEditingLampiranSurat()
        cy.wait(3000)
        // Input Lampiran Surat 1
        draftingLampiranSuratPage.inputLampiranSurat()
        draftingLampiranSuratPage.closeLampiranNotaDinas()
        cy.wait(5000)
    }

    createLampiranSurat2() {
        cy.wait(3000)
        draftingLampiranSuratPage.aksesFormEditingLampiranSuratke2()
        cy.wait(3000)
        // Input Lampiran Surat 2
        draftingLampiranSuratPage.inputLampiranSurat2()
        draftingLampiranSuratPage.closeLampiranNotaDinas()
        cy.wait(5000)
    }

    createBadanSurat() {
        draftingBadanNaskahPage.inputBadanNaskahProd()
        draftingBadanNaskahPage.insertDataProd()
        draftingBadanNaskahPage.closeBadanNaskah()

    }

    createKakiSurat() {
        draftingKakiSuratPage.aksesFormEditingKakiSurat()
        draftingKakiSuratPage.inputKakiSurat()
        draftingKakiSuratPage.pilihPenandatanganAtasan()
        draftingKakiSuratPage.pilihPemeriksa()
        draftingKakiSuratPage.closeKakiSurat()
    }

    createKakiSuratPenandatanganDiriSendiri() {
        draftingKakiSuratPage.aksesFormEditingKakiSurat()
        draftingKakiSuratPage.inputKakiSurat()
        draftingKakiSuratPage.pilihPenandatanganDiriSendiri()
        draftingKakiSuratPage.closeKakiSurat()
    }

    createKakiSuratPenandatanganDiriSendiriPROD() {
        draftingKakiSuratPage.aksesFormEditingKakiSurat()
        draftingKakiSuratPage.inputKakiSurat()
        draftingKakiSuratPage.pilihPenandatanganDiriSendiriPROD()
        draftingKakiSuratPage.closeKakiSurat()
    }

    createKakiSuratPROD() {
        draftingKakiSuratPage.aksesFormEditingKakiSurat()
        draftingKakiSuratPage.inputKakiSurat()
        draftingKakiSuratPage.pilihPenandatanganAtasanPROD()
        draftingKakiSuratPage.pilihPemeriksaPROD()
        draftingKakiSuratPage.closeKakiSurat()
    }

    doKirimNaskah() {
        cy.wait(3000)
        draftingNotaDinasPage.kirimNaskah({force: true})
    }



}
