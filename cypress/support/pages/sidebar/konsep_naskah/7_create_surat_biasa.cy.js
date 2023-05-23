import { DraftingKonsepNaskahPage } from "./2_drafting_konsep_naskah.cy"
import { DraftingKopSuratPage } from "./3_drafting_kop_surat.cy"
import { DraftingKepalaSuratPage } from "./4_drafting_kepala_surat.cy"
import { DraftingBadanNaskahPage } from "./5_drafting_badan_naskah.cy"
import { DraftingKakiSuratPage } from "./6_drafting_kaki_surat.cy"
import { MenuPage } from "../menu/menu.cy"

const menuPage = new MenuPage()
const draftingKonsepNaskahPage = new DraftingKonsepNaskahPage()
const draftingKopSuratPage = new DraftingKopSuratPage()
const draftingKepalaSuratPage = new DraftingKepalaSuratPage()
const draftingBadanNaskahPage = new DraftingBadanNaskahPage()
const draftingKakiSuratPage = new DraftingKakiSuratPage()

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
        draftingBadanNaskahPage.checkPreviewTextBold()
        draftingBadanNaskahPage.checkPreviewTextItalic()
        draftingBadanNaskahPage.closeBadanNaskah()
    }

    inputKakiSurat() {
        draftingKakiSuratPage.inputKakiSurat()
        draftingKakiSuratPage.pilihPenandatanganAtasan()
        draftingKakiSuratPage.pilihPemeriksa()
        draftingKakiSuratPage.closeKakiSurat()
    }

    kirimSurat() {
        draftingKonsepNaskahPage.kirimNaskah()
    }

}