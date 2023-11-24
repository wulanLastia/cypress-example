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
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
        draftingKepalaSuratPage.validateTujuan()
        draftingKepalaSuratPage.validateLokasi()
        draftingKepalaSuratPage.validateKodeKlasifikasi()
        draftingKepalaSuratPage.validateUnitPengolah()
        draftingKepalaSuratPage.validateSifatSurat()
        draftingKepalaSuratPage.validateUrgensiSurat()
        draftingKepalaSuratPage.validatePerihal('')
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

    kirimSuratNegatif() {
        draftingKonsepNaskahPage.kirimNaskahNegatif()
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
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
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
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
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
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
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
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
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

    inputLampiranSurat(textToPaste) {
        draftingLampiranSuratPage.aksesFormEditingLampiranSurat()
        draftingLampiranSuratPage.inputLampiranSurat(textToPaste)
        draftingLampiranSuratPage.closeLampiran()
    }

    inputLampiranSurat2(textToPaste) {
        draftingLampiranSuratPage.aksesFormEditingLampiranSurat2()
        draftingLampiranSuratPage.inputLampiranSurat2(textToPaste)
        draftingLampiranSuratPage.closeLampiran()
        draftingLampiranSuratPage.scrollPreviewPage()
    }

    // Regression Skenario
    inputKepalaSuratSkenario1(inputanTujuan1, inputanTujuan2, inputanTujuan3, inputanLokasi, inputanKodeKlasifikasi, inputanUnitPengolah, inputanSifatSurat, inputanUrgensiSurat, inputanPerihalSurat) {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
        draftingKepalaSuratPage.validateTujuanSkenario1(inputanTujuan1, inputanTujuan2, inputanTujuan3)
        draftingKepalaSuratPage.validateLokasi(inputanLokasi)
        draftingKepalaSuratPage.validateKodeKlasifikasi(inputanKodeKlasifikasi)
        draftingKepalaSuratPage.validateUnitPengolah(inputanUnitPengolah)
        draftingKepalaSuratPage.validateSifatSurat(inputanSifatSurat)
        draftingKepalaSuratPage.validateUrgensiSurat(inputanUrgensiSurat)
        draftingKepalaSuratPage.validatePerihal(inputanPerihalSurat)
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    inputKepalaSuratSkenario2(inputanTujuan1, inputanTujuan2, inputanTujuan3, inputanLokasi, inputanKodeKlasifikasi, inputanUnitPengolah, inputanSifatSurat, inputanUrgensiSurat, inputanPerihalSurat) {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
        draftingKepalaSuratPage.validateTujuanSkenario2(inputanTujuan1, inputanTujuan2, inputanTujuan3)
        draftingKepalaSuratPage.validateLokasi(inputanLokasi)
        draftingKepalaSuratPage.validateKodeKlasifikasi(inputanKodeKlasifikasi)
        draftingKepalaSuratPage.validateUnitPengolah(inputanUnitPengolah)
        draftingKepalaSuratPage.validateSifatSurat(inputanSifatSurat)
        draftingKepalaSuratPage.validateUrgensiSurat(inputanUrgensiSurat)
        draftingKepalaSuratPage.validatePerihal(inputanPerihalSurat)
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    inputKepalaSuratSkenario3() {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
        draftingKepalaSuratPage.validateTujuanSkenario3()
        draftingKepalaSuratPage.validateLokasi()
        draftingKepalaSuratPage.validateKodeKlasifikasi()
        draftingKepalaSuratPage.validateUnitPengolah()
        draftingKepalaSuratPage.validateSifatSurat()
        draftingKepalaSuratPage.validateUrgensiSurat()
        draftingKepalaSuratPage.validatePerihal(' Tujuan Kepala Surat - Eksternal - Lampiran')
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    inputKepalaSuratSkenario4() {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
        draftingKepalaSuratPage.validateTujuanSkenario4()
        draftingKepalaSuratPage.validateLokasi()
        draftingKepalaSuratPage.validateKodeKlasifikasi()
        draftingKepalaSuratPage.validateUnitPengolah()
        draftingKepalaSuratPage.validateSifatSurat()
        draftingKepalaSuratPage.validateUrgensiSurat()
        draftingKepalaSuratPage.validatePerihal(' Tujuan Lampiran - Eksternal - Lampiran')
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    inputKepalaSuratSkenario5() {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
        draftingKepalaSuratPage.validateTujuanSkenario5()
        draftingKepalaSuratPage.validateLokasi()
        draftingKepalaSuratPage.validateKodeKlasifikasi()
        draftingKepalaSuratPage.validateUnitPengolah()
        draftingKepalaSuratPage.validateSifatSurat()
        draftingKepalaSuratPage.validateUrgensiSurat()
        draftingKepalaSuratPage.validatePerihal(' Tujuan Kepala Surat - Internal Eksternal - Lampiran')
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    inputKepalaSuratSkenario5Manual() {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        //draftingKepalaSuratPage.validateTempat()
        draftingKepalaSuratPage.validateTanggal('Manual')
        /*draftingKepalaSuratPage.validateTujuanSkenario5()
        draftingKepalaSuratPage.validateLokasi()
        draftingKepalaSuratPage.validateKodeKlasifikasi()
        draftingKepalaSuratPage.validateUnitPengolah()
        draftingKepalaSuratPage.validateSifatSurat()
        draftingKepalaSuratPage.validateUrgensiSurat()
        draftingKepalaSuratPage.validatePerihal('Tujuan Kepala Surat - Internal Eksternal - Lampiran')
        draftingKepalaSuratPage.closeKepalaSurat()*/
    }

    inputKepalaSuratSkenario6() {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
        draftingKepalaSuratPage.validateTujuanSkenario6()
        draftingKepalaSuratPage.validateLokasi()
        draftingKepalaSuratPage.validateKodeKlasifikasi()
        draftingKepalaSuratPage.validateUnitPengolah()
        draftingKepalaSuratPage.validateSifatSurat()
        draftingKepalaSuratPage.validateUrgensiSurat()
        draftingKepalaSuratPage.validatePerihal(' Tujuan Lampiran - Internal Eksternal - Lampiran')
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    inputKepalaSuratSkenario7Negatif() {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
        draftingKepalaSuratPage.validateTujuanSkenario7NegatifTagScript()
        draftingKepalaSuratPage.validateLokasiNegatifTagScript()
        draftingKepalaSuratPage.validateKodeKlasifikasi()
        draftingKepalaSuratPage.validateUnitPengolahNegatifTagScript()
        draftingKepalaSuratPage.validateSifatSurat()
        draftingKepalaSuratPage.validateUrgensiSurat()
        draftingKepalaSuratPage.validatePerihal(" Test JS Script <script>alert('Executing JS')</script>")
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    inputKepalaSuratSkenario8Negatif() {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
        draftingKepalaSuratPage.validateTujuanSkenario8NegatifHTMLScript()
        draftingKepalaSuratPage.validateLokasiNegatifHTMLScript()
        draftingKepalaSuratPage.validateKodeKlasifikasi()
        draftingKepalaSuratPage.validateUnitPengolahNegatifHTMLScript()
        draftingKepalaSuratPage.validateSifatSurat()
        draftingKepalaSuratPage.validateUrgensiSurat()
        draftingKepalaSuratPage.validatePerihal(" <blink>Hello World</blink>")
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    inputKepalaSuratSkenario9Negatif() {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
        draftingKepalaSuratPage.validateTujuanSkenario9NegatifXSSScript()
        draftingKepalaSuratPage.validateLokasiNegatifXSSScript()
        draftingKepalaSuratPage.validateKodeKlasifikasi()
        draftingKepalaSuratPage.validateUnitPengolahNegatifXSSScript()
        draftingKepalaSuratPage.validateSifatSurat()
        draftingKepalaSuratPage.validateUrgensiSurat()
        draftingKepalaSuratPage.validatePerihal(" '-prompt()-'")
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    inputKepalaSuratSkenario10Negatif() {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
        draftingKepalaSuratPage.validateTujuanSkenario10NegatifWhitespace()
        draftingKepalaSuratPage.validateLokasiNegatifWhitespace()
        draftingKepalaSuratPage.validateKodeKlasifikasiNegatifWhitespace()
        draftingKepalaSuratPage.validateUnitPengolahNegatifWhitespace()
        draftingKepalaSuratPage.whitespaceSifatSurat()
        draftingKepalaSuratPage.whitespaceUrgensiSurat()
        draftingKepalaSuratPage.validatePerihal(" {shift}{enter}")
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    inputKakiSuratSkenario1() {
        draftingKakiSuratPage.inputKakiSurat()
        draftingKakiSuratPage.pilihPenandatanganAtasan()
        draftingKakiSuratPage.pilihPemeriksa()
        draftingKakiSuratPage.pilihTembusanSkenario1()
        draftingKakiSuratPage.closeKakiSurat()
    }

    inputKakiSuratSkenario2() {
        draftingKakiSuratPage.inputKakiSurat()
        draftingKakiSuratPage.pilihPenandatanganAtasan()
        draftingKakiSuratPage.pilihPemeriksa()
        draftingKakiSuratPage.pilihTembusanSkenario2()
        draftingKakiSuratPage.closeKakiSurat()
    }

    inputKakiSuratSkenario3() {
        draftingKakiSuratPage.inputKakiSurat()
        draftingKakiSuratPage.pilihPenandatanganAtasan()
        draftingKakiSuratPage.pilihPemeriksa()
        draftingKakiSuratPage.pilihTembusanSkenario3()
        draftingKakiSuratPage.closeKakiSurat()
    }

    inputKakiSuratSkenario4() {
        draftingKakiSuratPage.inputKakiSurat()
        draftingKakiSuratPage.pilihPenandatanganDiriSendiri()
        draftingKakiSuratPage.pilihTembusanSkenario3()
        draftingKakiSuratPage.closeKakiSurat()
    }

    inputBadanNaskahSkenarioRegression(textToPaste) {
        draftingBadanNaskahPage.inputBadanNaskahProd()
        draftingBadanNaskahPage.insertDataProd(textToPaste)
        draftingBadanNaskahPage.closeBadanNaskah()
    }

    // PROD
    inputKopSuratProd() {
        draftingKopSuratPage.aksesFormEditingKopSurat()
        draftingKopSuratPage.prodCheckPreviewDinas()
        draftingKopSuratPage.closeKopSurat()
    }

    inputKepalaSuratSkenario5Prod() {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
        draftingKepalaSuratPage.validateTujuanSkenario5Prod()
        draftingKepalaSuratPage.validateLokasi()
        draftingKepalaSuratPage.validateKodeKlasifikasi()
        draftingKepalaSuratPage.validateUnitPengolah()
        draftingKepalaSuratPage.validateSifatSurat()
        draftingKepalaSuratPage.validateUrgensiSurat()
        draftingKepalaSuratPage.validatePerihal(' Tujuan Kepala Surat - Internal Eksternal - Lampiran')
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    inputKakiSuratSkenario3Prod() {
        draftingKakiSuratPage.inputKakiSurat()
        draftingKakiSuratPage.pilihPenandatanganAtasanProd()
        draftingKakiSuratPage.pilihPemeriksaProd()
        draftingKakiSuratPage.pilihTembusanSkenario3Prod()
        draftingKakiSuratPage.closeKakiSurat()
    }

    // Perbaiki
    inputPerbaikiKepalaSurat(inputanPerbaiki) {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validatePerihal(inputanPerbaiki)
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    // Koreksi
    inputKoreksiKepalaSurat(inputanKoreksi) {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validatePerihal(inputanKoreksi)
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    simpanSurat() {
        draftingKonsepNaskahPage.clickSimpanSurat()
    }

}