import { DraftingKonsepNaskahPage } from "../surat_biasa/pgs_drafting_surat_biasa.cy"
import { DraftingKopSuratPage } from "../konsep_naskah/pgs_drafting_kop_surat.cy"
import { DraftingKepalaSuratPage } from "../konsep_naskah/pgs_drafting_kepala_surat.cy"
import { DraftingBadanNaskahPage } from "../konsep_naskah/pgs_drafting_badan_naskah.cy"
import { DraftingKakiSuratPage } from "../konsep_naskah/pgs_drafting_kaki_surat.cy"
import { DraftingLampiranSuratPage } from "../konsep_naskah/pgs_drafting_lampiran_surat.cy"

const draftingKonsepNaskahPage = new DraftingKonsepNaskahPage()
const draftingKopSuratPage = new DraftingKopSuratPage()
const draftingKepalaSuratPage = new DraftingKepalaSuratPage()
const draftingBadanNaskahPage = new DraftingBadanNaskahPage()
const draftingKakiSuratPage = new DraftingKakiSuratPage()
const draftingLampiranSuratPage = new DraftingLampiranSuratPage()

export class CreateSuratBiasaPage {

    checkDetail() {
        draftingKonsepNaskahPage.checkDetail()
    }

    inputKopSurat() {
        draftingKopSuratPage.aksesFormEditingKopSurat()
        draftingKopSuratPage.checkPreviewDinas()
        draftingKopSuratPage.closeKopSurat()
    }

    inputKepalaSurat() {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        draftingKepalaSuratPage.validateTanggal()
        draftingKepalaSuratPage.validateTujuan()
        draftingKepalaSuratPage.validateLokasi()
        draftingKepalaSuratPage.validateKodeKlasifikasi()
        draftingKepalaSuratPage.validateUnitPengolah()
        draftingKepalaSuratPage.validateSifatSurat()
        draftingKepalaSuratPage.validateUrgensiSurat()
        draftingKepalaSuratPage.validatePerihal()
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    inputBadanNaskah() {
        draftingBadanNaskahPage.inputBadanNaskah()
        draftingBadanNaskahPage.insertData()
        draftingBadanNaskahPage.closeBadanNaskah()
    }

    inputKakiSurat() {
        draftingKakiSuratPage.inputKakiSurat()
        draftingKakiSuratPage.pilihPenandatanganAtasan()
        draftingKakiSuratPage.pilihPemeriksa()
        draftingKakiSuratPage.pilihTembusan()
        draftingKakiSuratPage.closeKakiSurat()
    }

    kirimSurat() {
        draftingKonsepNaskahPage.kirimNaskah()
    }

    inputKakiSuratPDF() {
        draftingKakiSuratPage.inputKakiSurat()
        draftingKakiSuratPage.inputPenandatanganDiriSendiri()
        draftingKakiSuratPage.closeKakiSurat()
    }

    inputBadanNaskahPDF() {
        draftingBadanNaskahPage.inputBadanNaskah()
        draftingBadanNaskahPage.insertDataPDF()
        draftingBadanNaskahPage.closeBadanNaskah()
    }

    inputKepalaSuratInternal() {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        draftingKepalaSuratPage.validateTanggal()
        draftingKepalaSuratPage.validateTujuanInternal()
        draftingKepalaSuratPage.validateLokasi()
        draftingKepalaSuratPage.validateKodeKlasifikasi()
        draftingKepalaSuratPage.validateUnitPengolah()
        draftingKepalaSuratPage.validateSifatSurat()
        draftingKepalaSuratPage.validateUrgensiSurat()
        draftingKepalaSuratPage.validatePerihal()
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    inputKepalaSuratEksternal() {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        draftingKepalaSuratPage.validateTanggal()
        draftingKepalaSuratPage.validateTujuanEksternal()
        draftingKepalaSuratPage.validateLokasi()
        draftingKepalaSuratPage.validateKodeKlasifikasi()
        draftingKepalaSuratPage.validateUnitPengolah()
        draftingKepalaSuratPage.validateSifatSurat()
        draftingKepalaSuratPage.validateUrgensiSurat()
        draftingKepalaSuratPage.validatePerihal()
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    inputKepalaSuratInternalEksternal() {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        draftingKepalaSuratPage.validateTanggal()
        draftingKepalaSuratPage.validateTujuanInternalEksternal()
        draftingKepalaSuratPage.validateLokasi()
        draftingKepalaSuratPage.validateKodeKlasifikasi()
        draftingKepalaSuratPage.validateUnitPengolah()
        draftingKepalaSuratPage.validateSifatSurat()
        draftingKepalaSuratPage.validateUrgensiSurat()
        draftingKepalaSuratPage.validatePerihal()
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    inputKepalaSuratProd() {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        draftingKepalaSuratPage.validateTanggal()
        draftingKepalaSuratPage.validateTujuanProd()
        draftingKepalaSuratPage.validateLokasi()
        draftingKepalaSuratPage.validateKodeKlasifikasi()
        draftingKepalaSuratPage.validateUnitPengolah()
        draftingKepalaSuratPage.validateSifatSurat()
        draftingKepalaSuratPage.validateUrgensiSurat()
        draftingKepalaSuratPage.validatePerihal()
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    inputBadanNaskahInternalEksternal() {
        draftingBadanNaskahPage.inputBadanNaskahInternalEksternal()
        draftingBadanNaskahPage.insertData()
        draftingBadanNaskahPage.closeBadanNaskah()
    }

    inputBadanNaskahProd() {
        draftingBadanNaskahPage.inputBadanNaskahProd()
        draftingBadanNaskahPage.insertDataProd()
        draftingBadanNaskahPage.closeBadanNaskah()
    }

    inputLampiranSurat() {
        draftingLampiranSuratPage.aksesFormEditingLampiranSurat()
        draftingLampiranSuratPage.inputLampiranSurat()
        draftingLampiranSuratPage.closeLampiran()
    }

    inputLampiranSurat2() {
        draftingLampiranSuratPage.aksesFormEditingLampiranSurat2()
        draftingLampiranSuratPage.inputLampiranSurat2()
        draftingLampiranSuratPage.closeLampiran()
        draftingLampiranSuratPage.scrollPreviewPage()
    }

    // PROD
    inputKopSuratProd() {
        draftingKopSuratPage.aksesFormEditingKopSurat()
        draftingKopSuratPage.prodCheckPreviewDinas()
        draftingKopSuratPage.closeKopSurat()
    }

}