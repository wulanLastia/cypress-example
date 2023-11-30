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

    // Detail
    checkDetail() {
        draftingKonsepNaskahPage.checkDetail()
    }

    // Kop Surat
    inputKopSurat() {
        draftingKopSuratPage.aksesFormEditingKopSurat()
        draftingKopSuratPage.checkPreviewDinas()
        draftingKopSuratPage.closeKopSurat()
    }

    // Kepala Surat
    inputKepalaSurat(inputanTujuan1, inputanLokasi, inputanKodeKlasifikasi, inputanUnitPengolah, inputanSifatSurat, inputanUrgensiSurat, inputanPerihalSurat) {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
        draftingKepalaSuratPage.validateTujuan(inputanTujuan1)
        draftingKepalaSuratPage.validateLokasi(inputanLokasi)
        draftingKepalaSuratPage.validateKodeKlasifikasi(inputanKodeKlasifikasi)
        draftingKepalaSuratPage.validateUnitPengolah(inputanUnitPengolah)
        draftingKepalaSuratPage.validateSifatSurat(inputanSifatSurat)
        draftingKepalaSuratPage.validateUrgensiSurat(inputanUrgensiSurat)
        draftingKepalaSuratPage.validatePerihal(inputanPerihalSurat)
        draftingKepalaSuratPage.closeKepalaSurat()
    }

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

    inputKepalaSuratSkenario3(inputanTujuanEksternal1, inputanTujuanEksternal2, inputanTujuanEksternal3, inputanLokasi, inputanKodeKlasifikasi, inputanUnitPengolah, inputanSifatSurat, inputanUrgensiSurat, inputanPerihalSurat) {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
        draftingKepalaSuratPage.validateTujuanSkenario3(inputanTujuanEksternal1, inputanTujuanEksternal2, inputanTujuanEksternal3)
        draftingKepalaSuratPage.validateLokasi(inputanLokasi)
        draftingKepalaSuratPage.validateKodeKlasifikasi(inputanKodeKlasifikasi)
        draftingKepalaSuratPage.validateUnitPengolah(inputanUnitPengolah)
        draftingKepalaSuratPage.validateSifatSurat(inputanSifatSurat)
        draftingKepalaSuratPage.validateUrgensiSurat(inputanUrgensiSurat)
        draftingKepalaSuratPage.validatePerihal(inputanPerihalSurat)
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    inputKepalaSuratSkenario4(inputanTujuanLampiran1, inputanTujuanLampiran2, inputanTujuanLampiran3, inputanLokasi, inputanKodeKlasifikasi, inputanUnitPengolah, inputanSifatSurat, inputanUrgensiSurat, inputanPerihalSurat) {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
        draftingKepalaSuratPage.validateTujuanSkenario4(inputanTujuanLampiran1, inputanTujuanLampiran2, inputanTujuanLampiran3)
        draftingKepalaSuratPage.validateLokasi(inputanLokasi)
        draftingKepalaSuratPage.validateKodeKlasifikasi(inputanKodeKlasifikasi)
        draftingKepalaSuratPage.validateUnitPengolah(inputanUnitPengolah)
        draftingKepalaSuratPage.validateSifatSurat(inputanSifatSurat)
        draftingKepalaSuratPage.validateUrgensiSurat(inputanUrgensiSurat)
        draftingKepalaSuratPage.validatePerihal(inputanPerihalSurat)
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    inputKepalaSuratSkenario5(inputanTujuan1, inputanTujuan2, inputanTujuan3, inputanTujuanEksternal4, inputanTujuanEksternal5, inputanTujuanEksternal6, inputanLokasi, inputanKodeKlasifikasi, inputanUnitPengolah, inputanSifatSurat, inputanUrgensiSurat, inputanPerihalSurat) {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
        draftingKepalaSuratPage.validateTujuanSkenario5(inputanTujuan1, inputanTujuan2, inputanTujuan3, inputanTujuanEksternal4, inputanTujuanEksternal5, inputanTujuanEksternal6)
        draftingKepalaSuratPage.validateLokasi(inputanLokasi)
        draftingKepalaSuratPage.validateKodeKlasifikasi(inputanKodeKlasifikasi)
        draftingKepalaSuratPage.validateUnitPengolah(inputanUnitPengolah)
        draftingKepalaSuratPage.validateSifatSurat(inputanSifatSurat)
        draftingKepalaSuratPage.validateUrgensiSurat(inputanUrgensiSurat)
        draftingKepalaSuratPage.validatePerihal(inputanPerihalSurat)
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

    inputKepalaSuratSkenario6(inputanTujuan1, inputanTujuan2, inputanTujuan3, inputanTujuanEksternal4, inputanTujuanEksternal5, inputanTujuanEksternal6, inputanLokasi, inputanKodeKlasifikasi, inputanUnitPengolah, inputanSifatSurat, inputanUrgensiSurat, inputanPerihalSurat) {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
        draftingKepalaSuratPage.validateTujuanSkenario6(inputanTujuan1, inputanTujuan2, inputanTujuan3, inputanTujuanEksternal4, inputanTujuanEksternal5, inputanTujuanEksternal6)
        draftingKepalaSuratPage.validateLokasi(inputanLokasi)
        draftingKepalaSuratPage.validateKodeKlasifikasi(inputanKodeKlasifikasi)
        draftingKepalaSuratPage.validateUnitPengolah(inputanUnitPengolah)
        draftingKepalaSuratPage.validateSifatSurat(inputanSifatSurat)
        draftingKepalaSuratPage.validateUrgensiSurat(inputanUrgensiSurat)
        draftingKepalaSuratPage.validatePerihal(inputanPerihalSurat)
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    inputKepalaSuratSkenario7Negatif(inputanTujuanLampiranNegatif1, inputanTujuanLampiranNegatif2, inputanTujuanLampiranNegatif3, inputanTujuanLampiranNegatif4, inputanTujuanLampiranNegatif5, inputanTujuanLampiranNegatif6, assertTujuanLampiranNegatif1, assertTujuanLampiranNegatif2, assertTujuanLampiranNegatif3, assertTujuanLampiranNegatif4, assertTujuanLampiranNegatif5, assertTujuanLampiranNegatif6, inputanLokasiNegatif, inputanKodeKlasifikasi, inputanUnitPengolahNegatif, inputanSifatSurat, inputanUrgensiSurat, inputanPerihalNegatif) {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
        draftingKepalaSuratPage.validateTujuanSkenario7NegatifTagScript(inputanTujuanLampiranNegatif1, inputanTujuanLampiranNegatif2, inputanTujuanLampiranNegatif3, inputanTujuanLampiranNegatif4, inputanTujuanLampiranNegatif5, inputanTujuanLampiranNegatif6, assertTujuanLampiranNegatif1, assertTujuanLampiranNegatif2, assertTujuanLampiranNegatif3, assertTujuanLampiranNegatif4, assertTujuanLampiranNegatif5, assertTujuanLampiranNegatif6,)
        draftingKepalaSuratPage.validateLokasiNegatifTagScript(inputanLokasiNegatif)
        draftingKepalaSuratPage.validateKodeKlasifikasi(inputanKodeKlasifikasi)
        draftingKepalaSuratPage.validateUnitPengolahNegatifTagScript(inputanUnitPengolahNegatif)
        draftingKepalaSuratPage.validateSifatSurat(inputanSifatSurat)
        draftingKepalaSuratPage.validateUrgensiSurat(inputanUrgensiSurat)
        draftingKepalaSuratPage.validatePerihal(inputanPerihalNegatif)
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    inputKepalaSuratSkenario8Negatif(inputanTujuanLampiranNegatif1, inputanTujuanLampiranNegatif2, inputanTujuanLampiranNegatif3, inputanTujuanLampiranNegatif4, inputanTujuanLampiranNegatif5, inputanTujuanLampiranNegatif6, assertTujuanLampiranNegatif1, assertTujuanLampiranNegatif2, assertTujuanLampiranNegatif3, assertTujuanLampiranNegatif4, assertTujuanLampiranNegatif5, assertTujuanLampiranNegatif6, inputanLokasiNegatif, inputanKodeKlasifikasi, inputanUnitPengolahNegatif, inputanSifatSurat, inputanUrgensiSurat, inputanPerihalNegatif) {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
        draftingKepalaSuratPage.validateTujuanSkenario8NegatifHTMLScript(inputanTujuanLampiranNegatif1, inputanTujuanLampiranNegatif2, inputanTujuanLampiranNegatif3, inputanTujuanLampiranNegatif4, inputanTujuanLampiranNegatif5, inputanTujuanLampiranNegatif6, assertTujuanLampiranNegatif1, assertTujuanLampiranNegatif2, assertTujuanLampiranNegatif3, assertTujuanLampiranNegatif4, assertTujuanLampiranNegatif5, assertTujuanLampiranNegatif6)
        draftingKepalaSuratPage.validateLokasiNegatifHTMLScript(inputanLokasiNegatif)
        draftingKepalaSuratPage.validateKodeKlasifikasi(inputanKodeKlasifikasi)
        draftingKepalaSuratPage.validateUnitPengolahNegatifHTMLScript(inputanUnitPengolahNegatif)
        draftingKepalaSuratPage.validateSifatSurat(inputanSifatSurat)
        draftingKepalaSuratPage.validateUrgensiSurat(inputanUrgensiSurat)
        draftingKepalaSuratPage.validatePerihal(inputanPerihalNegatif)
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    inputKepalaSuratSkenario9Negatif(inputanTujuanLampiranNegatif1, assertTujuanLampiranNegatif1, inputanLokasiNegatif, inputanKodeKlasifikasi, inputanUnitPengolahNegatif, inputanSifatSurat, inputanUrgensiSurat, inputanPerihalNegatif) {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
        draftingKepalaSuratPage.validateTujuanSkenario9NegatifXSSScript(inputanTujuanLampiranNegatif1, assertTujuanLampiranNegatif1)
        draftingKepalaSuratPage.validateLokasiNegatifXSSScript(inputanLokasiNegatif)
        draftingKepalaSuratPage.validateKodeKlasifikasi(inputanKodeKlasifikasi)
        draftingKepalaSuratPage.validateUnitPengolahNegatifXSSScript(inputanUnitPengolahNegatif)
        draftingKepalaSuratPage.validateSifatSurat(inputanSifatSurat)
        draftingKepalaSuratPage.validateUrgensiSurat(inputanUrgensiSurat)
        draftingKepalaSuratPage.validatePerihal(inputanPerihalNegatif)
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    inputKepalaSuratSkenario10Negatif(inputanTujuanLampiranNegatif1, inputanLokasiNegatif, inputanKodeKlasifikasi, inputanUnitPengolahNegatif, inputanSifatSurat, inputanUrgensiSurat, inputanPerihalNegatif) {
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.validateTempat()
        //draftingKepalaSuratPage.validateTanggal() Disable sementara menunggu penyesuaian penomoran manual
        draftingKepalaSuratPage.validateTujuanSkenario10NegatifWhitespace(inputanTujuanLampiranNegatif1)
        draftingKepalaSuratPage.validateLokasiNegatifWhitespace(inputanLokasiNegatif)
        draftingKepalaSuratPage.validateKodeKlasifikasiNegatifWhitespace(inputanKodeKlasifikasi)
        draftingKepalaSuratPage.validateUnitPengolahNegatifWhitespace(inputanUnitPengolahNegatif)
        draftingKepalaSuratPage.whitespaceSifatSurat(inputanSifatSurat)
        draftingKepalaSuratPage.whitespaceUrgensiSurat(inputanUrgensiSurat)
        draftingKepalaSuratPage.validatePerihal(inputanPerihalNegatif)
        draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        draftingKepalaSuratPage.closeKepalaSurat()
    }

    // Badan Naskah
    inputBadanNaskah(textToPaste) {
        draftingBadanNaskahPage.inputBadanNaskah()
        draftingBadanNaskahPage.insertData(textToPaste)
        draftingBadanNaskahPage.closeBadanNaskah()
    }

    inputBadanNaskahSkenarioRegression(textToPaste) {
        draftingBadanNaskahPage.inputBadanNaskahProd()
        draftingBadanNaskahPage.insertDataProd(textToPaste)
        draftingBadanNaskahPage.closeBadanNaskah()
    }

    // Kaki Surat
    inputKakiSurat(inputanPenandatanganAtasan1, inputanPemeriksa1, inputanTembusan1, inputanTembusan2) {
        draftingKakiSuratPage.inputKakiSurat()
        draftingKakiSuratPage.pilihPenandatanganAtasan(inputanPenandatanganAtasan1)
        draftingKakiSuratPage.pilihPemeriksa(inputanPemeriksa1)
        draftingKakiSuratPage.pilihTembusan(inputanTembusan1, inputanTembusan2)
        draftingKakiSuratPage.closeKakiSurat()
    }

    inputKakiSuratPenandatanganDiriSendiri(inputanPenandatanganDiriSendiri) {
        draftingKakiSuratPage.inputKakiSurat()
        draftingKakiSuratPage.pilihPenandatanganDiriSendiri(inputanPenandatanganDiriSendiri)
        draftingKakiSuratPage.closeKakiSurat()
    }

    inputKakiSuratSkenario1(inputanPenandatanganAtasan1, inputanPemeriksa1, inputanTembusanInternal1, inputanTembusanInternal2, inputanTembusanInternal3) {
        draftingKakiSuratPage.inputKakiSurat()
        draftingKakiSuratPage.pilihPenandatanganAtasan(inputanPenandatanganAtasan1)
        draftingKakiSuratPage.pilihPemeriksa(inputanPemeriksa1)
        draftingKakiSuratPage.pilihTembusanSkenario1(inputanTembusanInternal1, inputanTembusanInternal2, inputanTembusanInternal3)
        draftingKakiSuratPage.closeKakiSurat()
    }

    inputKakiSuratSkenario2(inputanPenandatanganAtasan1, inputanPemeriksa1, inputanTembusanEksternal1, inputanTembusanEksternal2, inputanTembusanEksternal3) {
        draftingKakiSuratPage.inputKakiSurat()
        draftingKakiSuratPage.pilihPenandatanganAtasan(inputanPenandatanganAtasan1)
        draftingKakiSuratPage.pilihPemeriksa(inputanPemeriksa1)
        draftingKakiSuratPage.pilihTembusanSkenario2(inputanTembusanEksternal1, inputanTembusanEksternal2, inputanTembusanEksternal3)
        draftingKakiSuratPage.closeKakiSurat()
    }

    inputKakiSuratSkenario3(inputanPenandatanganAtasan1, inputanPemeriksa1, inputanTembusan1, inputanTembusan2, inputanTembusan3, inputanTembusanEksternal4, inputanTembusanEksternal5, inputanTembusanEksternal6) {
        draftingKakiSuratPage.inputKakiSurat()
        draftingKakiSuratPage.pilihPenandatanganAtasan(inputanPenandatanganAtasan1)
        draftingKakiSuratPage.pilihPemeriksa(inputanPemeriksa1)
        draftingKakiSuratPage.pilihTembusanSkenario3(inputanTembusan1, inputanTembusan2, inputanTembusan3, inputanTembusanEksternal4, inputanTembusanEksternal5, inputanTembusanEksternal6)
        draftingKakiSuratPage.closeKakiSurat()
    }

    inputKakiSuratSkenario4(inputanPenandatanganDiriSendiri, inputanTembusan1, inputanTembusan2, inputanTembusan3, inputanTembusanEksternal4, inputanTembusanEksternal5, inputanTembusanEksternal6) {
        draftingKakiSuratPage.inputKakiSurat()
        draftingKakiSuratPage.pilihPenandatanganDiriSendiri(inputanPenandatanganDiriSendiri)
        draftingKakiSuratPage.pilihTembusanSkenario3(inputanTembusan1, inputanTembusan2, inputanTembusan3, inputanTembusanEksternal4, inputanTembusanEksternal5, inputanTembusanEksternal6)
        draftingKakiSuratPage.closeKakiSurat()
    }

    // Lampiran Surat
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

    inputBadanNaskahProd() {
        draftingBadanNaskahPage.inputBadanNaskahProd()
        draftingBadanNaskahPage.insertDataProd()
        draftingBadanNaskahPage.closeBadanNaskah()
    }

    inputKakiSuratSkenario3Prod() {
        draftingKakiSuratPage.inputKakiSurat()
        draftingKakiSuratPage.pilihPenandatanganAtasanProd()
        draftingKakiSuratPage.pilihPemeriksaProd()
        draftingKakiSuratPage.pilihTembusanSkenario3Prod()
        draftingKakiSuratPage.closeKakiSurat()
    }

    // Kirim
    kirimSurat() {
        draftingKonsepNaskahPage.kirimNaskah()
    }

    kirimSuratNegatif() {
        draftingKonsepNaskahPage.kirimNaskahNegatif()
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

    // Simpan
    simpanSurat() {
        draftingKonsepNaskahPage.clickSimpanSurat()
    }

}