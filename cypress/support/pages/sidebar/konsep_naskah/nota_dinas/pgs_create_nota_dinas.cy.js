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

    createKopSurat(inputOrg) {
        draftingKopSuratNotaDinasPage.aksesFormEditingKopSurat()
        draftingKopSuratNotaDinasPage.checkDetail()
        draftingKopSuratNotaDinasPage.checkPreviewDefault(inputOrg)
        draftingKopSuratNotaDinasPage.checkPreviewSekda()
        draftingKopSuratNotaDinasPage.checkPreviewDinas(inputOrg)
        draftingKopSuratNotaDinasPage.checkPreviewUPTD(inputOrg)
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

    createKepalaSuratBkp() {
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

    createKepalaSurat(tujuanSurat, tembusanSurat, kodeKlasifikasi, unitPengolah, sifatSurat, urgensi, perihal) {
        draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat()
    
        // Pilih Penempatan Daftar Tujuan Surat
        draftingKepalaSuratNotaDinasPage.clickRButton1KepalaSurat()
    
        // Input Tujuan Surat (INTERNAL) secara dinamis
        tujuanSurat.forEach((tujuan, index) => {
            // Menggunakan index untuk menentukan field mana yang digunakan
            switch (index) {
                case 0:
                    draftingKepalaSuratNotaDinasPage.inputTujuan(tujuan)
                    break;
                case 1:
                    draftingKepalaSuratNotaDinasPage.inputTujuanField2(tujuan)
                    break;
                case 2:
                    draftingKepalaSuratNotaDinasPage.inputTujuanField3(tujuan)
                    break;
            }
            
            // Hanya memanggil addTujuan untuk elemen selain elemen terakhir
            if (index < tujuanSurat.length - 1) {
                draftingKepalaSuratNotaDinasPage.addTujuan()
            }
        })
    
        // Input Tembusan Surat (INTERNAL) secara dinamis
        tembusanSurat.forEach((tembusan, index) => {
            switch (index) {
                case 0:
                    draftingKepalaSuratNotaDinasPage.inputTembusan(tembusan)
                    break;
                case 1:
                    draftingKepalaSuratNotaDinasPage.inputTembusan2(tembusan)
                    break;
                case 2:
                    draftingKepalaSuratNotaDinasPage.inputTembusan3(tembusan)
                    break;
            }
            
            // Hanya memanggil addTembusan untuk elemen selain elemen terakhir
            if (index < tembusanSurat.length - 1) {
                draftingKepalaSuratNotaDinasPage.addTembusan()
            }
        })
    
        // Field Kode Klasifikasi
        draftingKepalaSuratNotaDinasPage.inputKodeKlasifikasi(kodeKlasifikasi)
    
        // Field Unit Pengolah
        draftingKepalaSuratNotaDinasPage.inputUnitPengolah(unitPengolah)
    
        // Tunggu dan validasi Sifat Surat
        cy.wait(5000)
        draftingKepalaSuratNotaDinasPage.validateSifatSurat(sifatSurat)
    
        // Tunggu dan validasi Urgensi
        cy.wait(5000)
        draftingKepalaSuratNotaDinasPage.validateUrgensi(urgensi)
    
        // Field Perihal
        cy.wait(5000)
        draftingKepalaSuratNotaDinasPage.inputPerihal(perihal)
    
        // Tutup Kepala Surat
        draftingKepalaSuratNotaDinasPage.closeKepalaSurat()
    }    

    createLampiranKepalaSuratBkp() {
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

    createLampiranKepalaSurat(tujuanLampiran, tembusanSurat, kodeKlasifikasi, unitPengolah, sifatSurat, urgensi, perihal, namaLampiran) {
        draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat()
    
        // Pilih Penempatan Daftar Tujuan Surat
        draftingKepalaSuratNotaDinasPage.clickRButton2LampiranSurat()
    
        // Input Tujuan Lampiran Surat INTERNAL (inputTujuan1 dikeluarkan dari loop)
        cy.wait(3000)
        draftingKepalaSuratNotaDinasPage.inputTujuanLampiran1(tujuanLampiran)
    
        // Input Tembusan Surat INTERNAL secara dinamis
        tembusanSurat.forEach((tembusan, index) => {
            cy.wait(3000)
            switch (index) {
                case 0:
                    draftingKepalaSuratNotaDinasPage.inputTembusan(tembusan)
                    break;
                case 1:
                    draftingKepalaSuratNotaDinasPage.inputTembusan2(tembusan)
                    break;
                case 2:
                    draftingKepalaSuratNotaDinasPage.inputTembusan3(tembusan)
                    break;
            }
    
            // Hanya panggil addTembusan jika bukan elemen terakhir
            if (index < tembusanSurat.length - 1) {
                draftingKepalaSuratNotaDinasPage.addTembusan()
            }
        })
    
        // Field Kode Klasifikasi
        draftingKepalaSuratNotaDinasPage.inputKodeKlasifikasi(kodeKlasifikasi)
    
        // Field Unit Pengolah
        draftingKepalaSuratNotaDinasPage.inputUnitPengolah(unitPengolah)
    
        // Validasi Sifat Surat
        draftingKepalaSuratNotaDinasPage.validateSifatSurat(sifatSurat)
    
        // Validasi Urgensi
        draftingKepalaSuratNotaDinasPage.validateUrgensi(urgensi)
    
        // Field Perihal
        draftingKepalaSuratNotaDinasPage.inputPerihal(perihal)
    
        // Direct to Lampiran Kepala Internal Page
        cy.wait(3000)
        draftingKepalaSuratNotaDinasPage.buttonBuatTujuanSuratDiLampiran()
    
        // Input Tujuan Surat INTERNAL in Lampiran secara dinamis
        cy.wait(3000)
        draftingKepalaSuratNotaDinasPage.checkDetailPreviewLampiran()
    
        // Input Nama Lampiran INTERNAL secara dinamis
        namaLampiran.forEach((nama, index) => {
            cy.wait(3000)
            switch (index) {
                case 0:
                    draftingKepalaSuratNotaDinasPage.inputNamaLampiran1(nama)
                    break;
                case 1:
                    draftingKepalaSuratNotaDinasPage.inputNamaLampiran2(nama)
                    break;
                case 2:
                    draftingKepalaSuratNotaDinasPage.inputNamaLampiran3(nama)
                    break;
                default:
                    // Tambahkan logika untuk lebih dari 3 nama lampiran jika diperlukan
                    draftingKepalaSuratNotaDinasPage.inputNamaLampiranFieldExtra(index, nama)
            }
    
            // Hanya panggil addLampiranKepala jika bukan elemen terakhir
            if (index < namaLampiran.length - 1) {
                draftingKepalaSuratNotaDinasPage.addLampiranKepala()
            }
        })
    
        // Tutup Lampiran Kepala Surat
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

    createLampiranSurat1(textToPaste) {
        cy.wait(3000)
        draftingLampiranSuratPage.aksesFormEditingLampiranSurat()
        cy.wait(3000)
        // Input Lampiran Surat 1
        draftingLampiranSuratPage.inputLampiranSurat(textToPaste)
        draftingLampiranSuratPage.closeLampiranNotaDinas()
        cy.wait(5000)
    }

    createLampiranSurat2(textToPaste) {
        cy.wait(3000)
        draftingLampiranSuratPage.aksesFormEditingLampiranSuratke2()
        cy.wait(3000)
        // Input Lampiran Surat 2
        draftingLampiranSuratPage.inputLampiranSurat2(textToPaste)
        draftingLampiranSuratPage.closeLampiranNotaDinas()
        cy.wait(5000)
    }

    createBadanSurat(textToPaste) {
        draftingBadanNaskahPage.inputBadanNaskahProd()
        draftingBadanNaskahPage.insertDataProd(textToPaste)
        draftingBadanNaskahPage.closeBadanNaskah()

    }

    createKakiSurat(inputEnv, inputanPenandatanganAtasan, inputanPemeriksa) {
        draftingKakiSuratPage.aksesFormEditingKakiSurat()
        draftingKakiSuratPage.inputKakiSurat()
        draftingKakiSuratPage.pilihPenandatanganAtasan(inputEnv, inputanPenandatanganAtasan)
        if(inputanPemeriksa){     
            draftingKakiSuratPage.pilihPemeriksa(inputanPemeriksa)
        }
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

    createKakiSuratPROD(inputPenandatangan, inputPemeriksa) {
        draftingKakiSuratPage.aksesFormEditingKakiSurat()
        draftingKakiSuratPage.inputKakiSurat()
        draftingKakiSuratPage.pilihPenandatanganAtasanPROD(inputPenandatangan)
        draftingKakiSuratPage.pilihPemeriksaPROD(inputPemeriksa)
        draftingKakiSuratPage.closeKakiSurat()
    }

    doKirimNaskah(inputEnv) {
        cy.wait(3000)
        if (inputEnv === "prod") {
            draftingNotaDinasPage.kirimNaskahProd(inputEnv)
        } else {
            draftingNotaDinasPage.kirimNaskah(inputEnv)
        }
    }
}
